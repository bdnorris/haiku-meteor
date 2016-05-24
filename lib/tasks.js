import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'HaikuLines.insert'(text, syl) {
    check(text, String);
    check(syl, String)

    //console.log("made it past checks")
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
      console.log("error thrown - not-authorized");
    }

    //console.log("about to run the insert");
    //console.log(text + " " + syl + " " + Meteor.user().emails[0].address);
    HaikuLines.insert({
      text: text,
      createdAt: new Date(), // current time
      rnd: Math.random(),
      syl: syl,
      user: Meteor.user().emails[0].address,
    });
  },
  'HaikuLines.remove'(taskId) {
    console.log('remove start');
    check(taskId, String);
    console.log('check passed with: ' + taskId)
    HaikuLines.remove(taskId);
  },
  /*'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    HaikuLines.update(taskId, { $set: { checked: setChecked } });
  },*/
});
