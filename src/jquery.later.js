/*!
 * jQuery Later Plugin 1.0
 *
 * Provides later() and periodic() functions for jQuery to execute methods at
 * a later time. This is no replacement for the animation queue but is useful
 * in some places.
 *
 * Copyright 2010, Matt Farina
 *
 * Compatible with jQuery 1.2.6 and newer.
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($, window) {

  /*
   * Executes a jQuery function at a later point in time.
   *
   * Arguments passed into .later() after the msec and method arguments are
   * passed into the method when it is executed. This is a wrapper around
   * setTimeout to be used in chaining with jQuery.
   *
   * @param int msec
   *   The number of milliseconds in the future to execute the function.
   * @param string|function method
   *   Either the name of a jQuery method (e.g., 'css' or 'attr') or a function
   *   to execute.
   *
   * Examples:
   * @code
   * jQuery('#foo').later(5000, 'css', 'background-color', '#333');
   * jQuery('#bar').later(1000, function(a, b) { this.css(a, b); return this; }, 'background-color', '#123');
   * @endcode
   *
   * Note: When a function is used as the second paramater it is executed as if
   * it were a method on a the jQuery object.
   *
   * @return jQuery
   *   Returns a jQuery object. This is meant to use in chaining.
   */
  $.fn.later = function(msec, method) {
    var that = this,
    args = Array.prototype.slice.apply(arguments, [2]);
    if (typeof method === 'string') {
      method = that[method];
    }
    window.setTimeout(function() {
      method.apply(that, args);
    }, msec);
    return this;
  }

  /*
   * Executes a jQuery function periodically at a later point in time.
   *
   * Arguments passed into .periodic() after the name, msec, and method
   * arguments are passed into the method when it is executed. This is a
   * wrapper around setInterval to be used with jQuery.
   *
   * @param string name
   *   A human readable name to associate with this. It is used when canceling
   *   or otherwise changing this periodic action.
   * @param int msec
   *   The number of milliseconds in the future to execute the function.
   * @param string|function method
   *   Either the name of a jQuery method (e.g., 'css' or 'attr') or a function
   *   to execute.
   *
   * Examples:
   * @code
   * jQuery('#foo').periodic('foo', 1000, 'css', 'background-color', '#333');
   * jQuery('#foo').periodic('bar', 1500, 'css', 'background-color', '#123');
   * @endcode
   *
   * Note: When a function is used as the second paramater it is executed as if
   * it were a method on a the jQuery object.
   *
   * @return jQuery
   *   Returns a jQuery object. This is meant to use in chaining.
   */
  $.fn.periodic = function(name, msec, method) {
    var that = this,
    args = Array.prototype.slice.apply(arguments, [3]),
    interval = null;
    if (typeof method === 'string') {
      method = that[method];
    }
    interval = window.setInterval(function () {
      method.apply(that, args);
    }, msec);
    this.data('jquery-periodic-' + name, interval);
    return this;
  }

  /*
   * Cancels a jQuery periodic function.
   *
   * @param string name
   *   The name of a jQuery periodic action to cancel. This is the name as set
   *   in jQuery.periodic().
   *
   * Examples:
   * @code
   * jQuery('#foo').periodicCancel('foo');
   * @endcode
   *
   * @return jQuery
   *   Returns a jQuery object. This is meant to use in chaining.
   */
  $.fn.periodicCancel = function(name) {
    var data = this.data('jquery-periodic-' + name);
    if (data) {
      window.clearInterval(data);
      this.removeData('jquery-periodic-' + name);
    }
    return this;
  }
})(jQuery, window);