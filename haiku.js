HaikuLines = new Mongo.Collection("lines");

if (Meteor.isClient) {

  AccountsTemplates.configure({
    defaultLayoutType: 'blaze', // Optional, the default is 'blaze'
    defaultTemplate: 'defaultLayout',
    defaultLayout: 'main',
    defaultLayoutRegions: {
        nav: 'nav',
        footer: 'footer'
    },
    defaultContentRegion: 'container'
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
            return HaikuLines.find({}, {sort: {createdAt: -1}});
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

    Template.homeLayout.events({

        "click .reload": function () {
            randLinesDep.changed();
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
            HaikuLines.remove(this._id);
        },
        "submit .new-line": function(event, syl) {
            // Prevent default browser form submit
            event.preventDefault();

            var text = event.target.text.value;
            var syl = event.target.syl.value;

            // Insert a task into the collection
            // Tasks is the Mongo.Collection("tasks")
            HaikuLines.insert({
                text: text,
                createdAt: new Date(), // current time
                rnd: Math.random(),
                syl: syl
                //_id: i
            });

            // Clear form
            event.target.text.value = "";
        },
    });


}
