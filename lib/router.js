// http://guide.meteor.com/routing.html#flow-router

FlowRouter.route('/', {
  name: 'home',
  action(params, queryParams, email) {
    console.log("You're looking at the home page");
    document.querySelectorAll('body').className += " home";
    //document.querySelectorAll('body').className -= "admin");
    BlazeLayout.render('defaultLayout', {main: 'homeLayout', nav: 'nav', footer: 'footer'});
  }
});
FlowRouter.route('/admin', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  name: 'admin',
  action(params, queryParams) {
    console.log("You're looking at the admin");
    document.querySelectorAll('body').className += " admin";
    //document.querySelectorAll('body').className -= "home");
    BlazeLayout.render('defaultLayout', {main: 'adminLayout', nav: 'nav', footer: 'footer'});
  }
});


AccountsTemplates.configureRoute('signIn', {
  layoutType: 'blaze',
  name: 'signin',
  path: '/login',
  template: 'myLogin',
  layoutTemplate: 'defaultLayout',
  layoutRegions: {
    nav: 'nav',
    footer: 'footer'
  },
  contentRegion: 'main',

});
