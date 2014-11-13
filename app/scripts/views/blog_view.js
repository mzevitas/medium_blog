(function () {

  App.Views.ListPost = Parse.View.extend ({
    tagName: 'ul',
    className: 'published',

    events: {},

    template: _.template($('#blog-posts').html()),

    initialize: function (options){

      this.options= options;

      this.collection.off();
      this.collection.on('sync', this.postQuery, this);

      $('#blogPosts').html(this.$el);

      this.postQuery();
    },

    postQuery: function () {
      var self = this;

      var user_post = new Parse.Query(App.Models.Blog);
      user_post.equalTo('user', App.user);
      user_post.find({
        success: function (results) {
          self.collection = results;
          self.render();
        }
      });

    },

    render: function () {
      var self = this;

      this.$el.empty();

      var local_collection = this.collection;

      _.each(local_collection, function (p) {
        self.$el.append(self.template(p.toJSON()));
      });

      return this;

    }


  });

}());
