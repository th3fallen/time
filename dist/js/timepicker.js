(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = "<div class=\"mtp-overlay\" style=\"display:none\"><div class=\"mtp-wrapper\"><div class=\"mtp-display\"> <span class=\"mtp-display__time\">12:00</span> <span class=\"mtp-display__meridiem\">am</span></div><div class=\"mtp-picker\"><div class=\"mtp-meridiem\"> <span class=\"mtp-clock--active\">am</span> <span>pm</span></div><div class=\"mtp-clock\"><div class=\"mtp-clock__center\"></div><div class=\"mtp-clock__hand\"></div><ul class=\"mtp-clock__time mtp-clock__outer mtp-clock__hours\" style=\"display:none\"><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li class=\"mtp-clock--active\">12</li><li>1</li><li>2</li></ul><ul class=\"mtp-clock__time mtp-clock__outer mtp-clock__minutes\" style=\"display:none\"><li>15</li><li>20</li><li>25</li><li>30</li><li>35</li><li>40</li><li>45</li><li>50</li><li>55</li><li class=\"mtp-clock--active\">0</li><li>5</li><li>10</li></ul><ul class=\"mtp-clock__time mtp-clock__hours-military\" style=\"display:none\"><div class=\"mtp-clock__inner\"><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li class=\"mtp-clock--active\">00</li><li>1</li><li>2</li></div><div class=\"mtp-clock__outer\"><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li>21</li><li>22</li><li>23</li><li>12</li><li>13</li><li>14</li></div></ul></div><div class=\"mtp-actions\"> <button type=\"button\" class=\"mtp-actions__button mtp-actions__cancel\">Cancel</button> <button type=\"button\" class=\"mtp-actions__button mtp-actions__back\" style=\"display:none\">Back</button> <button type=\"button\" class=\"mtp-actions__button mtp-actions__ok\">OK</button></div></div></div></div>";

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
            this.meridiemEls = {
                wrapper: this.wrapperEl.getElementsByClassName('mtp-meridiem')[0]
            };
            this.meridiemEls.spans = this.meridiemEls.wrapper.getElementsByTagName('span');
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

            // meridiem select events
            [].forEach.call(this.meridiemEls.spans, function (span) {
                span.addEventListener('click', function (event) {
                    return _this2.meridiemSelectEvent(event);
                });
            });

            // time select events
            [].forEach.call(this.timeEls.hours, function (hour) {
                hour.addEventListener('click', function (event) {
                    _this2.timeSelectEvent(event, _this2.clockEls.hours, _this2.timeEls.hours, 0);
                });
            });
            [].forEach.call(this.timeEls.minutes, function (minute) {
                minute.addEventListener('click', function (event) {
                    _this2.timeSelectEvent(event, _this2.clockEls.minutes, _this2.timeEls.minutes, 1);
                });
            });
            [].forEach.call(this.timeEls.militaryHours, function (hour) {
                hour.addEventListener('click', function (event) {
                    _this2.timeSelectEvent(event, _this2.clockEls.militaryHours, _this2.timeEls.militaryHours, 0);
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
            this.meridiemEls.wrapper.style.display = isMilitaryFormat ? 'none' : 'block';
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
         * Meridiem select event handler
         *
         * @param {Evenet} event Event object passed from listener
         * @return {void}
         */
    }, {
        key: 'meridiemSelectEvent',
        value: function meridiemSelectEvent(event) {
            var element = event.target;
            var currentActive = this.meridiemEls.wrapper.getElementsByClassName('mtp-clock--active')[0];
            var value = element.innerHTML;

            if (element !== currentActive) {
                currentActive.classList.remove('mtp-clock--active');
                element.classList.add('mtp-clock--active');
                this.displayEls.meridiem.innerHTML = value;
            }
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
        key: 'timeSelectEvent',
        value: function timeSelectEvent(event, containerEl, listEls, displayIndex) {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaHRtbC90aW1lcGlja2VyLmh0bWwiLCIvdmFyL3d3dy9qcy1tb2R1bGVzL3RpbWVwaWNrZXIvc3JjL2pzL3RpbWVwaWNrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7a0NDRHFCLHlCQUF5Qjs7OztBQUU5QyxJQUFNLGNBQWMsR0FBRzs7QUFFbkIsY0FBVSxFQUFFLFVBQVU7Q0FDekIsQ0FBQzs7SUFFSSxVQUFVOzs7Ozs7OztBQU9ELGFBUFQsVUFBVSxHQU9FOzhCQVBaLFVBQVU7O0FBUVIsWUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDckIsWUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztBQUVyQixlQUFPLElBQUksQ0FBQztLQUNmOzs7Ozs7Ozs7O2lCQVpDLFVBQVU7O2VBbUJDLHlCQUFHO0FBQ1osZ0JBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFN0UsZ0JBQUksQ0FBQyxTQUFTLEVBQUU7QUFDWix3QkFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLGtDQUFXLENBQUM7YUFDM0Q7O0FBRUQsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25FLGdCQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekUsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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QUNaOztBQUVELDBCQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2hDLG9CQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUUxQyxxQkFBSyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxHQUFHLEdBQUcsRUFBRSxTQUFTLElBQUksQ0FBQyxFQUFFO0FBQzdFLHdCQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckMsd0JBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRWxFLHdCQUFJLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUN6QywwQkFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDckM7aUJBQ0o7YUFDSjs7QUFFRCxtQkFBTyxFQUFFLENBQUM7U0FDYjtLQUNKLENBQUMsQ0FBQztDQUNOOztBQUVELE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztxQkFDdEIsSUFBSSxVQUFVLEVBQUUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcIm10cC1vdmVybGF5XFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lXFxcIj48ZGl2IGNsYXNzPVxcXCJtdHAtd3JhcHBlclxcXCI+PGRpdiBjbGFzcz1cXFwibXRwLWRpc3BsYXlcXFwiPiA8c3BhbiBjbGFzcz1cXFwibXRwLWRpc3BsYXlfX3RpbWVcXFwiPjEyOjAwPC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwibXRwLWRpc3BsYXlfX21lcmlkaWVtXFxcIj5hbTwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtdHAtcGlja2VyXFxcIj48ZGl2IGNsYXNzPVxcXCJtdHAtbWVyaWRpZW1cXFwiPiA8c3BhbiBjbGFzcz1cXFwibXRwLWNsb2NrLS1hY3RpdmVcXFwiPmFtPC9zcGFuPiA8c3Bhbj5wbTwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtdHAtY2xvY2tcXFwiPjxkaXYgY2xhc3M9XFxcIm10cC1jbG9ja19fY2VudGVyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtdHAtY2xvY2tfX2hhbmRcXFwiPjwvZGl2Pjx1bCBjbGFzcz1cXFwibXRwLWNsb2NrX190aW1lIG10cC1jbG9ja19fb3V0ZXIgbXRwLWNsb2NrX19ob3Vyc1xcXCIgc3R5bGU9XFxcImRpc3BsYXk6bm9uZVxcXCI+PGxpPjM8L2xpPjxsaT40PC9saT48bGk+NTwvbGk+PGxpPjY8L2xpPjxsaT43PC9saT48bGk+ODwvbGk+PGxpPjk8L2xpPjxsaT4xMDwvbGk+PGxpPjExPC9saT48bGkgY2xhc3M9XFxcIm10cC1jbG9jay0tYWN0aXZlXFxcIj4xMjwvbGk+PGxpPjE8L2xpPjxsaT4yPC9saT48L3VsPjx1bCBjbGFzcz1cXFwibXRwLWNsb2NrX190aW1lIG10cC1jbG9ja19fb3V0ZXIgbXRwLWNsb2NrX19taW51dGVzXFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lXFxcIj48bGk+MTU8L2xpPjxsaT4yMDwvbGk+PGxpPjI1PC9saT48bGk+MzA8L2xpPjxsaT4zNTwvbGk+PGxpPjQwPC9saT48bGk+NDU8L2xpPjxsaT41MDwvbGk+PGxpPjU1PC9saT48bGkgY2xhc3M9XFxcIm10cC1jbG9jay0tYWN0aXZlXFxcIj4wPC9saT48bGk+NTwvbGk+PGxpPjEwPC9saT48L3VsPjx1bCBjbGFzcz1cXFwibXRwLWNsb2NrX190aW1lIG10cC1jbG9ja19faG91cnMtbWlsaXRhcnlcXFwiIHN0eWxlPVxcXCJkaXNwbGF5Om5vbmVcXFwiPjxkaXYgY2xhc3M9XFxcIm10cC1jbG9ja19faW5uZXJcXFwiPjxsaT4zPC9saT48bGk+NDwvbGk+PGxpPjU8L2xpPjxsaT42PC9saT48bGk+NzwvbGk+PGxpPjg8L2xpPjxsaT45PC9saT48bGk+MTA8L2xpPjxsaT4xMTwvbGk+PGxpIGNsYXNzPVxcXCJtdHAtY2xvY2stLWFjdGl2ZVxcXCI+MDA8L2xpPjxsaT4xPC9saT48bGk+MjwvbGk+PC9kaXY+PGRpdiBjbGFzcz1cXFwibXRwLWNsb2NrX19vdXRlclxcXCI+PGxpPjE1PC9saT48bGk+MTY8L2xpPjxsaT4xNzwvbGk+PGxpPjE4PC9saT48bGk+MTk8L2xpPjxsaT4yMDwvbGk+PGxpPjIxPC9saT48bGk+MjI8L2xpPjxsaT4yMzwvbGk+PGxpPjEyPC9saT48bGk+MTM8L2xpPjxsaT4xNDwvbGk+PC9kaXY+PC91bD48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtdHAtYWN0aW9uc1xcXCI+IDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwibXRwLWFjdGlvbnNfX2J1dHRvbiBtdHAtYWN0aW9uc19fY2FuY2VsXFxcIj5DYW5jZWw8L2J1dHRvbj4gPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJtdHAtYWN0aW9uc19fYnV0dG9uIG10cC1hY3Rpb25zX19iYWNrXFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lXFxcIj5CYWNrPC9idXR0b24+IDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwibXRwLWFjdGlvbnNfX2J1dHRvbiBtdHAtYWN0aW9uc19fb2tcXFwiPk9LPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCI7XG4iLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vaHRtbC90aW1lcGlja2VyLmh0bWwnO1xuXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAvLyBgc3RhbmRhcmRgIG9yIGBtaWxpdGFyeWAgZGlzcGxheSBob3Vyc1xuICAgIHRpbWVGb3JtYXQ6ICdzdGFuZGFyZCcsXG59O1xuXG5jbGFzcyBUaW1lUGlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgbmV3IFRpbWVQaWNrZXIgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1RpbWVQaWNrZXJ9IE5ldyBUaW1lUGlja2VyIGluc3RhbmNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0ZXAgPSAwO1xuICAgICAgICB0aGlzLnNldHVwRWxlbWVudHMoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdGVtcGxhdGUgdG8gRE9NIGlmIG5vIGFscmVhZHksIGFuZCBjYWNoZSBlbGVtZW50cyB1c2UgYnkgcGlja2VyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNldHVwRWxlbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IG10cEV4aXN0cyA9IEJvb2xlYW4oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLW92ZXJsYXknKVswXSk7XG5cbiAgICAgICAgaWYgKCFtdHBFeGlzdHMpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZW1wbGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm92ZXJsYXlFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1vdmVybGF5JylbMF07XG4gICAgICAgIHRoaXMud3JhcHBlckVsID0gdGhpcy5vdmVybGF5RWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLXdyYXBwZXInKVswXTtcbiAgICAgICAgdGhpcy5waWNrZXJFbCA9IHRoaXMud3JhcHBlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1waWNrZXInKVswXTtcbiAgICAgICAgdGhpcy5tZXJpZGllbUVscyA9IHtcbiAgICAgICAgICAgIHdyYXBwZXI6IHRoaXMud3JhcHBlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1tZXJpZGllbScpWzBdLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1lcmlkaWVtRWxzLnNwYW5zID0gdGhpcy5tZXJpZGllbUVscy53cmFwcGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJyk7XG4gICAgICAgIHRoaXMuZGlzcGxheUVscyA9IHtcbiAgICAgICAgICAgIHRpbWU6IHRoaXMud3JhcHBlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1kaXNwbGF5X190aW1lJylbMF0sXG4gICAgICAgICAgICBtZXJpZGllbTogdGhpcy53cmFwcGVyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLWRpc3BsYXlfX21lcmlkaWVtJylbMF0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYnV0dG9uRWxzID0ge1xuICAgICAgICAgICAgY2FuY2VsOiB0aGlzLnBpY2tlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1hY3Rpb25zX19jYW5jZWwnKVswXSxcbiAgICAgICAgICAgIGJhY2s6IHRoaXMucGlja2VyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLWFjdGlvbnNfX2JhY2snKVswXSxcbiAgICAgICAgICAgIG9rOiB0aGlzLnBpY2tlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1hY3Rpb25zX19vaycpWzBdLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNsb2NrRWxzID0ge1xuICAgICAgICAgICAgaG91cnM6IHRoaXMucGlja2VyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLWNsb2NrX19ob3VycycpWzBdLFxuICAgICAgICAgICAgbWludXRlczogdGhpcy5waWNrZXJFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtY2xvY2tfX21pbnV0ZXMnKVswXSxcbiAgICAgICAgICAgIG1pbGl0YXJ5SG91cnM6IHRoaXMucGlja2VyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLWNsb2NrX19ob3Vycy1taWxpdGFyeScpWzBdLFxuICAgICAgICAgICAgaGFuZDogdGhpcy5waWNrZXJFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtY2xvY2tfX2hhbmQnKVswXSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50aW1lRWxzID0ge1xuICAgICAgICAgICAgaG91cnM6IHRoaXMuY2xvY2tFbHMuaG91cnMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyksXG4gICAgICAgICAgICBtaW51dGVzOiB0aGlzLmNsb2NrRWxzLm1pbnV0ZXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyksXG4gICAgICAgICAgICBtaWxpdGFyeUhvdXJzOiB0aGlzLmNsb2NrRWxzLm1pbGl0YXJ5SG91cnMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCF0aGlzLmhhc1NldEV2ZW50cygpKSB7XG4gICAgICAgICAgICB0aGlzLnNldEV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVyRWwuY2xhc3NMaXN0LmFkZCgnbXRwLWV2ZW50cy1zZXQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBpbnB1dCBlbGVtZW50IHRvIHBpY2tlciBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fSBpbnB1dEVsIFNlbGVjdG9yIGVsZW1lbnQgdG8gYmUgcXVlcmllZCBvciBleGlzdGluZyBIVE1MRWxlbWVudFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9wdGlvbnMgdG8gbWVyZ2VkIHdpdGggZGVmYXVsdHMgYW5kIHNldCB0byBpbnB1dCBlbGVtZW50IG9iamVjdFxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgYWRkSW5wdXQoaW5wdXRFbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBpbnB1dEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBpbnB1dEVsIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpbnB1dEVsKTtcblxuICAgICAgICBlbGVtZW50Lm10cE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBldmVudCA9PiB0aGlzLnNob3dFdmVudChldmVudCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZXZlbnRzIG9uIHBpY2tlciBlbGVtZW50c1xuICAgICAqXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZXRFdmVudHMoKSB7XG4gICAgICAgIC8vIGNsb3NlXG4gICAgICAgIHRoaXMub3ZlcmxheUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGhpcy5oaWRlRXZlbnQoZXZlbnQpKTtcbiAgICAgICAgdGhpcy5idXR0b25FbHMuY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGhpcy5oaWRlRXZlbnQoZXZlbnQpKTtcblxuICAgICAgICAvLyBuZXh0L3ByZXYgc3RlcCBhY3Rpb25zXG4gICAgICAgIHRoaXMuYnV0dG9uRWxzLm9rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jaGFuZ2VTdGVwKHRoaXMuY3VycmVudFN0ZXAgKyAxKSk7XG4gICAgICAgIHRoaXMuYnV0dG9uRWxzLmJhY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmNoYW5nZVN0ZXAoMCkpO1xuXG4gICAgICAgIC8vIG1lcmlkaWVtIHNlbGVjdCBldmVudHNcbiAgICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMubWVyaWRpZW1FbHMuc3BhbnMsIHNwYW4gPT4ge1xuICAgICAgICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRoaXMubWVyaWRpZW1TZWxlY3RFdmVudChldmVudCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aW1lIHNlbGVjdCBldmVudHNcbiAgICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMudGltZUVscy5ob3VycywgaG91ciA9PiB7XG4gICAgICAgICAgICBob3VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZVNlbGVjdEV2ZW50KGV2ZW50LCB0aGlzLmNsb2NrRWxzLmhvdXJzLCB0aGlzLnRpbWVFbHMuaG91cnMsIDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy50aW1lRWxzLm1pbnV0ZXMsIG1pbnV0ZSA9PiB7XG4gICAgICAgICAgICBtaW51dGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lU2VsZWN0RXZlbnQoZXZlbnQsIHRoaXMuY2xvY2tFbHMubWludXRlcywgdGhpcy50aW1lRWxzLm1pbnV0ZXMsIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy50aW1lRWxzLm1pbGl0YXJ5SG91cnMsIGhvdXIgPT4ge1xuICAgICAgICAgICAgaG91ci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVTZWxlY3RFdmVudChldmVudCwgdGhpcy5jbG9ja0Vscy5taWxpdGFyeUhvdXJzLCB0aGlzLnRpbWVFbHMubWlsaXRhcnlIb3VycywgMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyB0aGUgcGlja2VyIGluIHRoZSBET01cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2hvdygpIHtcbiAgICAgICAgY29uc3QgaXNNaWxpdGFyeUZvcm1hdCA9IHRoaXMuaXNNaWxpdGFyeUZvcm1hdCgpO1xuXG4gICAgICAgIC8vIGJsdXIgaW5wdXQgdG8gcHJldmVudCBvbnNjcmVlbiBrZXlib2FyZCBmcm9tIGRpc3BsYXlpbmdcbiAgICAgICAgdGhpcy5pbnB1dEVsLmJsdXIoKTtcbiAgICAgICAgdGhpcy50b2dnbGVIb3Vyc1Zpc2libGUodHJ1ZSk7XG4gICAgICAgIHRoaXMudG9nZ2xlTWludXRlc1Zpc2libGUoKTtcbiAgICAgICAgdGhpcy5zZXREaXNwbGF5VGltZSh0aGlzLmlzTWlsaXRhcnlGb3JtYXQoKSA/ICcwMCcgOiAnMTInLCAwKTtcbiAgICAgICAgdGhpcy5zZXREaXNwbGF5VGltZSgnMCcsIDEpO1xuXG4gICAgICAgIHRoaXMuZGlzcGxheUVscy5tZXJpZGllbS5zdHlsZS5kaXNwbGF5ID0gaXNNaWxpdGFyeUZvcm1hdCA/ICdub25lJyA6ICdpbmxpbmUnO1xuICAgICAgICB0aGlzLm1lcmlkaWVtRWxzLndyYXBwZXIuc3R5bGUuZGlzcGxheSA9IGlzTWlsaXRhcnlGb3JtYXQgPyAnbm9uZScgOiAnYmxvY2snO1xuICAgICAgICB0aGlzLm92ZXJsYXlFbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGUgZm9yIGlucHV0IGZvY3VzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBFdmVudCBvYmplY3QgcGFzc2VkIGZyb20gbGlzdGVuZXJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNob3dFdmVudChldmVudCkge1xuICAgICAgICB0aGlzLmlucHV0RWwgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgdGhlIHBpY2tlciBpbiB0aGUgRE9NXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheUVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuaW5wdXRFbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnYmx1cicpKTtcbiAgICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSB0aGUgcGlja2VyIGVsZW1lbnQgb24gdGhlIHBhZ2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IEV2ZW50IG9iamVjdCBwYXNzZWQgZnJvbSBldmVudCBsaXN0ZW5lciBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgaGlkZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIC8vIG9ubHkgYWxsb3cgZXZlbnQgYmFzZWQgY2xvc2UgaWYgZXZlbnQudGFyZ2V0IGNvbnRhaW5zIG9uZSBvZiB0aGVzZSBjbGFzc2VzXG4gICAgICAgIC8vIGhhY2sgdG8gcHJldmVudCBvdmVybGF5IGNsb3NlIGV2ZW50IGZyb20gdHJpZ2dlcmluZyBvbiBhbGwgZWxlbWVudHNcbiAgICAgICAgY29uc3QgYWxsb3dlZENsYXNzZXMgPSBbJ210cC1vdmVybGF5JywgJ210cC1hY3Rpb25zX19jYW5jZWwnXTtcbiAgICAgICAgY29uc3QgY2xhc3NMaXN0ID0gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdDtcblxuICAgICAgICBhbGxvd2VkQ2xhc3Nlcy5zb21lKGFsbG93ZWRDbGFzcyA9PiB7XG4gICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKGFsbG93ZWRDbGFzcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgcGlja2VyIHN0YXRlIHRvIGRlZmF1bHRzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHJlc2V0U3RhdGUoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0ZXAgPSAwO1xuXG4gICAgICAgIHRoaXMudG9nZ2xlSG91cnNWaXNpYmxlKHRydWUpO1xuICAgICAgICB0aGlzLnRvZ2dsZU1pbnV0ZXNWaXNpYmxlKCk7XG4gICAgICAgIHRoaXMudGltZUVscy5ob3Vyc1s5XS5jbGljaygpO1xuICAgICAgICB0aGlzLnRpbWVFbHMubWludXRlc1s5XS5jbGljaygpO1xuICAgICAgICB0aGlzLnRpbWVFbHMubWlsaXRhcnlIb3Vyc1s5XS5jbGljaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZGlzcGxheWVkIHRpbWUsIHdoaWNoIHdpbGwgYmUgdXNlZCB0byBmaWxsIGlucHV0IHZhbHVlIG9uIGNvbXBsZXRldGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIE5ld2x5IHNlbGVjdGVkIHRpbWUgdmFsdWVcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IGluZGV4IEluZGV4IG9mIHZhbHVlIHRvIHJlcGxhY2UgWzAgPSBob3VycywgMSA9IG1pbnV0ZXNdXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZXREaXNwbGF5VGltZSh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgY29uc3QgdGltZSA9IHRoaXMuZGlzcGxheUVscy50aW1lLmlubmVySFRNTC5zcGxpdCgnOicpO1xuXG4gICAgICAgIC8vIHByZXBlbmQgd2l0aCB6ZXJvIGlmIHNlbGVjdGluZyBtaW51dGVzIGFuZCB2YWx1ZSBpcyBzaW5nbGUgZGlnaXRcbiAgICAgICAgdGltZVtpbmRleF0gPSBpbmRleCA9PT0gMSAmJiB2YWx1ZSA8IDEwID8gYDAke3ZhbHVlfWAgOiB2YWx1ZTtcbiAgICAgICAgY29uc3QgbmV3VGltZSA9IHRpbWUuam9pbignOicpO1xuXG4gICAgICAgIHRoaXMuZGlzcGxheUVscy50aW1lLmlubmVySFRNTCA9IG5ld1RpbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUm90YXRlIHRoZSBoYW5kIGVsZW1lbnQgdG8gc2VsZWN0ZWQgdGltZS4gUm90YXRpb24gaXMgZG9uZSBpbiBpbmNyZW1lbnRzIG9mIDMwZGVnLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtpbnRlZ2VyfSBub2RlSW5kZXggSW5kZXggaW5zaWRlIHBhcmVudE5vZGUgb2YgdGhlIHNlbGVjdGVkIHRpbWVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHJvdGF0ZUhhbmQobm9kZUluZGV4ID0gOSkge1xuICAgICAgICAvLyBub2RlSW5kZXggMCBpcyAzIGVsZW1lbnRzIGJlaGluZCAwZGVnIHNvIHN1YnRyYWN0IDkwIGZyb20gdGhlIHN1bVxuICAgICAgICBjb25zdCByb3RhdGVEZWcgPSBub2RlSW5kZXggKiAzMCAtIDkwO1xuICAgICAgICBjb25zdCBzdHlsZVZhbCA9IGByb3RhdGUoJHtyb3RhdGVEZWd9ZGVnKWA7XG5cbiAgICAgICAgdGhpcy5jbG9ja0Vscy5oYW5kLnN0eWxlLnRyYW5zZm9ybSA9IHN0eWxlVmFsO1xuICAgICAgICB0aGlzLmNsb2NrRWxzLmhhbmQuc3R5bGVbJy13ZWJraXQtdHJhbnNmb3JtJ10gPSBzdHlsZVZhbDtcbiAgICAgICAgdGhpcy5jbG9ja0Vscy5oYW5kLnN0eWxlWyctbXMtdHJhbnNmb3JtJ10gPSBzdHlsZVZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgdG8gdGhlIHNwZWNpZmllZCBzdGVwXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IHN0ZXAgSW5kZXggb2Ygc3RlcCB0byBjaGFuZ2UgdG9cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGNoYW5nZVN0ZXAoc3RlcCkge1xuICAgICAgICBjb25zdCBob3VyRWxzID0gdGhpcy5pc01pbGl0YXJ5Rm9ybWF0KCkgPyB0aGlzLnRpbWVFbHMubWlsaXRhcnlIb3VycyA6IHRoaXMudGltZUVscy5ob3VycztcbiAgICAgICAgY29uc3QgbWludXRlRWxzID0gdGhpcy50aW1lRWxzLm1pbnV0ZXM7XG4gICAgICAgIGNvbnN0IGNoYW5nZVN0ZXBBY3Rpb24gPSBbXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVIb3Vyc1Zpc2libGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVNaW51dGVzVmlzaWJsZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucm90YXRlSGFuZCh0aGlzLmdldEFjdGl2ZUluZGV4KGhvdXJFbHMpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVIb3Vyc1Zpc2libGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZU1pbnV0ZXNWaXNpYmxlKHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMucm90YXRlSGFuZCh0aGlzLmdldEFjdGl2ZUluZGV4KG1pbnV0ZUVscykpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVTZWxlY3RlZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXVtzdGVwXTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRTdGVwID0gc3RlcDtcbiAgICAgICAgY2hhbmdlU3RlcEFjdGlvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBob3VyIChib3RoIG1pbGl0YXJ5IGFuZCBzdGFuZGFyZCkgY2xvY2sgdmlzaWJsaXR5IGluIERPTVxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc1Zpc2libGUgSXMgY2xvY2sgZmFjZSB0b2dnbGVkIHZpc2libGUgb3IgaGlkZGVuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB0b2dnbGVIb3Vyc1Zpc2libGUoaXNWaXNpYmxlID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgaXNNaWxpdGFyeUZvcm1hdCA9IHRoaXMuaXNNaWxpdGFyeUZvcm1hdCgpO1xuXG4gICAgICAgIHRoaXMuY2xvY2tFbHMuaG91cnMuc3R5bGUuZGlzcGxheSA9IGlzVmlzaWJsZSAmJiAhaXNNaWxpdGFyeUZvcm1hdCA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICAgIHRoaXMuY2xvY2tFbHMubWlsaXRhcnlIb3Vycy5zdHlsZS5kaXNwbGF5ID0gaXNWaXNpYmxlICYmIGlzTWlsaXRhcnlGb3JtYXQgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBtaW51dGUgY2xvY2sgdmlzaWJsaXR5IGluIERPTVxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc1Zpc2libGUgSXMgY2xvY2sgZmFjZSB0b2dnbGVkIHZpc2libGUgb3IgaGlkZGVuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB0b2dnbGVNaW51dGVzVmlzaWJsZShpc1Zpc2libGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNsb2NrRWxzLm1pbnV0ZXMuc3R5bGUuZGlzcGxheSA9IGlzVmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICAgIHRoaXMuYnV0dG9uRWxzLmJhY2suc3R5bGUuZGlzcGxheSA9IGlzVmlzaWJsZSA/ICdpbmxpbmUtYmxvY2snIDogJ25vbmUnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYWN0aXZlIHRpbWUgZWxlbWVudCBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gdGltZUVscyBDb2xsZWN0aW9uIG9mIHRpbWUgZWxlbWVudHMgdG8gZmluZCBhY3RpdmUgaW5cbiAgICAgKiBAcmV0dXJuIHtpbnRlZ2VyfSBBY3RpdmUgZWxlbWVudCBpbmRleFxuICAgICAqL1xuICAgIGdldEFjdGl2ZUluZGV4KHRpbWVFbHMpIHtcbiAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gMDtcblxuICAgICAgICBbXS5zb21lLmNhbGwodGltZUVscywgKHRpbWVFbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aW1lRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdtdHAtY2xvY2stLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGFjdGl2ZUluZGV4ID4gMTEgPyBhY3RpdmVJbmRleCAtIDEyIDogYWN0aXZlSW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHNlbGVjdGVkIHRpbWUgdG8gaW5wdXQgZWxlbWVudFxuICAgICAqXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB0aW1lU2VsZWN0ZWQoKSB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLmRpc3BsYXlFbHMudGltZS5pbm5lckhUTUw7XG4gICAgICAgIGNvbnN0IG1lcmlkaWVtID0gdGhpcy5pc01pbGl0YXJ5Rm9ybWF0KCkgPyAnJyA6IHRoaXMuZGlzcGxheUVscy5tZXJpZGllbS5pbm5lckhUTUw7XG5cbiAgICAgICAgdGhpcy5pbnB1dEVsLnZhbHVlID0gYCR7dGltZX0gJHttZXJpZGllbX1gO1xuICAgICAgICB0aGlzLmlucHV0RWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBhY3RpdmUgY2xvY2sgZmFjZSBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRhaW5lckVsIE5ldyBhY3RpdmUgZWxlbWVudHMgLnBhcmVudE5vZGVcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGFjdGl2ZUVsIEVsZW1lbnQgdG8gc2V0IGFjdGl2ZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2V0QWN0aXZlKGNvbnRhaW5lckVsLCBhY3RpdmVFbCkge1xuICAgICAgICBjb25zdCBhY3RpdmVDbGFzc05hbWUgPSAnbXRwLWNsb2NrLS1hY3RpdmUnO1xuICAgICAgICBjb25zdCBjdXJyZW50QWN0aXZlID0gY29udGFpbmVyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShhY3RpdmVDbGFzc05hbWUpWzBdO1xuXG4gICAgICAgIGN1cnJlbnRBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVDbGFzc05hbWUpO1xuICAgICAgICBhY3RpdmVFbC5jbGFzc0xpc3QuYWRkKGFjdGl2ZUNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWVyaWRpZW0gc2VsZWN0IGV2ZW50IGhhbmRsZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbmV0fSBldmVudCBFdmVudCBvYmplY3QgcGFzc2VkIGZyb20gbGlzdGVuZXJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIG1lcmlkaWVtU2VsZWN0RXZlbnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgY3VycmVudEFjdGl2ZSA9IHRoaXMubWVyaWRpZW1FbHMud3JhcHBlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtY2xvY2stLWFjdGl2ZScpWzBdO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQuaW5uZXJIVE1MO1xuXG4gICAgICAgIGlmIChlbGVtZW50ICE9PSBjdXJyZW50QWN0aXZlKSB7XG4gICAgICAgICAgICBjdXJyZW50QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ210cC1jbG9jay0tYWN0aXZlJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ210cC1jbG9jay0tYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlFbHMubWVyaWRpZW0uaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaW1lIHNlbGVjdCBldmVudCBoYW5kbGVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBFdmVudCBvYmplY3QgcGFzc2VkIGZyb20gbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXJFbCBFbGVtZW50IGNvbnRhaW5pbmcgdGltZSBsaXN0IGVsZW1lbnRzXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gbGlzdEVscyBDb2xsZWN0aW9uIG9mIGxpc3QgZWxlbWVudHNcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IGRpc3BsYXlJbmRleCBJbmRleCBhdCB3aGljaCBzZWxlY3RlZCB0aW1lIHNob3VsZCBkaXNwbGF5IFsxOiBob3VycywgMjogbWludXRlc11cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHRpbWVTZWxlY3RFdmVudChldmVudCwgY29udGFpbmVyRWwsIGxpc3RFbHMsIGRpc3BsYXlJbmRleCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCBuZXdBY3RpdmUgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgdGhpcy5zZXRBY3RpdmUoY29udGFpbmVyRWwsIG5ld0FjdGl2ZSk7XG4gICAgICAgIHRoaXMuc2V0RGlzcGxheVRpbWUobmV3QWN0aXZlLmlubmVySFRNTCwgZGlzcGxheUluZGV4KTtcbiAgICAgICAgdGhpcy5yb3RhdGVIYW5kKHRoaXMuZ2V0QWN0aXZlSW5kZXgobGlzdEVscykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHBpY2tlciBzZXQgdG8gbWlsaXRhcnkgdGltZSBtb2RlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBJcyBpbiBtaWxpdGFyeSB0aW1lIG1vZGVcbiAgICAgKi9cbiAgICBpc01pbGl0YXJ5Rm9ybWF0KCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmlucHV0RWwubXRwT3B0aW9ucy50aW1lRm9ybWF0ID09PSAnbWlsaXRhcnknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBwaWNrZXIgb2JqZWN0IGhhcyBhbHJlYWR5IHNldCBldmVudHMgb24gcGlja2VyIGVsZW1lbnRzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBIYXMgZXZlbnRzIGJlZW4gc2V0IG9uIHBpY2tlciBlbGVtZW50c1xuICAgICAqL1xuICAgIGhhc1NldEV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlckVsLmNsYXNzTGlzdC5jb250YWlucygnbXRwLWV2ZW50cy1zZXQnKTtcbiAgICB9XG59XG5cbi8vIE9iamVjdC5hc3NpZ24gcG9seWZpbGwgc28gYGJhYmVsL3BvbHlmaWxsYCBpcyBub3QgcmVxdWlyZWRcbmlmICghT2JqZWN0LmFzc2lnbikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsICdhc3NpZ24nLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogdGFyZ2V0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gT2JqZWN0KHRhcmdldCk7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09ICd1bmRlZmluZWQnIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGZpcnN0IGFyZ3VtZW50IHRvIG9iamVjdCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpbmMgPSAxOyBpbmMgPCBhcmd1bWVudHMubGVuZ3RoOyBpbmMgKz0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBuZXh0U291cmNlID0gYXJndW1lbnRzW2luY107XG5cbiAgICAgICAgICAgICAgICBpZiAobmV4dFNvdXJjZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmV4dFNvdXJjZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBuZXh0U291cmNlID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleXNBcnJheSA9IE9iamVjdC5rZXlzKG5leHRTb3VyY2UpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbmV4dEluZGV4ID0gMCwgbGVuID0ga2V5c0FycmF5Lmxlbmd0aDsgbmV4dEluZGV4IDwgbGVuOyBuZXh0SW5kZXggKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0S2V5ID0ga2V5c0FycmF5W25leHRJbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXNjICE9PSAndW5kZWZpbmVkJyAmJiBkZXNjLmVudW1lcmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRvO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG53aW5kb3cuVGltZVBpY2tlciA9IG5ldyBUaW1lUGlja2VyKCk7XG5leHBvcnQgZGVmYXVsdCBuZXcgVGltZVBpY2tlcigpO1xuIl19
