
//if(Meteor.isClient ){
    // This code only runs on the client

    /*Template.body.helpers({
        tasks: function () {
            return Tasks.find({});
        },
        tasks: function () {
            // Show newest tasks first
            return Tasks.find({}, {sort: {createdAt: -1}});
        }
    });*/

    Template.body.helpers({
        tasks: function () {
            var CheckSes = Session.get("hideCompleted");
            console.log("CheckSes : ", CheckSes);

            if (Session.get("hideCompleted")) {
                // If hide completed is checked, filter tasks
                return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
            } else {
                // Otherwise, return all of the tasks
                return Tasks.find({}, {sort: {createdAt: -1}});
            }
        },
        hideCompleted: function () {
            return Session.get("hideCompleted");
        },
        incompleteCount: function () {
            return Tasks.find({checked: {$ne: true}}).count();
        }
    });

    Template.body.events({
        "submit .new-task": function (event) {
            // This function is called when the new task form is submitted

            var text = event.target.text.value;
            if(text.length != 0 && text.trim() != ""){
                /*Tasks.insert({
                    text: text,
                    createdAt: new Date() // current time
                });*/
                /*Tasks.insert({
                    text: text,
                    createdAt: new Date(),            // current time
                    owner: Meteor.userId(),           // _id of logged in user
                    username: Meteor.user().username  // username of logged in user
                });*/

                // replace Tasks.insert( ... ) with:
                Meteor.call("addTask", text);

            }else{
                alert("Please Insert Some Text and Then Submit form .")
            }

            // Clear form
            event.target.text.value = "";

            // Prevent default form submit
            return false;
        },
        "change .hide-completed input": function (event) {
            Session.set("hideCompleted", event.target.checked);
        }
    });

    Template.task.events({
        "click .toggle-checked": function () {
            // Set the checked property to the opposite of its current value
            //Tasks.update(this._id, {$set: {checked: ! this.checked}});
            
            // replace Tasks.update( ... ) with:
            Meteor.call("setChecked", this._id, ! this.checked);

        },
        "click .delete": function () {
            //Tasks.remove(this._id);

            // replace Tasks.remove( ... ) with:
            Meteor.call("deleteTask", this._id);

        }
    });
// At the bottom of the client code
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});
//}