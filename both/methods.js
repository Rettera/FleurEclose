import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Meteor.methods({
    'articles.insert'(title, img, content, category, date, author, ownerId, views) {
      check(content, String);
   
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
   
      Articles.insert({
        title,
        img,
        content,
        category,
        date,
        author,
        ownerId,
        views,
      });  
    },
    'articles.remove'(articleId) {
      
      Articles.remove({_id: articleId});
      
    },
    'articles.update'(articleId, title, img, content, category) {
      check(content, String);
        
      Articles.update({_id: articleId},{$set: {
        title,
        img,
        content,
        category,
    }
});
    },
    'views.update'(articleId, views){
               	// increment the counter when button is clicke
		Articles.update({_id: articleId},{$set: {
                views: views+1,
        }
    }
    );
    },
    'comment.insert'(authorC, contentC, createdAt, articleId, image) {
      check(contentC, String);
   
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
   
      Comments.insert({
    authorC,
    contentC,
    createdAt,
    articleId,
    image,
      });  
    },

  });