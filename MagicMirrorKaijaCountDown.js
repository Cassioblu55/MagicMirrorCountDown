Module.register('MagicMirrorKaijaCountDown', {
    // Default module config.
    start: function () {
        this.minutesLeft = undefined;
        this.sendSocketNotification('START',
            { message: 'start connection' }
        );
    },

    defaults: {
        text: 'Minutes Left: '
    },

    // Override dom generator.
    getDom: function () {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = this.config.text + " " + this.minutesLeft;
        return this.minutesLeft === undefined ? "" : wrapper;
    },

    socketNotificationReceived: function (notification, payload) {
        switch (notification) {
            case "RUN":
                this.minutesLeft = payload.timeRemaing;
                this.updateDom();
                break
        }
    },


});