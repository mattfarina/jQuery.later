# jQuery Later - Chainable methods for later and periodic actions.

*Note: if you are using jQuery 1.4+ consider using the [delay](http://api.jquery.com/delay/) method. This was useful to me before 1.4.*

Sometimes you want to execute a jQuery method at some point in the future.
Typically we use setTimeout and setInterval to achieve these actions. Wouldn't
it be nice it these were chainable jQuery methods? That's what jQuery Later
does.

This is no substitution for the Queue in jQuery. This is for those times
when the Queue is not appropriate.

Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses:

Author: [Matt Farina](http://www.mattfarina.com)

## Examples:

Executing events at one later point in the future:

     jQuery('#foo').later(5000, 'css', 'background-color', '#333');
     jQuery('#bar').later(1000, function(a, b) { this.css(a, b); return this; }, 'background-color', '#123');

Executing events periodically in the future:

     jQuery('#foo').periodic('foo', 1000, 'css', 'background-color', '#333');
     jQuery('#foo').periodic('bar', 1500, 'css', 'background-color', '#123');

Canceling Periodic Events:

     jQuery('#foo').periodicCancel('foo');
