HaikuLines = new Mongo.Collection("lines");



if (Meteor.isClient) {
    
    function randLinesFunc(syll) {
        var myLines = HaikuLines.find({syl:syll}).fetch();
            var myLinesIndex = Math.floor( Math.random() * myLines.length );
            return myLines[myLinesIndex];
    }
    /*function randLinesSevenFunc() {
        var sevens = HaikuLines.find({syl:"7"}).fetch();
            var sevensIndex = Math.floor( Math.random() * sevens.length );
            return sevens[sevensIndex];
    }*/

    var randLinesDep = new Tracker.Dependency;
    var randLinesFive1Dep = new Tracker.Dependency;
    var randLinesFive2Dep = new Tracker.Dependency;
    var randLinesSevenDep = new Tracker.Dependency;
    
    Template.body.helpers({
        lines: function() {
            return HaikuLines.find({}, {sort: {createdAt: -1}});
        },
        'randLinesFive1' : function () {
            //var fives = HaikuLines.findOne({syl: "5"});
            //console.log(fives.length);
            //r = Math.random();
            //var fives = HaikuLines.findOne({syl:"5"}, {rnd:{ $gt: r }});
            randLinesDep.depend();
            randLinesFive1Dep.depend();
            return randLinesFunc("5");
        },
        'randLinesFive2' : function () {
            //var fives = HaikuLines.findOne({syl: "5"});
            //console.log(fives.length);
            //r = Math.random();
            //var fives = HaikuLines.findOne({syl:"5"}, {rnd:{ $gt: r }});
            randLinesDep.depend();
            randLinesFive2Dep.depend();
            return randLinesFunc("5");
        },
        'randLinesSeven' : function () {
            //return HaikuLines.find({syl: "7"}).fetch();
            randLinesDep.depend();
            randLinesSevenDep.depend();
            return randLinesFunc("7");
        },
        
    });

    Template.body.events({
        "submit .new-line": function(event, syl) {
            // Prevent default browser form submit
            event.preventDefault();
            
            // Get value from form element
            // event.target is the form element and 
            // text.value gets the value
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
        "click .reload": function () {
            randLinesDep.changed();
        },
        "click .seven": function (event) {
            event.preventDefault();
            randLinesSevenDep.changed();
        },
        "click .five1": function (event) {
            event.preventDefault();
            randLinesFive1Dep.changed();
        },
        "click .five2": function (event) {
            event.preventDefault();
            randLinesFive2Dep.changed();
        },
    });
    
    Template.line.events({
        "click .delete": function () {
            HaikuLines.remove(this._id);
        },
    });
    

    /*Template.randLine.events ({
        
    });*/
    
  
}



