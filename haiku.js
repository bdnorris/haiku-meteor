HaikuLines = new Mongo.Collection("lines");
import { Tasks } from './lib/tasks.js';

if (Meteor.isClient) {

  AccountsTemplates.configure({
    defaultLayoutType: 'blaze', // Optional, the default is 'blaze'
    defaultTemplate: 'defaultLayout',
    defaultLayout: 'main',
    defaultLayoutRegions: {
        nav: 'nav',
        footer: 'footer'
    },
    defaultContentRegion: 'main',
    // comment out this next line or change to false to register new accounts
    //forbidClientAccountCreation: true
    });

    function randLinesFunc(syll) {
        var myLines = HaikuLines.find({syl:syll}).fetch();
            var myLinesIndex = Math.floor( Math.random() * myLines.length );
            return myLines[myLinesIndex];
    }

    var randLinesDep = new Tracker.Dependency;
    var randLinesFive1Dep = new Tracker.Dependency;
    var randLinesFive2Dep = new Tracker.Dependency;
    var randLinesSevenDep = new Tracker.Dependency;

    isSuperAdmin = function() {
      if (Meteor.user().emails[0].superAdmin === 1) {
        return true
      }
      else {
        return false
      }
    }
    // ADDING SUPERADMIN EXAMPLE from MONGO CONSOLE
    /*
    db.users.update(
    {_id: "qH84gvYiYoc2veNEr"},
    {
    	$set: {
    		emails: [{ address: "bdnorris@gmail.com", superAdmin: 1 }]
    		}
    })
    */


    /*
    ##     ## ######## ##       ########  ######## ########   ######
    ##     ## ##       ##       ##     ## ##       ##     ## ##    ##
    ##     ## ##       ##       ##     ## ##       ##     ## ##
    ######### ######   ##       ########  ######   ########   ######
    ##     ## ##       ##       ##        ##       ##   ##         ##
    ##     ## ##       ##       ##        ##       ##    ##  ##    ##
    ##     ## ######## ######## ##        ######## ##     ##  ######
    */

    //Template.defaultLayout.helpers({});
    Template.registerHelper( 'admin', () => {
      let superAdmin = isSuperAdmin();

      if ( superAdmin === true ) {
        return true;
      }
    });

    Template.defaultLayout.helpers({
      'routeName' : function () {
        return FlowRouter.getRouteName();
      }
    });

    Template.homeLayout.helpers({
        'randLinesFive1' : function () {
            randLinesDep.depend();
            randLinesFive1Dep.depend();
            return randLinesFunc("5");
        },
        'randLinesSeven' : function () {
            randLinesDep.depend();
            randLinesSevenDep.depend();
            return randLinesFunc("7");
        },
        'randLinesFive2' : function () {
            randLinesDep.depend();
            randLinesFive2Dep.depend();
            return randLinesFunc("5");
        },
        
    });

    Template.adminLayout.helpers({
        lines: function() {
          var currUser = Meteor.user().emails[0].address;
          if (isSuperAdmin() === true) {
            return HaikuLines.find({}, {sort: {createdAt: -1}});
          }
          else if (isSuperAdmin() === false) {
            return HaikuLines.find({user: currUser}, {sort: {createdAt: -1}});
          }
          else {
            alert('error');
          }
        },
    });


    /*
    ######## ##     ## ######## ##    ## ########  ######
    ##       ##     ## ##       ###   ##    ##    ##    ##
    ##       ##     ## ##       ####  ##    ##    ##
    ######   ##     ## ######   ## ## ##    ##     ######
    ##        ##   ##  ##       ##  ####    ##          ##
    ##         ## ##   ##       ##   ###    ##    ##    ##
    ########    ###    ######## ##    ##    ##     ######
    */

    Template.nav.events({
      // deprecated this event
      "click #log-out": function (e) {
          e.preventDefault();
          AccountsTemplates.logout();
          Meteor.logout();
      },
    });

    Template.homeLayout.events({

        "click #reload": function (e) {
            randLinesDep.changed();
            dynamics.animate(e.currentTarget, {
                scale: 1.5,
            }, {
                type: dynamics.spring,
                frequency: 200,
                friction: 200,
                duration: 1500
            });

            /*Meteor.setTimeout(
                function(e) {
                    dynamics.animate(e.currentTarget, {
                        translateX: -350,
                        scale: 1,
                        opacity: 1
                    },
                    {
                        type: dynamics.spring,
                        frequency: 200,
                        friction: 200,
                        duration: 1500
                    });
                },
            1000);*/
            
            /*setTimeout(function(e) {
                console.log("hi")
            }, 1000)*/
            dynamics.setTimeout(function(){
                console.log('hello');
                           dynamics.animate(e.currentTarget, {
                scale: 1,
            }, {
                type: dynamics.spring,
                frequency: 200,
                friction: 200,
                duration: 1500
            })
            }, 500)
        },

        "click .five1": function (event) {
            event.preventDefault();
            randLinesFive1Dep.changed();
        },
        "click .seven": function (event) {
            event.preventDefault();
            randLinesSevenDep.changed();
        },
        "click .five2": function (event) {
            event.preventDefault();
            randLinesFive2Dep.changed();
        },
    });

    Template.adminLayout.events({
        "click .delete": function () {
            //HaikuLines.remove(this._id);
            Meteor.call('HaikuLines.remove', this._id);
        },
        "submit .new-line": function(event) {
            // Prevent default browser form submit
            event.preventDefault();

            const text = event.target.text.value;
            const syl = event.target.syl.value;

            // Insert a task into the collection
            // Tasks is the Mongo.Collection("tasks")
            /*HaikuLines.insert({
                text: text,
                createdAt: new Date(), // current time
                rnd: Math.random(),
                syl: syl,
                user: Meteor.user().emails[0].address,
            });*/
            //alert(text + " " + syl);
            Meteor.call('HaikuLines.insert', text, syl);

            // Clear form
            event.target.text.value = "";
        },
    });


}
