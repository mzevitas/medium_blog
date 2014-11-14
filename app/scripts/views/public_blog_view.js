(function () {

  App.Views.PublicPost = Parse.View.extend ({
    tagName: 'ul',
    className: 'public_published',

    events: {
      'submit #commentText' : 'addComment'
    },

    template: _.template($('#public-blog-posts').html()),

  initialize: function (options){

    this.options= options;

    this.collection.off();
    this.collection.on('sync', this.postQuery, this);

    $('#blogPosts').html(this.$el);

    this.postQuery();
  },

  postQuery: function () {
    var self = this;

    var all_post = new Parse.Query(App.Models.Blog);
    // all_post.equalTo('publish-post', 'addPost');

    all_post.find({
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




  var commentTemplate = _.template($('#commentTemp').html());
      var comments_query = new Parse.Query(App.Models.Comment);
      comments_query.equalTo('parent', this.options.post);

      this.$el.append('<h2>Comments</h2><ul class="comments"></ul>');

      comments_query.find({
        success: function (results) {

          _.each(results, function(comment) {
            $('ul.comments').append(commentTemplate(comment.toJSON()));
          })

        }
      })

    },

    addComment: function (e) {
      e.preventDefault();

      var comment = new App.Models.Comment({

        commentText: $('#commentText').val(),
        parent: this.options.post

      });

      comment.save(null, {
        success: function () {
          console.log('Comment has been added');
          App.router.navigate('', {trigger: true});
        }
      });
    },
  });
}());
