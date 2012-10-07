/*global jQuery*/
/**
 * @author Sergey Tsapenko <4031651@gmail.com>
 *
 * Create GUI timer.
 * 
 * @param {int|string}   cmd    Time in seconds or a command. See List of commands.
 * @param {int|function} arg    See List of commands.
 * @param {function}     format This function call to format seconds. Accepts count of seconds as param. Should return a string.
 *
 * @return {mixed}
 */
/* List of commands:
 * |------------------------------------------------------------------------------------------------------------|
 * | Command |                 Example                   |                     Discription                      |
 * |------------------------------------------------------------------------------------------------------------|
 * | {int}:  | jQuery('#some_id').timer(5, function () { | Initial usage. Set timeout at 5 seconds.             |
 * |         |      alert('Time is up!');                | After 5 seconds alert was displayed.                 |
 * |         |  });                                      |                                                      |
 * |------------------------------------------------------------------------------------------------------------|
 * |  stop:  | jQuery('#some_id').timer('stop');         | Stop the timer.                                      |
 * |------------------------------------------------------------------------------------------------------------|
 * |  pause: | jQuery('#some_id').timer('pause');        | Pause the timer.                                     |
 * |------------------------------------------------------------------------------------------------------------|
 * |  resume:| jQuery('#some_id').timer('resume');       | Resume the timer.                                    |
 * |------------------------------------------------------------------------------------------------------------|
 * |  adjust:| jQuery('#some_id').timer('adjust', -10);  | Adjust the timer                                     |
 * |------------------------------------------------------------------------------------------------------------|
 * |  set:   | jQuery('#some_id').timer('set', 10);      | Set timer to given value                             |
 * |------------------------------------------------------------------------------------------------------------|
 * |  get:   | jQuery('#some_id').timer('get');          | Get number of remaining seconds. If selector returns |
 * |         |                                           | more than one element exception will be thrown.      |
 * |------------------------------------------------------------------------------------------------------------|
 * By default will be displayed count of seconds only. For example 182.
 * To define your own render use thrid argument in initial usage form.
 * Example:
 * function formatTimer(s) {
 *     var secs = '' + (s % 60);
 *     return parseInt(s / 60, 10) + ' : ' + (secs.length == 1 ? '0' + secs: secs);
 * }
 * function someHandler() {
 *     // do somethings
 * }
 * jQuery('#some_id').timer(1000, someHandler, formatTimer);
 * 
 */
jQuery.fn.timer = function (cmd, arg, format) {
    var fn = function () {
        return false;
    };
    if (typeof cmd == 'number') {
        var callback = arg;
        if (typeof format != 'function') {
            format = function (seconds) {
                return seconds;
            };
        }
        fn = function () {
            var self = this;
            if (self.timeout && self.timeout.timeoutID) {
                window.clearInterval(self.timeout.timeoutID);
            }
            self.timeout = {
                $:        jQuery(self),
                left:     cmd,
                format:   format,
                handler: function () {
                    self.timeout.left --;
                    if (self.timeout.left > 0) {
                        self.timeout.$.text(self.timeout.format(self.timeout.left));
                    } else {
                        window.clearInterval(self.timeout.timeoutID);
                        self.timeout.$.text(self.timeout.format(self.timeout.left));
                        if (typeof callback == 'function' && self.timeout.$.is(':visible')) {
                            callback.apply(self);
                        }
                        delete self.timeout;
                    }
                }
            };
            self.timeout.timeoutID = window.setInterval(self.timeout.handler, 1000);
            self.timeout.$.text(self.timeout.format(self.timeout.left));
        };
    } else {
        var command = cmd.toString().toLocaleLowerCase();
        switch (command) {
            case 'stop':
                fn = function () {
                    if (this.timeout) {
                        window.clearInterval(this.timeout.timeoutID);
                        delete this.timeout;
                    }
                };
                break;
            case 'pause':
                fn = function () {
                	if (!this.timeout) {
                		return;
                	}
                    if (this.timeout.timeoutID) {
                        window.clearInterval(this.timeout.timeoutID);
                    }
                    this.timeout.timeoutID = null;
                };
                break;
            case 'resume':
                fn = function () {
                	if (!this.timeout) {
                		return;
                	}
                    if (this.timeout.timeoutID) {
                        window.clearInterval(this.timeout.timeoutID);
                    }
                    this.timeout.timeoutID = window.setInterval(this.timeout.handler, 1000);
                };
                break;
            case 'adjust':
                var value = parseInt(arg, 10);
                if (isNaN(value)) {
                    return this;
                }
                fn = function () {
                	if (!this.timeout) {
                		return;
                	}
                    this.timeout.left += value;
                    this.timeout.$.text(this.timeout.format(this.timeout.left));
                };
                break;
            case 'set':
                var value = parseInt(arg, 10);
                if (isNaN(value)) {
                    return this;
                }
                fn = function () {
                	if (!this.timeout) {
                		return;
                	}
                    this.timeout.left = value;
                    this.timeout.$.text(this.timeout.format(this.timeout.left));
                };
                break;
            case 'get':
                if (this.length == 1) {
                    var elem = this.get(0);
	            	if (!elem.timeout) {
	            		return;
	            	}
                    if (elem.timeout && elem.timeout.left) {
                        return elem.timeout.left;
                    } else {
                        throw new Error("Element doesn't have timer.");
                    }
                } else if (this.length === 0) {
                    throw new Error("Given selector doesn't match any element.");
                } else {
                    throw new Error('Given selector return more than one element.');
                }
                break;
            default:
                return this;
                break;
        }
    }
    return this.each(fn);
};