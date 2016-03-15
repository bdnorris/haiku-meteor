HaikuLines = new Mongo.Collection("lines");



if (Meteor.isClient) {
    
    Template.body.helpers({
        lines: function() {
            return HaikuLines.find({}, {sort: {createdAt: -1}});
        },
        'randLinesFive' : function () {
            //var fives = HaikuLines.findOne({syl: "5"});
            //console.log(fives.length);
            var fives = HaikuLines.findOne({syl:"5"}, {rnd:{ $gte: Math.random() }},);
            console.log(fives);
            return fives;
        },
        'randLinesSeven' : function () {
            return HaikuLines.find({syl: "7"}).fetch();
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
        }
    });
    
    Template.line.events({
        "click .delete": function () {
          HaikuLines.remove(this._id);
        },
    });

    /*Template.randLine.events ({
        
    });*/
    
  
}



