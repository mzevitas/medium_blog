(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    routes: {

      '' : 'home',
      'add' : 'addPost',
      'login' : 'userLogin',
      'signup' : 'userSignUp',
      'edit/:postID' : 'editPost'


    },

    home: function (){

      new App.Views.ListPost({ collection: App.posts});
    },

    editPost: function (postID) {

    if(!App.user) return App.router.navigate('login', { trigger: true});

    var p = App.posts.get(postID);
    new App.Views.SinglePost({ post: p });

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
