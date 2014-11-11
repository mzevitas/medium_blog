(function () {

  App.Collections.Blogs = Parse.Collection.extend ({
    model: App.Models.Blog
  });

}());

(function () {

  App.Models.Blog = Parse.Object.extend({

    className: 'Blog',
    idAttribute: 'objectId',

    defaults: {
      title: '',
      author: '',
<<<<<<< HEAD
      content: '', //pull from parse.
=======
      content: '',
>>>>>>> 3c9452207aba7110254ddb3a53d11a3b4378e304
      tags: '',
      comments: '',
      ratings: ''
    },

    initialize: function (){
<<<<<<< HEAD
      var b = this.get('title');
      console.log(b + " is title");
=======
      // var b = this.get('title');
>>>>>>> 3c9452207aba7110254ddb3a53d11a3b4378e304
    }

  });

}());

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

(function () {

  App.Views.ListPost = Parse.View.extend ({
    tagName: 'ul',
    className: '',

    events: {},

    template: _.template($('#blog-posts').html()),

    initialize: function (options){

      this.options= options;
      this.render();

      $('#blogPosts').html(this.$el);
    },

    render: function () {
      this.$el.empty();
<<<<<<< HEAD

      return this;
=======
>>>>>>> 3c9452207aba7110254ddb3a53d11a3b4378e304
    }



  });

}());

(function () {

  App.Views.AddPost = Parse.View.extend ({

      events: {
        'submit #addPost' : 'addPost'
      },

      initialize: function () {
        this.render();

        $('#blogPosts').html(this.$el);
      },

      render: function () {
        this.$el.html($('#create-post').html());
      },

      addPost: function (e) {
        e.preventDefault();

          var p = new App.Models.Blog({
            title: $('#postTitle').val(),
            content: $('#postContent').val(),
            tag: $('#postTag').val()
          });
          p.save(null, {
            sucess: function () {
              App.posts.add(p);
              App.router.navigate('', {trigger: true});
            }
          });
       }
  });
}());

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
