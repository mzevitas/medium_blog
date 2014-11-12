Parse.initialize("987y8DiFXRHgSkRnchrmgg5tKs0k4vfuj8SG5Qzj", "9Ordnpe294Dr1uzZ14LEMdgTf5TJQmJu73va9Wwk");

(function () {


//instance of collection
  App.posts = new App.Collections.Blogs();

  //server fetch
  App.posts.fetch().done( function (){

    App.router = new App.Routers.AppRouter();
    Parse.history.start();

  });


}());
