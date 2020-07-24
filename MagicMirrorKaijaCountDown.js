Module.register('MagicMirrorKaijaCountDown', {
    // Default module config.
    start: function () {
        this.daysLeft = undefined;
        this.sendSocketNotification('START',
            { message: 'start connection' }
        );
    },

    defaults: {
        text: 'Days Left: '
    },

    // Override dom generator.
    getDom: function () {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = this.config.text + " " + this.daysLeft;
        return this.daysLeft === undefined ? "" : wrapper;
    },

    socketNotificationReceived: function (notification, payload) {
        switch (notification) {
            case "RUN":
                this.daysLeft = payload.timeRemaing;
                this.updateDom();
                break
        }
    },


});