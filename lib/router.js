// http://guide.meteor.com/routing.html#flow-router

FlowRouter.route('/', {
  name: 'home',
  action(params, queryParams) {
    console.log("you are " + queryParams + "and you're looking at the home page");
    BlazeLayout.render('homeLayout', {main: 'random'});
  }
});
FlowRouter.route('/admin', {
  name: 'admin',
  action(params, queryParams) {
    console.log("you are " + queryParams + "and you're looking at the admin");
    BlazeLayout.render('adminLayout', {main: 'lines'});
  }
});
