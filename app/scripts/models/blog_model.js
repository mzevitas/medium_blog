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
      // var b = this.get('title');
    }

  });

}());
