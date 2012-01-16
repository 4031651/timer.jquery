jQuery timer plugin
===================

Create GUI timer.

 List of commands:
 |------------------------------------------------------------------------------------------------------------|
 | Command |                 Example                   |                     Discription                      |
 |------------------------------------------------------------------------------------------------------------|
 | {int}:  | jQuery('#some_id').timer(5, function () { | Initial usage. Set timeout at 5 seconds.             |
 |         |      alert('Time is up!');                | After 5 seconds alert was displayed.                 |
 |         |  });                                      |                                                      |
 |------------------------------------------------------------------------------------------------------------|
 |  stop:  | jQuery('#some_id').timer('stop');         | Stop the timer.                                      |
 |------------------------------------------------------------------------------------------------------------|
 |  pause: | jQuery('#some_id').timer('pause');        | Pause the timer.                                     |
 |------------------------------------------------------------------------------------------------------------|
 |  resume:| jQuery('#some_id').timer('resume');       | Resume the timer.                                    |
 |------------------------------------------------------------------------------------------------------------|
 |  adjust:| jQuery('#some_id').timer('adjust', -10);  | Adjust the timer                                     |
 |------------------------------------------------------------------------------------------------------------|
 |  set:   | jQuery('#some_id').timer('set', 10);      | Set timer to given value                             |
 |------------------------------------------------------------------------------------------------------------|
 |  get:   | jQuery('#some_id').timer('get');          | Get number of remaining seconds. If selector returns |
 |         |                                           | more than one element exception will be thrown.      |
 |------------------------------------------------------------------------------------------------------------|
 By default will be displayed count of seconds only. For example 182.
 To define your own render use thrid argument in initial usage form.
 Example:
 function formatTimer(s) {
     var secs = '' + (s % 60);
     return parseInt(s / 60, 10) + ' : ' + (secs.length == 1 ? '0' + secs: secs);
 }
 function someHandler() {
     // do somethings
 }
 jQuery('#some_id').timer(1000, someHandler, formatTimer);
