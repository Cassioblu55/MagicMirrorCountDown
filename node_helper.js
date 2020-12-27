var NodeHelper = require("node_helper");
var schedule = require('node-schedule');
var DateDiff = require('date-diff');
var numeral = require('numeral');

// add require of other javascripot components here
// var xxx = require('yyy') here

module.exports = NodeHelper.create({

    getMinutesLeft() {
        let diff = Math.floor(new DateDiff(new Date(2021, 3, 1), new Date()).minutes());
        var formatted = numeral(diff).format('0,0');
        return formatted;
    },

    sendMinutesLeft() {
        this.sendSocketNotification('RUN',
            {
                timeRemaing: this.getMinutesLeft()
            });
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === 'START') {
            this.sendMinutesLeft();
            var self = this;
            var j = schedule.scheduleJob('*/1 * * * *', function () {
                self.sendMinutesLeft();
            });

        }
    },

});
