Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: "loading",
    notFoundTemplate: "notFound"
});

Router.plugin('ensureSignedIn', {
  except: ['accueil', 'register', 'login', 'articles', 'Fpassword']
});

Router.route('/', {
    name: 'accueil'
});
Router.route('/articles', {
    name: 'articles'
});
Router.route('/new', {
    name: 'new'
});

Router.route('/article/:_id', function () {
    this.render('article', {
      data: function () {
        arti = this.params._id;
        
        return  arti;     
      }
    });
  });

  Router.route('/articles/:category', function () {
    this.render('cFarticles', {
      data: function () {
        categ = this.params.category;
        return categ;
      }
    });
  });

  Router.route('/register', {
    name: 'register'
});
Router.route('/login', {
  name: 'login'
});
Router.route('/Fpassword', {
  name: 'Fpassword'
});
