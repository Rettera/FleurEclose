import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('articles', function articlesPublication() {
    		// Show newest articles at the top
				return Articles.find({/*category: category*/}, {
          sort: {
            date: -1
          }
        });
  });
  Meteor.publish('comments', function commentsPublication() {
    // Show newest articles at the top
    return Comments.find({/*category: category*/}, {
      sort: {
        date: -1
      }
    });
});
}

Meteor.startup(() => {
  // code to run on server at startup
});
