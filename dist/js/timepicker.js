(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = "<div class=\"mtp-overlay\" style=\"display:none\"><div class=\"mtp-wrapper\"><div class=\"mtp-display\"> <span class=\"mtp-display__time\">12:00</span> <span class=\"mtp-display__meridiem\">am</span></div><div class=\"mtp-picker\"><div class=\"mtp-meridiem\"> <span class=\"mtp-meridiem__am mtp-meridiem--active\">am</span> <span class=\"mtp-meridiem__pm\">pm</span></div><div class=\"mtp-clock\"><div class=\"mtp-clock__center\"></div><div class=\"mtp-clock__hand\"></div><ul class=\"mtp-clock__time mtp-clock__outer mtp-clock__hours\" style=\"display:none\"><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li class=\"mtp-clock--active\">12</li><li>1</li><li>2</li></ul><ul class=\"mtp-clock__time mtp-clock__outer mtp-clock__minutes\" style=\"display:none\"><li>15</li><li>20</li><li>25</li><li>30</li><li>35</li><li>40</li><li>45</li><li>50</li><li>55</li><li class=\"mtp-clock--active\">0</li><li>5</li><li>10</li></ul><ul class=\"mtp-clock__time mtp-clock__hours-military\" style=\"display:none\"><div class=\"mtp-clock__inner\"><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li class=\"mtp-clock--active\">00</li><li>1</li><li>2</li></div><div class=\"mtp-clock__outer\"><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li>21</li><li>22</li><li>23</li><li>12</li><li>13</li><li>14</li></div></ul></div><div class=\"mtp-actions\"> <button type=\"button\" class=\"mtp-actions__button mtp-actions__cancel\">Cancel</button> <button type=\"button\" class=\"mtp-actions__button mtp-actions__back\" style=\"display:none\">Back</button> <button type=\"button\" class=\"mtp-actions__button mtp-actions__ok\">OK</button></div></div></div></div>";

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var _arguments = arguments;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _htmlTimepickerHtml = require('../html/timepicker.html');

var _htmlTimepickerHtml2 = _interopRequireDefault(_htmlTimepickerHtml);

var defaultOptions = {
    // `standard` or `military` display hours
    timeFormat: 'standard'
};

var TimePicker = (function () {

    /**
     * Initialize new TimePicker instance
     *
     * @return {TimePicker} New TimePicker instance
     */

    function TimePicker() {
        _classCallCheck(this, TimePicker);

        this.currentStep = 0;
        this.setupElements();

        return this;
    }

    // Object.assign polyfill so `babel/polyfill` is not required

    /**
     * Add template to DOM if no already, and cache elements use by picker
     *
     * @return {void}
     */

    _createClass(TimePicker, [{
        key: 'setupElements',
        value: function setupElements() {
            var mtpExists = Boolean(document.getElementsByClassName('mtp-overlay')[0]);

            if (!mtpExists) {
                document.body.insertAdjacentHTML('beforeend', _htmlTimepickerHtml2['default']);
            }

            this.overlayEl = document.getElementsByClassName('mtp-overlay')[0];
            this.wrapperEl = this.overlayEl.getElementsByClassName('mtp-wrapper')[0];
            this.pickerEl = this.wrapperEl.getElementsByClassName('mtp-picker')[0];
            this.meridiemEl = this.wrapperEl.getElementsByClassName('mtp-meridiem')[0];
            this.displayEls = {
                time: this.wrapperEl.getElementsByClassName('mtp-display__time')[0],
                meridiem: this.wrapperEl.getElementsByClassName('mtp-display__meridiem')[0]
            };
            this.buttonEls = {
                cancel: this.pickerEl.getElementsByClassName('mtp-actions__cancel')[0],
                back: this.pickerEl.getElementsByClassName('mtp-actions__back')[0],
                ok: this.pickerEl.getElementsByClassName('mtp-actions__ok')[0]
            };
            this.clockEls = {
                hours: this.pickerEl.getElementsByClassName('mtp-clock__hours')[0],
                minutes: this.pickerEl.getElementsByClassName('mtp-clock__minutes')[0],
                militaryHours: this.pickerEl.getElementsByClassName('mtp-clock__hours-military')[0],
                hand: this.pickerEl.getElementsByClassName('mtp-clock__hand')[0]
            };
            this.timeEls = {
                hours: this.clockEls.hours.getElementsByTagName('li'),
                minutes: this.clockEls.minutes.getElementsByTagName('li'),
                militaryHours: this.clockEls.militaryHours.getElementsByTagName('li')
            };

            if (!this.hasSetEvents()) {
                this.setEvents();
                this.wrapperEl.classList.add('mtp-events-set');
            }
        }

        /**
         * Add input element to picker object
         *
         * @param {string|HTMLElement} inputEl Selector element to be queried or existing HTMLElement
         * @param {object} options Options to merged with defaults and set to input element object
         * @return {void}
         */
    }, {
        key: 'addInput',
        value: function addInput(inputEl) {
            var _this = this;

            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var element = inputEl instanceof HTMLElement ? inputEl : document.querySelector(inputEl);

            element.mtpOptions = Object.assign({}, defaultOptions, options);
            element.addEventListener('focus', function (event) {
                return _this.showEvent(event);
            });
        }

        /**
         * Set the events on picker elements
         *
         * @return {void}
         */
    }, {
        key: 'setEvents',
        value: function setEvents() {
            var _this2 = this;

            // close
            this.overlayEl.addEventListener('click', function (event) {
                return _this2.hideEvent(event);
            });
            this.buttonEls.cancel.addEventListener('click', function (event) {
                return _this2.hideEvent(event);
            });

            // next/prev step actions
            this.buttonEls.ok.addEventListener('click', function () {
                return _this2.changeStep(_this2.currentStep + 1);
            });
            this.buttonEls.back.addEventListener('click', function () {
                return _this2.changeStep(0);
            });

            // time select events
            [].forEach.call(this.timeEls.hours, function (hour) {
                hour.addEventListener('click', function (event) {
                    _this2.selectEvent(event, _this2.clockEls.hours, _this2.timeEls.hours, 0);
                });
            });
            [].forEach.call(this.timeEls.minutes, function (minute) {
                minute.addEventListener('click', function (event) {
                    _this2.selectEvent(event, _this2.clockEls.minutes, _this2.timeEls.minutes, 1);
                });
            });
            [].forEach.call(this.timeEls.militaryHours, function (hour) {
                hour.addEventListener('click', function (event) {
                    _this2.selectEvent(event, _this2.clockEls.militaryHours, _this2.timeEls.militaryHours, 0);
                });
            });
        }

        /**
         * Show the picker in the DOM
         *
         * @return {void}
         */
    }, {
        key: 'show',
        value: function show() {
            var isMilitaryFormat = this.isMilitaryFormat();

            // blur input to prevent onscreen keyboard from displaying
            this.inputEl.blur();
            this.toggleHoursVisible(true);
            this.toggleMinutesVisible();
            this.setDisplayTime(this.isMilitaryFormat() ? '00' : '12', 0);
            this.setDisplayTime('0', 1);

            this.displayEls.meridiem.style.display = isMilitaryFormat ? 'none' : 'inline';
            this.meridiemEl.style.display = isMilitaryFormat ? 'none' : 'block';
            this.overlayEl.style.display = 'block';
        }

        /**
         * Event handle for input focus
         *
         * @param {Event} event Event object passed from listener
         * @return {void}
         */
    }, {
        key: 'showEvent',
        value: function showEvent(event) {
            this.inputEl = event.target;
            this.show();
        }

        /**
         * Hide the picker in the DOM
         *
         * @return {void}
         */
    }, {
        key: 'hide',
        value: function hide() {
            this.overlayEl.style.display = 'none';
            this.inputEl.dispatchEvent(new Event('blur'));
            this.resetState();
        }

        /**
         * Hide the picker element on the page
         *
         * @param {Event} event Event object passed from event listener callback
         * @return {void}
         */
    }, {
        key: 'hideEvent',
        value: function hideEvent(event) {
            var _this3 = this;

            event.stopPropagation();

            // only allow event based close if event.target contains one of these classes
            // hack to prevent overlay close event from triggering on all elements
            var allowedClasses = ['mtp-overlay', 'mtp-actions__cancel'];
            var classList = event.target.classList;

            allowedClasses.some(function (allowedClass) {
                if (classList.contains(allowedClass)) {
                    _this3.hide();
                    return true;
                }
            });
        }

        /**
         * Reset picker state to defaults
         *
         * @return {void}
         */
    }, {
        key: 'resetState',
        value: function resetState() {
            this.currentStep = 0;

            this.toggleHoursVisible(true);
            this.toggleMinutesVisible();
            this.timeEls.hours[9].click();
            this.timeEls.minutes[9].click();
            this.timeEls.militaryHours[9].click();
        }

        /**
         * Set the displayed time, which will be used to fill input value on completetion
         *
         * @param {string} value Newly selected time value
         * @param {integer} index Index of value to replace [0 = hours, 1 = minutes]
         * @return {void}
         */
    }, {
        key: 'setDisplayTime',
        value: function setDisplayTime(value, index) {
            var time = this.displayEls.time.innerHTML.split(':');

            // prepend with zero if selecting minutes and value is single digit
            time[index] = index === 1 && value < 10 ? '0' + value : value;
            var newTime = time.join(':');

            this.displayEls.time.innerHTML = newTime;
        }

        /**
         * Rotate the hand element to selected time. Rotation is done in increments of 30deg.
         *
         * @param {integer} nodeIndex Index inside parentNode of the selected time
         * @return {void}
         */
    }, {
        key: 'rotateHand',
        value: function rotateHand() {
            var nodeIndex = arguments.length <= 0 || arguments[0] === undefined ? 9 : arguments[0];

            // nodeIndex 0 is 3 elements behind 0deg so subtract 90 from the sum
            var rotateDeg = nodeIndex * 30 - 90;
            var styleVal = 'rotate(' + rotateDeg + 'deg)';

            this.clockEls.hand.style.transform = styleVal;
            this.clockEls.hand.style['-webkit-transform'] = styleVal;
            this.clockEls.hand.style['-ms-transform'] = styleVal;
        }

        /**
         * Change to the specified step
         *
         * @param {integer} step Index of step to change to
         * @return {void}
         */
    }, {
        key: 'changeStep',
        value: function changeStep(step) {
            var _this4 = this;

            var hourEls = this.isMilitaryFormat() ? this.timeEls.militaryHours : this.timeEls.hours;
            var minuteEls = this.timeEls.minutes;
            var changeStepAction = [function () {
                _this4.toggleHoursVisible(true);
                _this4.toggleMinutesVisible();
                _this4.rotateHand(_this4.getActiveIndex(hourEls));
            }, function () {
                _this4.toggleHoursVisible();
                _this4.toggleMinutesVisible(true);
                _this4.rotateHand(_this4.getActiveIndex(minuteEls));
            }, function () {
                _this4.timeSelected();
                _this4.hide();
            }][step];

            this.currentStep = step;
            changeStepAction();
        }

        /**
         * Toggle hour (both military and standard) clock visiblity in DOM
         *
         * @param {boolean} isVisible Is clock face toggled visible or hidden
         * @return {void}
         */
    }, {
        key: 'toggleHoursVisible',
        value: function toggleHoursVisible() {
            var isVisible = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            var isMilitaryFormat = this.isMilitaryFormat();

            this.clockEls.hours.style.display = isVisible && !isMilitaryFormat ? 'block' : 'none';
            this.clockEls.militaryHours.style.display = isVisible && isMilitaryFormat ? 'block' : 'none';
        }

        /**
         * Toggle minute clock visiblity in DOM
         *
         * @param {boolean} isVisible Is clock face toggled visible or hidden
         * @return {void}
         */
    }, {
        key: 'toggleMinutesVisible',
        value: function toggleMinutesVisible() {
            var isVisible = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            this.clockEls.minutes.style.display = isVisible ? 'block' : 'none';
            this.buttonEls.back.style.display = isVisible ? 'inline-block' : 'none';
        }

        /**
         * Get the active time element index
         *
         * @param {HTMLCollection} timeEls Collection of time elements to find active in
         * @return {integer} Active element index
         */
    }, {
        key: 'getActiveIndex',
        value: function getActiveIndex(timeEls) {
            var activeIndex = 0;

            [].some.call(timeEls, function (timeEl, index) {
                if (timeEl.classList.contains('mtp-clock--active')) {
                    activeIndex = index;
                    return true;
                }
            });

            return activeIndex > 11 ? activeIndex - 12 : activeIndex;
        }

        /**
         * Set selected time to input element
         *
         * @return {void}
         */
    }, {
        key: 'timeSelected',
        value: function timeSelected() {
            var time = this.displayEls.time.innerHTML;
            var meridiem = this.isMilitaryFormat() ? '' : this.displayEls.meridiem.innerHTML;

            this.inputEl.value = time + ' ' + meridiem;
            this.inputEl.dispatchEvent(new Event('input'));
        }

        /**
         * Set active clock face element
         *
         * @param {Element} containerEl New active elements .parentNode
         * @param {Element} activeEl Element to set active
         * @return {void}
         */
    }, {
        key: 'setActive',
        value: function setActive(containerEl, activeEl) {
            var activeClassName = 'mtp-clock--active';
            var currentActive = containerEl.getElementsByClassName(activeClassName)[0];

            currentActive.classList.remove(activeClassName);
            activeEl.classList.add(activeClassName);
        }

        /**
         * Time select event handler
         *
         * @param {Event} event Event object passed from listener
         * @param {HTMLElement} containerEl Element containing time list elements
         * @param {HTMLCollection} listEls Collection of list elements
         * @param {integer} displayIndex Index at which selected time should display [1: hours, 2: minutes]
         * @return {void}
         */
    }, {
        key: 'selectEvent',
        value: function selectEvent(event, containerEl, listEls, displayIndex) {
            event.stopPropagation();

            var newActive = event.target;

            this.setActive(containerEl, newActive);
            this.setDisplayTime(newActive.innerHTML, displayIndex);
            this.rotateHand(this.getActiveIndex(listEls));
        }

        /**
         * Check if picker set to military time mode
         *
         * @return {boolean} Is in military time mode
         */
    }, {
        key: 'isMilitaryFormat',
        value: function isMilitaryFormat() {
            return Boolean(this.inputEl.mtpOptions.timeFormat === 'military');
        }

        /**
         * Check if picker object has already set events on picker elements
         *
         * @return {boolean} Has events been set on picker elements
         */
    }, {
        key: 'hasSetEvents',
        value: function hasSetEvents() {
            return this.wrapperEl.classList.contains('mtp-events-set');
        }
    }]);

    return TimePicker;
})();

if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function value(target) {
            var to = Object(target);

            if (target === 'undefined' || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            for (var inc = 1; inc < _arguments.length; inc += 1) {
                var nextSource = _arguments[inc];

                if (nextSource === 'undefined' || nextSource === null) {
                    continue;
                }

                nextSource = Object(nextSource);
                var keysArray = Object.keys(nextSource);

                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

                    if (desc !== 'undefined' && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }

            return to;
        }
    });
}

