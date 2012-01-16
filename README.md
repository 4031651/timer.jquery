jQuery timer plugin
===================

Create GUI timer.

###List of commands:
<table>
 <tr>
  <td>Command</td>
  <td>Example</td>
  <td>Discription</td>
 </tr>
 <tr>
  <td>{int}</td>
  <td><pre><code>
jQuery('#some_id').timer(5, function () {
    alert('Time is up!');
});
  </code></pre></td>
  <td>Initial usage. Set timeout at 5 seconds. After 5 seconds alert was displayed.</td>
 </tr>
 <tr>
  <td>stop</td>
  <td><pre><code>
jQuery('#some_id').timer('stop');
  </code></pre></td>
  <td>Stop the timer.</td>
 </tr>
 <tr>
  <td>pause</td>
  <td><pre><code>
jQuery('#some_id').timer('pause');
  </code></pre></td>
  <td>Pause the timer.</td>
 </tr>
 <tr>
  <td>resume</td>
  <td><pre><code>
jQuery('#some_id').timer('resume');
  </code></pre></td>
  <td>Resume the timer.</td>
 </tr>
 <tr>
  <td>adjust</td>
  <td><pre><code>
jQuery('#some_id').timer('adjust', -10);
  </code></pre></td>
  <td>Adjust the timer</td>
 </tr>
 <tr>
  <td>set</td>
  <td><pre><code>
jQuery('#some_id').timer('set', 10);
  </code></pre></td>
  <td>Set timer to given value</td>
 </tr>
 <tr>
  <td>get</td>
  <td><pre><code>
jQuery('#some_id').timer('get');
  </code></pre></td>
  <td>Get number of remaining seconds. If selector returns more than one element exception will be thrown.</td>
 </tr>
</table>
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