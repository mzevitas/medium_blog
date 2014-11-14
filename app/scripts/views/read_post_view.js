(function () {

  App.Views.ReadPost = Parse.View.extend({

    tagName: 'ul',
    className: 'readPost',

    events: {

      // 'submit #readPost' : 'readPost',
      'click #commentBtn' : 'addComment'


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
    },

     readPost:  function (e) {
      e.preventDefault();


      App.router.navigate('', { trigger: true});


  var commentTemplate = _.template($('#commentTemp').html());
      var comments_query = new Parse.Query(App.Models.Blog);
      comments_query.equalTo('parent', this.options.post);

      this.$el.append('<ul class="comments"></ul>');

      comments_query.find({
        success: function (results) {

          _.each(results, function(comment) {
            $('ul.comments').append(commentTemp(comment.toJSON()));
          })

        }
      })

    },

    addComment: function (e) {
      e.preventDefault();

      var comment = new App.Models.Blog({

        commentText: $('#commentText').val(),
        parent: this.options.post

      });

      comment.save(null, {
        success: function () {
          App.posts.add(comment);
          console.log('Comment has been added');
          App.router.navigate('', {trigger: true});
        }
      });
    }




  });


}());
