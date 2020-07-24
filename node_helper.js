var NodeHelper = require("node_helper");
var schedule = require('node-schedule');
var DateDiff = require('date-diff');

// add require of other javascripot components here
// var xxx = require('yyy') here

module.exports = NodeHelper.create({

    start() {
        this.foo = 0;
    },

    getDaysLeft() {
        let diff = new DateDiff(new Date(2021, 10, 5), new Date()).days()
        return Math.floor(diff);
    },

    sendDaysLeft() {
        this.sendSocketNotification('RUN',
            {
                timeRemaing: this.getDaysLeft()
            });
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === 'START') {
            this.sendDaysLeft();
            var self = this;
            var j = schedule.scheduleJob('0 0 * * *', function () {
                self.sendDaysLeft();
            });

        }
    },

});