function start() {
	jQuery('#timer').timer(20, function () {
		alert('Time is up!');
	});
}
function stop() {
	jQuery('#timer').timer('stop');
}
function pause() {
	jQuery('#timer').timer('pause');
}
function resume() {
	jQuery('#timer').timer('resume');
}
function adjust(x) {
	jQuery('#timer').timer('adjust', x);
}
function set() {
	jQuery('#timer').timer('set', 20);
}
function get() {
	jQuery('#value').text(jQuery('#timer').timer('get'));
}

function formated() {
	jQuery('#formated').timer(1000, function () {
		alert('Time is up!');
	}, function formatTimer(s) {
	    var secs = '' + (s % 60);
	    return parseInt(s / 60, 10) + ' : ' + (secs.length == 1 ? '0' + secs: secs);
	});
}
