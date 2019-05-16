import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

T9n.setLanguage('fr');

Template.new.events({
	'submit .new-article' (event) {
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		const target = event.target;
		const title = target.title.value;
		const img = target.img.value;
		const content = target.content.value;
		const category = target.category.value;
		const createdAt = new Date(); // current date
    let date = moment(createdAt).format('DD/MM/YYYY');
    const ownerId = Meteor.userId();
		const owner = Meteor.user().profile;
		const author = owner.Pseudo;
		const views = 0;
    
    Meteor.call('articles.insert', title, img, content, category, date, author, ownerId, views);
    
		Router.go('/articles'); //redirection articles
	},
});

Template.articles.onCreated(function articleOnCreated() {
	this.state = new ReactiveDict();
	Meteor.subscribe('articles');
});

Template.accueil.helpers({
  articles() {
		// Show viewest articles at the top
		viewsArt = Articles.find({}, {sort: {views: -1}, limit: 4});
		console.log(viewsArt);

    
    return  viewsArt;
	},
});

Template.articles.events({
	'click .more': function (event, instance) {
		views = Articles.findOne({_id: this._id}).views;
		Meteor.call('views.update', this._id, views)
}
	//com = Comments.find({articleId: this._id}).count();
});

Template.articles.helpers({
  articles() {
    // Show newest articles at the top
    return Articles.find({}, {sort: {date: -1}});
	},
});

Template.cFarticles.helpers({
  articles() {
		console.log(categ);
    // Show newest articles at the top & filtre category
    return Articles.find({category: categ}, {sort: {date: -1}});
	},
});

Template.article.events({
	'click .edit-article': function(event, instance) {
		Modal.show('m_edit_article', instance.data);
	},
	'click .delete' (event, instance) {
		Meteor.call('articles.remove', this._id);
		Router.go('/articles'); //redirection articles
	},
	'submit .new-comment'(event){
			// Prevent default browser form submit
		event.preventDefault();
		const authorC = Meteor.user().profile.Pseudo;
		const target = event.target;
		const contentC = target.contentC.value;
		moment.locale(); 
		const createdAt = moment(new Date()).startOf('hour').fromNow();
		const articleId = arti;
		const image = Meteor.user().profile.ImageProfile;

		//console.log(articleId);
		
		Meteor.call('comment.insert', authorC, contentC, createdAt, articleId, image);
		Router.go('/article/{{_id}}');
	}
});
Template.article.helpers({
	comments(){
		console.log(Comments.find({articleId: arti}).contentC);
		 return Comments.find({articleId: arti});
		 
	 },
	 articles() {
			return Articles.findOne({_id: arti});
		},
});

Template.m_edit_article.events({ //CRUD: update
	"submit .edit-article" (event, instance) {
	event.preventDefault();
	const target = event.target;
	const title = target.title.value;
	const img = target.img.value;
	const content = target.content.value;
	const category = target.category.value;

		Meteor.call('articles.update', this._id, title, img, content, category);
		Modal.hide();
		Router.go('/articles');
	},
});

Template.header.events({
	'click .logout' () {
		Meteor.logout();
		Router.go('/');
	}
});