HaikuLines = new Mongo.Collection("lines");

if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
        lines: function() {
            return HaikuLines.find({}, {sort: {createdAt: -1}});
        },
        rand: function() {
            //return HaikuLines.findOne({}, {rnd:{ $gte: Math.random() }}, {$orderby: { rnd: 1 }});
            //return HaikuLines.find({rnd:{$gte: Math.random()}}, {limit: 1}, {});
            
            //var query = { state: 'OK' };
            //n = HaikuLines.count({});
            //console.log(n);
            //var r = Math.floor(Math.random() * n);
            //return HaikuLines.find(query).limit(1).skip(r);
            //function getThreeLines() {
               
                    var n = HaikuLines.find({});
                    var c = n.count();
                    var r = Math.floor(Math.random() * c);
                    var z = HaikuLines.find({}, {skip: r, limit: 1});
               
  return "hello";
                   // var hello = [z, "one", "two"];
            
            
            
            
                
            //}
            
            //console.debug(c);
            
            //var r = Math.floor(Math.random());
            //var r = Math.floor(Math.random() * 0.99999999999999) + 0; 
            //var r = Math.random() * 0.99999999999999 + 0;
            //var r = Math.random() * 1 + 0;
            //console.debug(r);
            //return HaikuLines.find({}, {limit: 3}, {skip: r});
            
            //return HaikuLines.find({rnd: {$gt:r}}, {limit: 3}, {skip: r});
            //return db.HaikuLines.find({rand:{$gt:r}}).sort({rand:1}).limit(3);
            //return HaikuLines.find().skip(c).limit(1);
            //limit(3).skip(r);
        },
        
        randLines: [
            { text: function() {
                
                var n = HaikuLines.find({});
                    var c = n.count();
                    var r = Math.floor(Math.random() * c);
                    var z = HaikuLines.find({}, {skip: r, limit: 1});
                console.log(z);
                return z;
                
            }
            },
            { text: "This is task 2" },
            { text: "This is task 3" }
        ]
        
        // Lets instead, make two arrays, one for all of the 5 syl and one for all of the 2 syl on load.
        
        
        
    });
    
    // Event Handler
    // Template . templateName . events 
    Template.body.events({
        "submit .new-line": function(event) {
            // Prevent default browser form submit
            event.preventDefault();
            
            // Get value from form element
            // event.target is the form element and 
            // text.value gets the value
            var text = event.target.text.value;
            //console.log(event);
            
            // Insert a task into the collection 
            // Tasks is the Mongo.Collection("tasks")
            HaikuLines.insert({
                text: text,
                createdAt: new Date(), // current time
                rnd: Math.random()
                //_id: i
            });
            
            // Clear form
            event.target.text.value = "";
        }
    });
    
     Template.line.events({
    //"click .toggle-checked": function () {
        // Set the checked property to the opposite of its current value
        //HaikuLines.update(this._id, {
        //    $set: {checked: ! this.checked}
        //  });
   // },
    "click .delete": function () {
      HaikuLines.remove(this._id);
    },
  });
    
    Template.randLine.events ({
        
    });
    
}