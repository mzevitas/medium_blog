(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    routes: {

      '' : 'home',
      'profile' : 'profile',
      'add' : 'addPost',
      'login' : 'userLogin',
      'signup' : 'userSignUp',
      'edit/:postID' : 'editPost',
      'read/:postID' : 'readPost',
      'save/:postID' : 'saveDraft'



    },

    home: function (){

      new App.Views.PublicPost({ collection: App.posts});
    },

    profile: function (){

      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.ProfileView({ collection: App.posts });
    },

    editPost: function (postID) {

      if(!App.user) return App.router.navigate('login', { trigger: true});

      var p = App.posts.get(postID);
      new App.Views.SinglePost({ post: p });

    },
    readPost: function (postID) {
      // if(!App.user) return App.router.navigate('read', { trigger: true});

      var p = App.posts.get(postID);
      new App.Views.ReadPost({ post: p });

    },

    addPost: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.AddPost();

    },

    saveDraft: function () {
      if(!App.user) return App.router.navigate('', { trigger: false});

      // new App.Views.AddPost();

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
