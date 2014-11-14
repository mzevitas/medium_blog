(function () {

  App.Models.Comment = Parse.Object.extend({

    className: 'Comments',
    idAttribute: 'objectId',

    defaults: {
    comments: ''

    },

    initialize: function (){
      // var f = this.get('comments');
    }

  });

}());
