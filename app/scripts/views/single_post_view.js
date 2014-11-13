(function () {

  App.Views.SinglePost = Parse.View.extend({

    tagName: 'ul',
    className: 'singlePost',

    events: {

      'submit #editPost' : 'editPost',

    },

    template: _.template($('#single-posts').html()),

    initialize: function (options) {
      this.options = options;

      this.render();

      // $('').empty();

      $('#blogPosts').html(this.$el);

    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template(this.options.post.toJSON()));
    },

    editPost:  function (e) {
      e.preventDefault();

      this.options.post.set({
        title: $('#update_title').val(),
        content: $('#update_content').val(),
        tags: $('#update_tags').val()

      });

      this.options.post.save();

      App.router.navigate('', { trigger: true});

    }



  });


}());
