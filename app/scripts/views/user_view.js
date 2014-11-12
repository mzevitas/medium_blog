(function () {

  App.Views.LoginView = Parse.View.extend({

    className: 'loggingIn',

    events: {
      'submit #Login' : 'userLogin'
    },

    template:  $('#user-form').html(),

    initialize: function () {
      this.render();

      $('#blogPosts').html(this.$el);
    },

    render: function () {
      this.$el.html(this.template);
    },

    userLogin: function(e) {
      e.preventDefault();

      var userEmail = $('#userEmail').val();
      var password = $('#password').val();

      Parse.User.logIn(userEmail, password, {
        success: function (user) {
          App.updateUser();
          App.router.navigate('', { trigger: true });
        },

        error: function (user, error) {
          alert("Error: " + error.message);
        }
      });

    }


  });

}());
