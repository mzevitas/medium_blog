(function () {

  App.Views.AddPost = Parse.View.extend ({

      events: {
        'submit #addPost' : 'addPost'
      },

      initialize: function () {
        this.render();

        $('#blogPosts').html(this.$el);
      },

      render: function () {
        this.$el.html($('#create-post').html());
      },

      addPost: function (e) {
        e.preventDefault();

          var p = new App.Models.Blog({
            title: $('#postTitle').val(),
            content: $('#postContent').val(),
            tag: $('#postTag').val()
          });

          p.save(null, {
            success: function () {
              App.posts.add(p);
              App.router.navigate('', { trigger: true });
            }
          });
       }
  });
}());
