/**
* jQuery custom event "outerClick".
* @author David Brockman Smoliansky http://littleroom.se/
* @license GNU Lesser General Public License: http://creativecommons.org/licenses/LGPL/2.1/
* @version 1.0.1
* 2009/02/24
*/

/*global jQuery */
(function ($, elements, OUTER_CLICK, LENGTH) {

    /**
* Check if the event should be fired.
* @param {Object} event The click event.
* @private
*/
    function check(event) {
        for (var target = event.target, i = 0, l = elements[LENGTH], el; i < l; i++) {
            el = elements[i];
            if (el !== target && !(el.contains ? el.contains(target) : el.compareDocumentPosition ? el.compareDocumentPosition(target) & 16 : true)) {
                $.event.trigger(OUTER_CLICK, event, el);
            }
        }
    }


    $.event.special[OUTER_CLICK] = {

        setup: function () {
            if (!elements[LENGTH]) {
                // elements list is empty: attach the listener.
                $.event.add(document, 'click', check);
            }
            if ($.inArray(this, elements) < 0) {
                elements[elements[LENGTH]] = this;
            }
        },

        teardown: function () {
            for (var filtered = [], i = 0, j = 0, l = elements[LENGTH], el; i < l; i++) {
                el = elements[i];
                if (el !== this) {
                    filtered[j++] = el;
                }
            }
            elements[LENGTH] = 0;
            if (!elements.push.apply(elements, filtered)) {
                // elements list is empty: detach the listener.
                $.event.remove(document, 'click', check);
            }
        }

    };


    /**
* The outerClick event is fired when an element outside of the target element is clicked.
* Event helper outerClick: $.fn.outerClick
*
* @param {Function} [fn] A function to bind to the outerClick event on each of the matched elements.
* If fn is omitted the event is instead triggered.
* @return {jQuery} Returns the jQuery object.
*/
    $.fn[OUTER_CLICK] = function (fn) {
        return fn ? this.bind(OUTER_CLICK, fn) : this.trigger(OUTER_CLICK);
    };

})(jQuery, [], 'outerClick', 'length');