window.TimePicker = new TimePicker();
exports['default'] = new TimePicker();
module.exports = exports['default'];

},{"../html/timepicker.html":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaHRtbC90aW1lcGlja2VyLmh0bWwiLCIvdmFyL3d3dy9qcy1tb2R1bGVzL3RpbWVwaWNrZXIvc3JjL2pzL3RpbWVwaWNrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7a0NDRHFCLHlCQUF5Qjs7OztBQUU5QyxJQUFNLGNBQWMsR0FBRzs7QUFFbkIsY0FBVSxFQUFFLFVBQVU7Q0FDekIsQ0FBQzs7SUFFSSxVQUFVOzs7Ozs7OztBQU9ELGFBUFQsVUFBVSxHQU9FOzhCQVBaLFVBQVU7O0FBUVIsWUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDckIsWUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztBQUVyQixlQUFPLElBQUksQ0FBQztLQUNmOzs7Ozs7Ozs7O2lCQVpDLFVBQVU7O2VBbUJDLHlCQUFHO0FBQ1osZ0JBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFN0UsZ0JBQUksQ0FBQyxTQUFTLEVBQUU7QUFDWix3QkFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLGtDQUFXLENBQUM7YUFDM0Q7O0FBRUQsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25FLGdCQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekUsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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RUFBRSxHQUFHLEdBQUcsV0FBVSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRTtBQUNoRCxvQkFBSSxVQUFVLEdBQUcsV0FBVSxHQUFHLENBQUMsQ0FBQzs7QUFFaEMsb0JBQUksVUFBVSxLQUFLLFdBQVcsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO0FBQ25ELDZCQUFTO2lCQUNaOztBQUVELDBCQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2hDLG9CQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUUxQyxxQkFBSyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxHQUFHLEdBQUcsRUFBRSxTQUFTLElBQUksQ0FBQyxFQUFFO0FBQzdFLHdCQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckMsd0JBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRWxFLHdCQUFJLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUN6QywwQkFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDckM7aUJBQ0o7YUFDSjs7QUFFRCxtQkFBTyxFQUFFLENBQUM7U0FDYjtLQUNKLENBQUMsQ0FBQztDQUNOOztBQUVELE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztxQkFDdEIsSUFBSSxVQUFVLEVBQUUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcIm10cC1vdmVybGF5XFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lXFxcIj48ZGl2IGNsYXNzPVxcXCJtdHAtd3JhcHBlclxcXCI+PGRpdiBjbGFzcz1cXFwibXRwLWRpc3BsYXlcXFwiPiA8c3BhbiBjbGFzcz1cXFwibXRwLWRpc3BsYXlfX3RpbWVcXFwiPjEyOjAwPC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwibXRwLWRpc3BsYXlfX21lcmlkaWVtXFxcIj5hbTwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtdHAtcGlja2VyXFxcIj48ZGl2IGNsYXNzPVxcXCJtdHAtbWVyaWRpZW1cXFwiPiA8c3BhbiBjbGFzcz1cXFwibXRwLW1lcmlkaWVtX19hbSBtdHAtbWVyaWRpZW0tLWFjdGl2ZVxcXCI+YW08L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJtdHAtbWVyaWRpZW1fX3BtXFxcIj5wbTwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtdHAtY2xvY2tcXFwiPjxkaXYgY2xhc3M9XFxcIm10cC1jbG9ja19fY2VudGVyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtdHAtY2xvY2tfX2hhbmRcXFwiPjwvZGl2Pjx1bCBjbGFzcz1cXFwibXRwLWNsb2NrX190aW1lIG10cC1jbG9ja19fb3V0ZXIgbXRwLWNsb2NrX19ob3Vyc1xcXCIgc3R5bGU9XFxcImRpc3BsYXk6bm9uZVxcXCI+PGxpPjM8L2xpPjxsaT40PC9saT48bGk+NTwvbGk+PGxpPjY8L2xpPjxsaT43PC9saT48bGk+ODwvbGk+PGxpPjk8L2xpPjxsaT4xMDwvbGk+PGxpPjExPC9saT48bGkgY2xhc3M9XFxcIm10cC1jbG9jay0tYWN0aXZlXFxcIj4xMjwvbGk+PGxpPjE8L2xpPjxsaT4yPC9saT48L3VsPjx1bCBjbGFzcz1cXFwibXRwLWNsb2NrX190aW1lIG10cC1jbG9ja19fb3V0ZXIgbXRwLWNsb2NrX19taW51dGVzXFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lXFxcIj48bGk+MTU8L2xpPjxsaT4yMDwvbGk+PGxpPjI1PC9saT48bGk+MzA8L2xpPjxsaT4zNTwvbGk+PGxpPjQwPC9saT48bGk+NDU8L2xpPjxsaT41MDwvbGk+PGxpPjU1PC9saT48bGkgY2xhc3M9XFxcIm10cC1jbG9jay0tYWN0aXZlXFxcIj4wPC9saT48bGk+NTwvbGk+PGxpPjEwPC9saT48L3VsPjx1bCBjbGFzcz1cXFwibXRwLWNsb2NrX190aW1lIG10cC1jbG9ja19faG91cnMtbWlsaXRhcnlcXFwiIHN0eWxlPVxcXCJkaXNwbGF5Om5vbmVcXFwiPjxkaXYgY2xhc3M9XFxcIm10cC1jbG9ja19faW5uZXJcXFwiPjxsaT4zPC9saT48bGk+NDwvbGk+PGxpPjU8L2xpPjxsaT42PC9saT48bGk+NzwvbGk+PGxpPjg8L2xpPjxsaT45PC9saT48bGk+MTA8L2xpPjxsaT4xMTwvbGk+PGxpIGNsYXNzPVxcXCJtdHAtY2xvY2stLWFjdGl2ZVxcXCI+MDA8L2xpPjxsaT4xPC9saT48bGk+MjwvbGk+PC9kaXY+PGRpdiBjbGFzcz1cXFwibXRwLWNsb2NrX19vdXRlclxcXCI+PGxpPjE1PC9saT48bGk+MTY8L2xpPjxsaT4xNzwvbGk+PGxpPjE4PC9saT48bGk+MTk8L2xpPjxsaT4yMDwvbGk+PGxpPjIxPC9saT48bGk+MjI8L2xpPjxsaT4yMzwvbGk+PGxpPjEyPC9saT48bGk+MTM8L2xpPjxsaT4xNDwvbGk+PC9kaXY+PC91bD48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtdHAtYWN0aW9uc1xcXCI+IDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwibXRwLWFjdGlvbnNfX2J1dHRvbiBtdHAtYWN0aW9uc19fY2FuY2VsXFxcIj5DYW5jZWw8L2J1dHRvbj4gPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJtdHAtYWN0aW9uc19fYnV0dG9uIG10cC1hY3Rpb25zX19iYWNrXFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lXFxcIj5CYWNrPC9idXR0b24+IDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwibXRwLWFjdGlvbnNfX2J1dHRvbiBtdHAtYWN0aW9uc19fb2tcXFwiPk9LPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCI7XG4iLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vaHRtbC90aW1lcGlja2VyLmh0bWwnO1xuXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAvLyBgc3RhbmRhcmRgIG9yIGBtaWxpdGFyeWAgZGlzcGxheSBob3Vyc1xuICAgIHRpbWVGb3JtYXQ6ICdzdGFuZGFyZCcsXG59O1xuXG5jbGFzcyBUaW1lUGlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgbmV3IFRpbWVQaWNrZXIgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1RpbWVQaWNrZXJ9IE5ldyBUaW1lUGlja2VyIGluc3RhbmNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0ZXAgPSAwO1xuICAgICAgICB0aGlzLnNldHVwRWxlbWVudHMoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdGVtcGxhdGUgdG8gRE9NIGlmIG5vIGFscmVhZHksIGFuZCBjYWNoZSBlbGVtZW50cyB1c2UgYnkgcGlja2VyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNldHVwRWxlbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IG10cEV4aXN0cyA9IEJvb2xlYW4oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLW92ZXJsYXknKVswXSk7XG5cbiAgICAgICAgaWYgKCFtdHBFeGlzdHMpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZW1wbGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm92ZXJsYXlFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1vdmVybGF5JylbMF07XG4gICAgICAgIHRoaXMud3JhcHBlckVsID0gdGhpcy5vdmVybGF5RWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLXdyYXBwZXInKVswXTtcbiAgICAgICAgdGhpcy5waWNrZXJFbCA9IHRoaXMud3JhcHBlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1waWNrZXInKVswXTtcbiAgICAgICAgdGhpcy5tZXJpZGllbUVsID0gdGhpcy53cmFwcGVyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLW1lcmlkaWVtJylbMF07XG4gICAgICAgIHRoaXMuZGlzcGxheUVscyA9IHtcbiAgICAgICAgICAgIHRpbWU6IHRoaXMud3JhcHBlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1kaXNwbGF5X190aW1lJylbMF0sXG4gICAgICAgICAgICBtZXJpZGllbTogdGhpcy53cmFwcGVyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLWRpc3BsYXlfX21lcmlkaWVtJylbMF0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYnV0dG9uRWxzID0ge1xuICAgICAgICAgICAgY2FuY2VsOiB0aGlzLnBpY2tlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1hY3Rpb25zX19jYW5jZWwnKVswXSxcbiAgICAgICAgICAgIGJhY2s6IHRoaXMucGlja2VyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLWFjdGlvbnNfX2JhY2snKVswXSxcbiAgICAgICAgICAgIG9rOiB0aGlzLnBpY2tlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1hY3Rpb25zX19vaycpWzBdLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNsb2NrRWxzID0ge1xuICAgICAgICAgICAgaG91cnM6IHRoaXMucGlja2VyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLWNsb2NrX19ob3VycycpWzBdLFxuICAgICAgICAgICAgbWludXRlczogdGhpcy5waWNrZXJFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtY2xvY2tfX21pbnV0ZXMnKVswXSxcbiAgICAgICAgICAgIG1pbGl0YXJ5SG91cnM6IHRoaXMucGlja2VyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLWNsb2NrX19ob3Vycy1taWxpdGFyeScpWzBdLFxuICAgICAgICAgICAgaGFuZDogdGhpcy5waWNrZXJFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtY2xvY2tfX2hhbmQnKVswXSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50aW1lRWxzID0ge1xuICAgICAgICAgICAgaG91cnM6IHRoaXMuY2xvY2tFbHMuaG91cnMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyksXG4gICAgICAgICAgICBtaW51dGVzOiB0aGlzLmNsb2NrRWxzLm1pbnV0ZXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyksXG4gICAgICAgICAgICBtaWxpdGFyeUhvdXJzOiB0aGlzLmNsb2NrRWxzLm1pbGl0YXJ5SG91cnMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCF0aGlzLmhhc1NldEV2ZW50cygpKSB7XG4gICAgICAgICAgICB0aGlzLnNldEV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVyRWwuY2xhc3NMaXN0LmFkZCgnbXRwLWV2ZW50cy1zZXQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBpbnB1dCBlbGVtZW50IHRvIHBpY2tlciBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fSBpbnB1dEVsIFNlbGVjdG9yIGVsZW1lbnQgdG8gYmUgcXVlcmllZCBvciBleGlzdGluZyBIVE1MRWxlbWVudFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9wdGlvbnMgdG8gbWVyZ2VkIHdpdGggZGVmYXVsdHMgYW5kIHNldCB0byBpbnB1dCBlbGVtZW50IG9iamVjdFxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgYWRkSW5wdXQoaW5wdXRFbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBpbnB1dEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBpbnB1dEVsIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpbnB1dEVsKTtcblxuICAgICAgICBlbGVtZW50Lm10cE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBldmVudCA9PiB0aGlzLnNob3dFdmVudChldmVudCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZXZlbnRzIG9uIHBpY2tlciBlbGVtZW50c1xuICAgICAqXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZXRFdmVudHMoKSB7XG4gICAgICAgIC8vIGNsb3NlXG4gICAgICAgIHRoaXMub3ZlcmxheUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGhpcy5oaWRlRXZlbnQoZXZlbnQpKTtcbiAgICAgICAgdGhpcy5idXR0b25FbHMuY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGhpcy5oaWRlRXZlbnQoZXZlbnQpKTtcblxuICAgICAgICAvLyBuZXh0L3ByZXYgc3RlcCBhY3Rpb25zXG4gICAgICAgIHRoaXMuYnV0dG9uRWxzLm9rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jaGFuZ2VTdGVwKHRoaXMuY3VycmVudFN0ZXAgKyAxKSk7XG4gICAgICAgIHRoaXMuYnV0dG9uRWxzLmJhY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmNoYW5nZVN0ZXAoMCkpO1xuXG4gICAgICAgIC8vIHRpbWUgc2VsZWN0IGV2ZW50c1xuICAgICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy50aW1lRWxzLmhvdXJzLCBob3VyID0+IHtcbiAgICAgICAgICAgIGhvdXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RFdmVudChldmVudCwgdGhpcy5jbG9ja0Vscy5ob3VycywgdGhpcy50aW1lRWxzLmhvdXJzLCAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMudGltZUVscy5taW51dGVzLCBtaW51dGUgPT4ge1xuICAgICAgICAgICAgbWludXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RXZlbnQoZXZlbnQsIHRoaXMuY2xvY2tFbHMubWludXRlcywgdGhpcy50aW1lRWxzLm1pbnV0ZXMsIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy50aW1lRWxzLm1pbGl0YXJ5SG91cnMsIGhvdXIgPT4ge1xuICAgICAgICAgICAgaG91ci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEV2ZW50KGV2ZW50LCB0aGlzLmNsb2NrRWxzLm1pbGl0YXJ5SG91cnMsIHRoaXMudGltZUVscy5taWxpdGFyeUhvdXJzLCAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSBwaWNrZXIgaW4gdGhlIERPTVxuICAgICAqXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzaG93KCkge1xuICAgICAgICBjb25zdCBpc01pbGl0YXJ5Rm9ybWF0ID0gdGhpcy5pc01pbGl0YXJ5Rm9ybWF0KCk7XG5cbiAgICAgICAgLy8gYmx1ciBpbnB1dCB0byBwcmV2ZW50IG9uc2NyZWVuIGtleWJvYXJkIGZyb20gZGlzcGxheWluZ1xuICAgICAgICB0aGlzLmlucHV0RWwuYmx1cigpO1xuICAgICAgICB0aGlzLnRvZ2dsZUhvdXJzVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgdGhpcy50b2dnbGVNaW51dGVzVmlzaWJsZSgpO1xuICAgICAgICB0aGlzLnNldERpc3BsYXlUaW1lKHRoaXMuaXNNaWxpdGFyeUZvcm1hdCgpID8gJzAwJyA6ICcxMicsIDApO1xuICAgICAgICB0aGlzLnNldERpc3BsYXlUaW1lKCcwJywgMSk7XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5RWxzLm1lcmlkaWVtLnN0eWxlLmRpc3BsYXkgPSBpc01pbGl0YXJ5Rm9ybWF0ID8gJ25vbmUnIDogJ2lubGluZSc7XG4gICAgICAgIHRoaXMubWVyaWRpZW1FbC5zdHlsZS5kaXNwbGF5ID0gaXNNaWxpdGFyeUZvcm1hdCA/ICdub25lJyA6ICdibG9jayc7XG4gICAgICAgIHRoaXMub3ZlcmxheUVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZSBmb3IgaW5wdXQgZm9jdXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IEV2ZW50IG9iamVjdCBwYXNzZWQgZnJvbSBsaXN0ZW5lclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2hvd0V2ZW50KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaW5wdXRFbCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSB0aGUgcGlja2VyIGluIHRoZSBET01cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5RWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy5pbnB1dEVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdibHVyJykpO1xuICAgICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIHRoZSBwaWNrZXIgZWxlbWVudCBvbiB0aGUgcGFnZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgRXZlbnQgb2JqZWN0IHBhc3NlZCBmcm9tIGV2ZW50IGxpc3RlbmVyIGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBoaWRlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gb25seSBhbGxvdyBldmVudCBiYXNlZCBjbG9zZSBpZiBldmVudC50YXJnZXQgY29udGFpbnMgb25lIG9mIHRoZXNlIGNsYXNzZXNcbiAgICAgICAgLy8gaGFjayB0byBwcmV2ZW50IG92ZXJsYXkgY2xvc2UgZXZlbnQgZnJvbSB0cmlnZ2VyaW5nIG9uIGFsbCBlbGVtZW50c1xuICAgICAgICBjb25zdCBhbGxvd2VkQ2xhc3NlcyA9IFsnbXRwLW92ZXJsYXknLCAnbXRwLWFjdGlvbnNfX2NhbmNlbCddO1xuICAgICAgICBjb25zdCBjbGFzc0xpc3QgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0O1xuXG4gICAgICAgIGFsbG93ZWRDbGFzc2VzLnNvbWUoYWxsb3dlZENsYXNzID0+IHtcbiAgICAgICAgICAgIGlmIChjbGFzc0xpc3QuY29udGFpbnMoYWxsb3dlZENsYXNzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldCBwaWNrZXIgc3RhdGUgdG8gZGVmYXVsdHNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgcmVzZXRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RlcCA9IDA7XG5cbiAgICAgICAgdGhpcy50b2dnbGVIb3Vyc1Zpc2libGUodHJ1ZSk7XG4gICAgICAgIHRoaXMudG9nZ2xlTWludXRlc1Zpc2libGUoKTtcbiAgICAgICAgdGhpcy50aW1lRWxzLmhvdXJzWzldLmNsaWNrKCk7XG4gICAgICAgIHRoaXMudGltZUVscy5taW51dGVzWzldLmNsaWNrKCk7XG4gICAgICAgIHRoaXMudGltZUVscy5taWxpdGFyeUhvdXJzWzldLmNsaWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBkaXNwbGF5ZWQgdGltZSwgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGZpbGwgaW5wdXQgdmFsdWUgb24gY29tcGxldGV0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgTmV3bHkgc2VsZWN0ZWQgdGltZSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXggSW5kZXggb2YgdmFsdWUgdG8gcmVwbGFjZSBbMCA9IGhvdXJzLCAxID0gbWludXRlc11cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNldERpc3BsYXlUaW1lKHZhbHVlLCBpbmRleCkge1xuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5kaXNwbGF5RWxzLnRpbWUuaW5uZXJIVE1MLnNwbGl0KCc6Jyk7XG5cbiAgICAgICAgLy8gcHJlcGVuZCB3aXRoIHplcm8gaWYgc2VsZWN0aW5nIG1pbnV0ZXMgYW5kIHZhbHVlIGlzIHNpbmdsZSBkaWdpdFxuICAgICAgICB0aW1lW2luZGV4XSA9IGluZGV4ID09PSAxICYmIHZhbHVlIDwgMTAgPyBgMCR7dmFsdWV9YCA6IHZhbHVlO1xuICAgICAgICBjb25zdCBuZXdUaW1lID0gdGltZS5qb2luKCc6Jyk7XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5RWxzLnRpbWUuaW5uZXJIVE1MID0gbmV3VGltZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSb3RhdGUgdGhlIGhhbmQgZWxlbWVudCB0byBzZWxlY3RlZCB0aW1lLiBSb3RhdGlvbiBpcyBkb25lIGluIGluY3JlbWVudHMgb2YgMzBkZWcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG5vZGVJbmRleCBJbmRleCBpbnNpZGUgcGFyZW50Tm9kZSBvZiB0aGUgc2VsZWN0ZWQgdGltZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgcm90YXRlSGFuZChub2RlSW5kZXggPSA5KSB7XG4gICAgICAgIC8vIG5vZGVJbmRleCAwIGlzIDMgZWxlbWVudHMgYmVoaW5kIDBkZWcgc28gc3VidHJhY3QgOTAgZnJvbSB0aGUgc3VtXG4gICAgICAgIGNvbnN0IHJvdGF0ZURlZyA9IG5vZGVJbmRleCAqIDMwIC0gOTA7XG4gICAgICAgIGNvbnN0IHN0eWxlVmFsID0gYHJvdGF0ZSgke3JvdGF0ZURlZ31kZWcpYDtcblxuICAgICAgICB0aGlzLmNsb2NrRWxzLmhhbmQuc3R5bGUudHJhbnNmb3JtID0gc3R5bGVWYWw7XG4gICAgICAgIHRoaXMuY2xvY2tFbHMuaGFuZC5zdHlsZVsnLXdlYmtpdC10cmFuc2Zvcm0nXSA9IHN0eWxlVmFsO1xuICAgICAgICB0aGlzLmNsb2NrRWxzLmhhbmQuc3R5bGVbJy1tcy10cmFuc2Zvcm0nXSA9IHN0eWxlVmFsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoYW5nZSB0byB0aGUgc3BlY2lmaWVkIHN0ZXBcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gc3RlcCBJbmRleCBvZiBzdGVwIHRvIGNoYW5nZSB0b1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgY2hhbmdlU3RlcChzdGVwKSB7XG4gICAgICAgIGNvbnN0IGhvdXJFbHMgPSB0aGlzLmlzTWlsaXRhcnlGb3JtYXQoKSA/IHRoaXMudGltZUVscy5taWxpdGFyeUhvdXJzIDogdGhpcy50aW1lRWxzLmhvdXJzO1xuICAgICAgICBjb25zdCBtaW51dGVFbHMgPSB0aGlzLnRpbWVFbHMubWludXRlcztcbiAgICAgICAgY29uc3QgY2hhbmdlU3RlcEFjdGlvbiA9IFtcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUhvdXJzVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZU1pbnV0ZXNWaXNpYmxlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGVIYW5kKHRoaXMuZ2V0QWN0aXZlSW5kZXgoaG91ckVscykpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUhvdXJzVmlzaWJsZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlTWludXRlc1Zpc2libGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGVIYW5kKHRoaXMuZ2V0QWN0aXZlSW5kZXgobWludXRlRWxzKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZVNlbGVjdGVkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICBdW3N0ZXBdO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFN0ZXAgPSBzdGVwO1xuICAgICAgICBjaGFuZ2VTdGVwQWN0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIGhvdXIgKGJvdGggbWlsaXRhcnkgYW5kIHN0YW5kYXJkKSBjbG9jayB2aXNpYmxpdHkgaW4gRE9NXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzVmlzaWJsZSBJcyBjbG9jayBmYWNlIHRvZ2dsZWQgdmlzaWJsZSBvciBoaWRkZW5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHRvZ2dsZUhvdXJzVmlzaWJsZShpc1Zpc2libGUgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBpc01pbGl0YXJ5Rm9ybWF0ID0gdGhpcy5pc01pbGl0YXJ5Rm9ybWF0KCk7XG5cbiAgICAgICAgdGhpcy5jbG9ja0Vscy5ob3Vycy5zdHlsZS5kaXNwbGF5ID0gaXNWaXNpYmxlICYmICFpc01pbGl0YXJ5Rm9ybWF0ID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICAgICAgdGhpcy5jbG9ja0Vscy5taWxpdGFyeUhvdXJzLnN0eWxlLmRpc3BsYXkgPSBpc1Zpc2libGUgJiYgaXNNaWxpdGFyeUZvcm1hdCA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIG1pbnV0ZSBjbG9jayB2aXNpYmxpdHkgaW4gRE9NXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzVmlzaWJsZSBJcyBjbG9jayBmYWNlIHRvZ2dsZWQgdmlzaWJsZSBvciBoaWRkZW5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHRvZ2dsZU1pbnV0ZXNWaXNpYmxlKGlzVmlzaWJsZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuY2xvY2tFbHMubWludXRlcy5zdHlsZS5kaXNwbGF5ID0gaXNWaXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICAgICAgdGhpcy5idXR0b25FbHMuYmFjay5zdHlsZS5kaXNwbGF5ID0gaXNWaXNpYmxlID8gJ2lubGluZS1ibG9jaycgOiAnbm9uZSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhY3RpdmUgdGltZSBlbGVtZW50IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSB0aW1lRWxzIENvbGxlY3Rpb24gb2YgdGltZSBlbGVtZW50cyB0byBmaW5kIGFjdGl2ZSBpblxuICAgICAqIEByZXR1cm4ge2ludGVnZXJ9IEFjdGl2ZSBlbGVtZW50IGluZGV4XG4gICAgICovXG4gICAgZ2V0QWN0aXZlSW5kZXgodGltZUVscykge1xuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSAwO1xuXG4gICAgICAgIFtdLnNvbWUuY2FsbCh0aW1lRWxzLCAodGltZUVsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRpbWVFbC5jbGFzc0xpc3QuY29udGFpbnMoJ210cC1jbG9jay0tYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYWN0aXZlSW5kZXggPiAxMSA/IGFjdGl2ZUluZGV4IC0gMTIgOiBhY3RpdmVJbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgc2VsZWN0ZWQgdGltZSB0byBpbnB1dCBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHRpbWVTZWxlY3RlZCgpIHtcbiAgICAgICAgY29uc3QgdGltZSA9IHRoaXMuZGlzcGxheUVscy50aW1lLmlubmVySFRNTDtcbiAgICAgICAgY29uc3QgbWVyaWRpZW0gPSB0aGlzLmlzTWlsaXRhcnlGb3JtYXQoKSA/ICcnIDogdGhpcy5kaXNwbGF5RWxzLm1lcmlkaWVtLmlubmVySFRNTDtcblxuICAgICAgICB0aGlzLmlucHV0RWwudmFsdWUgPSBgJHt0aW1lfSAke21lcmlkaWVtfWA7XG4gICAgICAgIHRoaXMuaW5wdXRFbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGFjdGl2ZSBjbG9jayBmYWNlIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gY29udGFpbmVyRWwgTmV3IGFjdGl2ZSBlbGVtZW50cyAucGFyZW50Tm9kZVxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gYWN0aXZlRWwgRWxlbWVudCB0byBzZXQgYWN0aXZlXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZXRBY3RpdmUoY29udGFpbmVyRWwsIGFjdGl2ZUVsKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUNsYXNzTmFtZSA9ICdtdHAtY2xvY2stLWFjdGl2ZSc7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRBY3RpdmUgPSBjb250YWluZXJFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGFjdGl2ZUNsYXNzTmFtZSlbMF07XG5cbiAgICAgICAgY3VycmVudEFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZUNsYXNzTmFtZSk7XG4gICAgICAgIGFjdGl2ZUVsLmNsYXNzTGlzdC5hZGQoYWN0aXZlQ2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaW1lIHNlbGVjdCBldmVudCBoYW5kbGVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBFdmVudCBvYmplY3QgcGFzc2VkIGZyb20gbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXJFbCBFbGVtZW50IGNvbnRhaW5pbmcgdGltZSBsaXN0IGVsZW1lbnRzXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gbGlzdEVscyBDb2xsZWN0aW9uIG9mIGxpc3QgZWxlbWVudHNcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IGRpc3BsYXlJbmRleCBJbmRleCBhdCB3aGljaCBzZWxlY3RlZCB0aW1lIHNob3VsZCBkaXNwbGF5IFsxOiBob3VycywgMjogbWludXRlc11cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNlbGVjdEV2ZW50KGV2ZW50LCBjb250YWluZXJFbCwgbGlzdEVscywgZGlzcGxheUluZGV4KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IG5ld0FjdGl2ZSA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgICB0aGlzLnNldEFjdGl2ZShjb250YWluZXJFbCwgbmV3QWN0aXZlKTtcbiAgICAgICAgdGhpcy5zZXREaXNwbGF5VGltZShuZXdBY3RpdmUuaW5uZXJIVE1MLCBkaXNwbGF5SW5kZXgpO1xuICAgICAgICB0aGlzLnJvdGF0ZUhhbmQodGhpcy5nZXRBY3RpdmVJbmRleChsaXN0RWxzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgcGlja2VyIHNldCB0byBtaWxpdGFyeSB0aW1lIG1vZGVcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IElzIGluIG1pbGl0YXJ5IHRpbWUgbW9kZVxuICAgICAqL1xuICAgIGlzTWlsaXRhcnlGb3JtYXQoKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuaW5wdXRFbC5tdHBPcHRpb25zLnRpbWVGb3JtYXQgPT09ICdtaWxpdGFyeScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHBpY2tlciBvYmplY3QgaGFzIGFscmVhZHkgc2V0IGV2ZW50cyBvbiBwaWNrZXIgZWxlbWVudHNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IEhhcyBldmVudHMgYmVlbiBzZXQgb24gcGlja2VyIGVsZW1lbnRzXG4gICAgICovXG4gICAgaGFzU2V0RXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVyRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdtdHAtZXZlbnRzLXNldCcpO1xuICAgIH1cbn1cblxuLy8gT2JqZWN0LmFzc2lnbiBwb2x5ZmlsbCBzbyBgYmFiZWwvcG9seWZpbGxgIGlzIG5vdCByZXF1aXJlZFxuaWYgKCFPYmplY3QuYXNzaWduKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2Fzc2lnbicsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiB0YXJnZXQgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG8gPSBPYmplY3QodGFyZ2V0KTtcblxuICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gJ3VuZGVmaW5lZCcgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGluYyA9IDE7IGluYyA8IGFyZ3VtZW50cy5sZW5ndGg7IGluYyArPSAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5jXTtcblxuICAgICAgICAgICAgICAgIGlmIChuZXh0U291cmNlID09PSAndW5kZWZpbmVkJyB8fCBuZXh0U291cmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5leHRTb3VyY2UgPSBPYmplY3QobmV4dFNvdXJjZSk7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5c0FycmF5ID0gT2JqZWN0LmtleXMobmV4dFNvdXJjZSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBuZXh0SW5kZXggPSAwLCBsZW4gPSBrZXlzQXJyYXkubGVuZ3RoOyBuZXh0SW5kZXggPCBsZW47IG5leHRJbmRleCArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRLZXkgPSBrZXlzQXJyYXlbbmV4dEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmV4dFNvdXJjZSwgbmV4dEtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2MgIT09ICd1bmRlZmluZWQnICYmIGRlc2MuZW51bWVyYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdG87XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5cbndpbmRvdy5UaW1lUGlja2VyID0gbmV3IFRpbWVQaWNrZXIoKTtcbmV4cG9ydCBkZWZhdWx0IG5ldyBUaW1lUGlja2VyKCk7XG4iXX0=
