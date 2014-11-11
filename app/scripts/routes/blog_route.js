(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    routes: {

      '' : 'home',
      'add' : 'addPost'


    },

    home: function (){


      new App.Views.ListPost({ collection: App.posts});
    },

    addPost: function () {
      new App.Views.AddPost();
    }

  });


}());
