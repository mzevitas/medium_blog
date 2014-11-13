(function () {

  App.Views.AddPost = Parse.View.extend ({

      events: {
        'click #publish-post' : 'addPost'
      },

      template: _.template($('#create-post').html()),

      initialize: function () {
        this.render();

        $('#blogPosts').html(this.$el);


        // $('#postContent').autosize();
      },

      render: function () {
        this.$el.empty();

        this.$el.html($('#create-post').html());

      },

      addPost: function (e) {
        e.preventDefault();

          var p = new App.Models.Blog({
            title: $('#postTitle').val(),
            author: $('#postAuthor').val(),
            content: $('#postContent').val(),
            tags: $('#postTag').val(),
            user: App.user
          });

          p.save(null, {
            success: function () {
              App.posts.add(p);
              App.router.navigate('profile', { trigger: true });
            }
          });

       }
  });
}());
