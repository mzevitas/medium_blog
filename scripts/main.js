(function () {

  App.Models.Blog = Parse.Object.extend({

    className: 'Blog',
    idAttribute: 'objectId',

    defaults: {
      title: '',
      author: '',
      content: '',
      tags: '',
      comments: '',
      ratings: ''
    },

    initialize: function (){
      var b = this.get('title');
    }

  });

}());

(function () {

  App.Collections.Blogs = Parse.Collection.extend ({
    model: App.Models.Blog
  });

}());

(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    routes: {

      '' : 'home',
      'profile' : 'profile',
      'add' : 'addPost',
      'login' : 'userLogin',
      'signup' : 'userSignUp',
      'edit/:postID' : 'editPost'


    },

    home: function (){

      new App.Views.PublicPost({ collection: App.posts});
    },

    profile: function (){

      new App.Views.ProfileView({ collection: App.posts });
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

(function () {

  App.Views.PublicPost = Parse.View.extend ({
    tagName: 'ul',
    className: 'public_published',

    events: {},

    template: _.template($('#public-blog-posts').html()),

  initialize: function (options){

    this.options= options;

    this.collection.off();
    this.collection.on('sync', this.postQuery, this);

    $('#blogPosts').html(this.$el);

    this.postQuery();
  },

  postQuery: function () {
    var self = this;

    var all_post = new Parse.Query(App.Models.Blog);
  
    all_post.find({
      success: function (results) {
        self.collection = results;
        self.render();
      }
    });

  },

  render: function () {
    var self = this;

    this.$el.empty();

    var local_collection = this.collection;

    _.each(local_collection, function (p) {
      self.$el.append(self.template(p.toJSON()));
    });

    return this;

  }






  });

}());

(function () {

  App.Views.ProfileView = Parse.View.extend ({
    tagName: 'ul',
    className: 'published',

    events: {},

    template: _.template($('#blog-posts').html()),

    initialize: function (options){

      this.options= options;

      this.collection.off();
      this.collection.on('sync', this.postQuery, this);

      $('#blogPosts').html(this.$el);

      this.postQuery();
    },

    postQuery: function () {
      var self = this;

      var user_post = new Parse.Query(App.Models.Blog);
      user_post.equalTo('user', App.user);
      user_post.find({
        success: function (results) {
          self.collection = results;
          self.render();
        }
      });

    },

    render: function () {
      var self = this;

      this.$el.empty();

      var local_collection = this.collection;

      _.each(local_collection, function (p) {
        self.$el.append(self.template(p.toJSON()));
      });

      return this;

    }


  });

}());

(function () {

  App.Views.AddPost = Parse.View.extend ({

      events: {
        'click #publish-post' : 'addPost'
      },

      template: _.template($('#create-post').html()),

      initialize: function () {
        this.render();

        $('#blogPosts').html(this.$el);


        // $('#postContent').autosize();
      },

      render: function () {
        this.$el.empty();

        this.$el.html($('#create-post').html());

      },

      addPost: function (e) {
        e.preventDefault();

          var p = new App.Models.Blog({
            title: $('#postTitle').val(),
            author: $('#postAuthor').val(),
            content: $('#postContent').val(),
            tags: $('#postTag').val(),
            user: App.user
          });

          p.save(null, {
            success: function () {
              App.posts.add(p);
              App.router.navigate('profile', { trigger: true });
            }
          });

       }
  });
}());

(function () {

  App.Views.SinglePost = Parse.View.extend({

    tagName: 'ul',
    className: 'singlePost',

    events: {

      'submit #editPost' : 'editPost',

    },

    template: _.template($('#single-posts').html()),

    initialize: function (options) {
      this.options = options;

      this.render();

      // $('').empty();

      $('#blogPosts').html(this.$el);

    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template(this.options.post.toJSON()));
    },

    editPost:  function (e) {
      e.preventDefault();

      this.options.post.set({
        title: $('#update_title').val(),
        content: $('#update_content').val(),
        tags: $('#update_tags').val()

      });

      this.options.post.save();

      App.router.navigate('', { trigger: true});

    }



  });


}());

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
          App.router.navigate('#/login', { trigger: true });
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.message);
        }
      });
    }

  });

}());

