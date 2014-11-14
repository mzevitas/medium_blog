(function () {

  App.Views.ReadPost = Parse.View.extend({

    tagName: 'ul',
    className: 'readPost',

    events: {

      // 'submit #readPost' : 'readPost',
      'submit #addComment' : 'addComment'


    },

    template: _.template($('#read-blog-posts').html()),

    initialize: function (options) {
      this.options = options;

      this.render();

      // $('#blogForm').empty();

      $('#blogPosts').html(this.$el);

    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template(this.options.post.toJSON()));




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


          // App.router.navigate('read/:postID', {trigger: true});
            $('#addComment')[0].reset();
            // location.reload();

        }

      });
          this.render();
    }
  });
}());
