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
        this.$el.html($('#...').html());
      },

      
  });




}());
