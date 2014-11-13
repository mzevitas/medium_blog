(function () {

  App.Views.ReadPost = Parse.View.extend({

    tagName: 'ul',
    className: 'readPost',

    events: {

      'submit #readPost' : 'readPost'


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
    }



  });


}());
