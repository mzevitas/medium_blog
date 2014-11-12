(function () {

  App.Views.SignUpView = Parse.View.extend({

    className: 'signingup',

    events: {
      'submit #SignUp' : 'userSignUp'
    },

    template: _.template($('#user-signup').html()),

    initialize: function () {
      this.render();

      $('#blogPosts').html(this.$el);
    },

    render: function () {
      this.$el.html(this.template);
    },

    userSignUp: function (e) {
      e.preventDefault();

    var user = new Parse.User({
      username: $("#signupName").val(),
      password: $("#signupPassword").val(),
      // email: $("#signupEmail").val(),
      // user.set("password", "#signupPassword");
      });

      // user.signUp();

      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
          App.router.navigate('', { trigger: true });
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.message);
        }
      });
}

  });

}());