(function () {

  App.Views.LoginView = Parse.View.extend({

    className: 'loggingIn',

    events: {
      'submit #Login' : 'userLogin'
    },

    template:  _.template($('#user-form').html()),

    initialize: function () {
      this.render();

      $('#blogPosts').html(this.$el);
    },

    render: function () {
      this.$el.html(this.template);
    },

    userLogin: function(e) {
      e.preventDefault();

      var username = $('#userName').val();
      var password = $('#password').val();
      // var useremail = $('#userEmail').val();

      Parse.User.logIn(username, password, {
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

/*!
  Autosize 1.18.15
  license: MIT
  http://www.jacklmoore.com/autosize
*/
!function(e){var t,o={className:"autosizejs",id:"autosizejs",append:"\n",callback:!1,resizeDelay:10,placeholder:!0},i='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',n=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent","whiteSpace"],a=e(i).data("autosize",!0)[0];a.style.lineHeight="99px","99px"===e(a).css("lineHeight")&&n.push("lineHeight"),a.style.lineHeight="",e.fn.autosize=function(i){return this.length?(i=e.extend({},o,i||{}),a.parentNode!==document.body&&e(document.body).append(a),this.each(function(){function o(){var t,o=window.getComputedStyle?window.getComputedStyle(u,null):!1;o?(t=u.getBoundingClientRect().width,(0===t||"number"!=typeof t)&&(t=parseFloat(o.width)),e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,i){t-=parseFloat(o[i])})):t=p.width(),a.style.width=Math.max(t,0)+"px"}function s(){var s={};if(t=u,a.className=i.className,a.id=i.id,d=parseFloat(p.css("maxHeight")),e.each(n,function(e,t){s[t]=p.css(t)}),e(a).css(s).attr("wrap",p.attr("wrap")),o(),window.chrome){var r=u.style.width;u.style.width="0px";{u.offsetWidth}u.style.width=r}}function r(){var e,n;t!==u?s():o(),a.value=!u.value&&i.placeholder?p.attr("placeholder")||"":u.value,a.value+=i.append||"",a.style.overflowY=u.style.overflowY,n=parseFloat(u.style.height),a.scrollTop=0,a.scrollTop=9e4,e=a.scrollTop,d&&e>d?(u.style.overflowY="scroll",e=d):(u.style.overflowY="hidden",c>e&&(e=c)),e+=w,n!==e&&(u.style.height=e+"px",a.className=a.className,f&&i.callback.call(u,u),p.trigger("autosize.resized"))}function l(){clearTimeout(h),h=setTimeout(function(){var e=p.width();e!==g&&(g=e,r())},parseInt(i.resizeDelay,10))}var d,c,h,u=this,p=e(u),w=0,f=e.isFunction(i.callback),z={height:u.style.height,overflow:u.style.overflow,overflowY:u.style.overflowY,wordWrap:u.style.wordWrap,resize:u.style.resize},g=p.width(),y=p.css("resize");p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(w=p.outerHeight()-p.height()),c=Math.max(parseFloat(p.css("minHeight"))-w||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word"}),"vertical"===y?p.css("resize","none"):"both"===y&&p.css("resize","horizontal"),"onpropertychange"in u?"oninput"in u?p.on("input.autosize keyup.autosize",r):p.on("propertychange.autosize",function(){"value"===event.propertyName&&r()}):p.on("input.autosize",r),i.resizeDelay!==!1&&e(window).on("resize.autosize",l),p.on("autosize.resize",r),p.on("autosize.resizeIncludeStyle",function(){t=null,r()}),p.on("autosize.destroy",function(){t=null,clearTimeout(h),e(window).off("resize",l),p.off("autosize").off(".autosize").css(z).removeData("autosize")}),r())})):this}}(jQuery||$);

Parse.initialize("987y8DiFXRHgSkRnchrmgg5tKs0k4vfuj8SG5Qzj", "9Ordnpe294Dr1uzZ14LEMdgTf5TJQmJu73va9Wwk");

(function () {


//instance of collection
  App.posts = new App.Collections.Blogs();

  //server fetch
  App.posts.fetch().done( function (){

    App.router = new App.Routers.AppRouter();
    Parse.history.start();

  });

  // Log Out
  $('#logOut').on('click', function (e) {
    e.preventDefault();

    Parse.User.logOut();
    App.updateUser();
    App.router.navigate('login', {trigger: true});
  });

    // Update User
  App.updateUser = function (){
    App.user = Parse.User.current();
    var currUsr;
    if (App.user == null){
      currUsr = '';
      $('#logOut').text('Log In');
    } else {
      currUsr = 'Welcome ' + App.user.attributes.username;
      $('#logOut').text('Log Out');
    }
    $('#loggedIn').html(currUsr);
  };
  App.updateUser();

}());
