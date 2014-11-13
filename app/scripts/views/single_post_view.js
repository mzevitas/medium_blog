(function () {

  App.Views.SinglePost = Parse.View.extend({

    tagName: 'ul',
    className: 'singlePost',

    events: {

      'submit #editPost' : 'editPost',
      'click #delete' : 'deletePost'

    },

    template: _.template($('#single-posts').html()),

    initialize: function (options) {
      this.options = options;

      this.render();

      // $('#blogForm').empty();

      $('#blogPosts').html(this.$el);

      $('textarea').autosize();

    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template(this.options.post.toJSON()));
    },

    editPost:  function (e) {
      e.preventDefault();

      this.options.post.set({
        title: $('#update_title').val(),
        author: $('#update_author').val(),
        content: $('#update_content').val(),
        tags: $('#update_tag').val()

      });

      this.options.post.save();

      App.router.navigate('profile', { trigger: true});

    },

    deletePost: function (e) {
      e.preventDefault();

      this.options.post.destroy();

      App.router.navigate('profile', { trigger: true});
    }



  });


}());
