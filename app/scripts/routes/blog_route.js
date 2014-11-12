(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    routes: {

      '' : 'home',
      'add' : 'addPost',
      'login' : 'userLogin',
      'signup' : 'userSignUp'


    },

    home: function (){


      new App.Views.ListPost({ collection: App.posts});
    },

    addPost: function () {
      // if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.AddPost();

    },

    userSignUp: function () {
      if(App.user) return App.router.navigate('', { trigger: true});

      new App.Views.SignUpView();

    },

    userLogin: function () {
      if(App.user) return App.router.navigate('', { trigger: true});

      new App.Views.LoginView();

    }

  });


}());
