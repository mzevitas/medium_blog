(function () {

  App.Views.ListPost = Parse.View.extend ({
    tagName: 'ul',
    className: '',

    events: {},

    template: _.template($('#blog-posts').html()),

    initialize: function (options){

      this.options= options;
      this.render();

      this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#blogPosts').html(this.$el);
    },

    render: function () {
      this.$el.empty();

      return this;
    }





  });

}());
