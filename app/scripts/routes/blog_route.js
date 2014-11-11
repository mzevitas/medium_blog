(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    router: {

      '' : 'home',

    },

    home: function (){


      new App.Views.ListPost({ collection: App.posts});
    }

  });

}());
