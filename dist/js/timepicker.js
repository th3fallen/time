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
     * Add input element to picker object
     *
     * @param {string|HTMLElement} inputEl Selector element to be queried or existing HTMLElement
     * @param {object} options Options to merged with defaults and set to input element object
     * @return {void}
     */

    _createClass(TimePicker, [{
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
         * Open picker with the input provided in context without binding events
         *
         * @param {string|HTMLElement} inputEl Selector element to be queried or existing HTMLElement
         * @param {object} options Options to merged with defaults and set to input element object
         * @return {void}
         */
    }, {
        key: 'openOnInput',
        value: function openOnInput(inputEl) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            this.inputEl = inputEl instanceof HTMLElement ? inputEl : document.querySelector(inputEl);
            this.inputEl.mtpOptions = Object.assign({}, defaultOptions, options);
            this.show();
        }

        /**
         * Add template to DOM if no already, and cache elements use by picker
         *
         * @return {void}
         */
    }, {
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
         * Rotate the hand element to selected time
         *
         * @param {integer} nodeIndex Index of active element
         * @return {void}
         */
    }, {
        key: 'rotateHand',
        value: function rotateHand() {
            var nodeIndex = arguments.length <= 0 || arguments[0] === undefined ? 9 : arguments[0];

            // rotation is done in increments of 30deg
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaHRtbC90aW1lcGlja2VyLmh0bWwiLCIvdmFyL3d3dy9qcy1tb2R1bGVzL3RpbWVwaWNrZXIvc3JjL2pzL3RpbWVwaWNrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7a0NDRHFCLHlCQUF5Qjs7OztBQUU5QyxJQUFNLGNBQWMsR0FBRzs7QUFFbkIsY0FBVSxFQUFFLFVBQVU7Q0FDekIsQ0FBQzs7SUFFSSxVQUFVOzs7Ozs7OztBQU9ELGFBUFQsVUFBVSxHQU9FOzhCQVBaLFVBQVU7O0FBUVIsWUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDckIsWUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztBQUVyQixlQUFPLElBQUksQ0FBQztLQUNmOzs7Ozs7Ozs7Ozs7aUJBWkMsVUFBVTs7ZUFxQkosa0JBQUMsT0FBTyxFQUFnQjs7O2dCQUFkLE9BQU8seURBQUcsRUFBRTs7QUFDMUIsZ0JBQU0sT0FBTyxHQUFHLE9BQU8sWUFBWSxXQUFXLEdBQUcsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRTNGLG1CQUFPLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRSxtQkFBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFBLEtBQUs7dUJBQUksTUFBSyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQUEsQ0FBQyxDQUFDO1NBQ3JFOzs7Ozs7Ozs7OztlQVNVLHFCQUFDLE9BQU8sRUFBZ0I7Z0JBQWQsT0FBTyx5REFBRyxFQUFFOztBQUM3QixnQkFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLFlBQVksV0FBVyxHQUFHLE9BQU8sR0FBRyxRQUFRLENBQUMs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dCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJtdHAtb3ZlcmxheVxcXCIgc3R5bGU9XFxcImRpc3BsYXk6bm9uZVxcXCI+PGRpdiBjbGFzcz1cXFwibXRwLXdyYXBwZXJcXFwiPjxkaXYgY2xhc3M9XFxcIm10cC1kaXNwbGF5XFxcIj4gPHNwYW4gY2xhc3M9XFxcIm10cC1kaXNwbGF5X190aW1lXFxcIj4xMjowMDwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcIm10cC1kaXNwbGF5X19tZXJpZGllbVxcXCI+YW08L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cXFwibXRwLXBpY2tlclxcXCI+PGRpdiBjbGFzcz1cXFwibXRwLW1lcmlkaWVtXFxcIj4gPHNwYW4gY2xhc3M9XFxcIm10cC1jbG9jay0tYWN0aXZlXFxcIj5hbTwvc3Bhbj4gPHNwYW4+cG08L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cXFwibXRwLWNsb2NrXFxcIj48ZGl2IGNsYXNzPVxcXCJtdHAtY2xvY2tfX2NlbnRlclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwibXRwLWNsb2NrX19oYW5kXFxcIj48L2Rpdj48dWwgY2xhc3M9XFxcIm10cC1jbG9ja19fdGltZSBtdHAtY2xvY2tfX291dGVyIG10cC1jbG9ja19faG91cnNcXFwiIHN0eWxlPVxcXCJkaXNwbGF5Om5vbmVcXFwiPjxsaT4zPC9saT48bGk+NDwvbGk+PGxpPjU8L2xpPjxsaT42PC9saT48bGk+NzwvbGk+PGxpPjg8L2xpPjxsaT45PC9saT48bGk+MTA8L2xpPjxsaT4xMTwvbGk+PGxpIGNsYXNzPVxcXCJtdHAtY2xvY2stLWFjdGl2ZVxcXCI+MTI8L2xpPjxsaT4xPC9saT48bGk+MjwvbGk+PC91bD48dWwgY2xhc3M9XFxcIm10cC1jbG9ja19fdGltZSBtdHAtY2xvY2tfX291dGVyIG10cC1jbG9ja19fbWludXRlc1xcXCIgc3R5bGU9XFxcImRpc3BsYXk6bm9uZVxcXCI+PGxpPjE1PC9saT48bGk+MjA8L2xpPjxsaT4yNTwvbGk+PGxpPjMwPC9saT48bGk+MzU8L2xpPjxsaT40MDwvbGk+PGxpPjQ1PC9saT48bGk+NTA8L2xpPjxsaT41NTwvbGk+PGxpIGNsYXNzPVxcXCJtdHAtY2xvY2stLWFjdGl2ZVxcXCI+MDwvbGk+PGxpPjU8L2xpPjxsaT4xMDwvbGk+PC91bD48dWwgY2xhc3M9XFxcIm10cC1jbG9ja19fdGltZSBtdHAtY2xvY2tfX2hvdXJzLW1pbGl0YXJ5XFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lXFxcIj48ZGl2IGNsYXNzPVxcXCJtdHAtY2xvY2tfX2lubmVyXFxcIj48bGk+MzwvbGk+PGxpPjQ8L2xpPjxsaT41PC9saT48bGk+NjwvbGk+PGxpPjc8L2xpPjxsaT44PC9saT48bGk+OTwvbGk+PGxpPjEwPC9saT48bGk+MTE8L2xpPjxsaSBjbGFzcz1cXFwibXRwLWNsb2NrLS1hY3RpdmVcXFwiPjAwPC9saT48bGk+MTwvbGk+PGxpPjI8L2xpPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm10cC1jbG9ja19fb3V0ZXJcXFwiPjxsaT4xNTwvbGk+PGxpPjE2PC9saT48bGk+MTc8L2xpPjxsaT4xODwvbGk+PGxpPjE5PC9saT48bGk+MjA8L2xpPjxsaT4yMTwvbGk+PGxpPjIyPC9saT48bGk+MjM8L2xpPjxsaT4xMjwvbGk+PGxpPjEzPC9saT48bGk+MTQ8L2xpPjwvZGl2PjwvdWw+PC9kaXY+PGRpdiBjbGFzcz1cXFwibXRwLWFjdGlvbnNcXFwiPiA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcIm10cC1hY3Rpb25zX19idXR0b24gbXRwLWFjdGlvbnNfX2NhbmNlbFxcXCI+Q2FuY2VsPC9idXR0b24+IDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwibXRwLWFjdGlvbnNfX2J1dHRvbiBtdHAtYWN0aW9uc19fYmFja1xcXCIgc3R5bGU9XFxcImRpc3BsYXk6bm9uZVxcXCI+QmFjazwvYnV0dG9uPiA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcIm10cC1hY3Rpb25zX19idXR0b24gbXRwLWFjdGlvbnNfX29rXFxcIj5PSzwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiO1xuIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uL2h0bWwvdGltZXBpY2tlci5odG1sJztcblxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgLy8gYHN0YW5kYXJkYCBvciBgbWlsaXRhcnlgIGRpc3BsYXkgaG91cnNcbiAgICB0aW1lRm9ybWF0OiAnc3RhbmRhcmQnLFxufTtcblxuY2xhc3MgVGltZVBpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIG5ldyBUaW1lUGlja2VyIGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtUaW1lUGlja2VyfSBOZXcgVGltZVBpY2tlciBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGVwID0gMDtcbiAgICAgICAgdGhpcy5zZXR1cEVsZW1lbnRzKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGlucHV0IGVsZW1lbnQgdG8gcGlja2VyIG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR9IGlucHV0RWwgU2VsZWN0b3IgZWxlbWVudCB0byBiZSBxdWVyaWVkIG9yIGV4aXN0aW5nIEhUTUxFbGVtZW50XG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT3B0aW9ucyB0byBtZXJnZWQgd2l0aCBkZWZhdWx0cyBhbmQgc2V0IHRvIGlucHV0IGVsZW1lbnQgb2JqZWN0XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBhZGRJbnB1dChpbnB1dEVsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGlucHV0RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA/IGlucHV0RWwgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlucHV0RWwpO1xuXG4gICAgICAgIGVsZW1lbnQubXRwT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGV2ZW50ID0+IHRoaXMuc2hvd0V2ZW50KGV2ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiBwaWNrZXIgd2l0aCB0aGUgaW5wdXQgcHJvdmlkZWQgaW4gY29udGV4dCB3aXRob3V0IGJpbmRpbmcgZXZlbnRzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudH0gaW5wdXRFbCBTZWxlY3RvciBlbGVtZW50IHRvIGJlIHF1ZXJpZWQgb3IgZXhpc3RpbmcgSFRNTEVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPcHRpb25zIHRvIG1lcmdlZCB3aXRoIGRlZmF1bHRzIGFuZCBzZXQgdG8gaW5wdXQgZWxlbWVudCBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIG9wZW5PbklucHV0KGlucHV0RWwsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLmlucHV0RWwgPSBpbnB1dEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBpbnB1dEVsIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpbnB1dEVsKTtcbiAgICAgICAgdGhpcy5pbnB1dEVsLm10cE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCB0ZW1wbGF0ZSB0byBET00gaWYgbm8gYWxyZWFkeSwgYW5kIGNhY2hlIGVsZW1lbnRzIHVzZSBieSBwaWNrZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2V0dXBFbGVtZW50cygpIHtcbiAgICAgICAgY29uc3QgbXRwRXhpc3RzID0gQm9vbGVhbihkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtb3ZlcmxheScpWzBdKTtcblxuICAgICAgICBpZiAoIW10cEV4aXN0cykge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRlbXBsYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3ZlcmxheUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLW92ZXJsYXknKVswXTtcbiAgICAgICAgdGhpcy53cmFwcGVyRWwgPSB0aGlzLm92ZXJsYXlFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtd3JhcHBlcicpWzBdO1xuICAgICAgICB0aGlzLnBpY2tlckVsID0gdGhpcy53cmFwcGVyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLXBpY2tlcicpWzBdO1xuICAgICAgICB0aGlzLm1lcmlkaWVtRWxzID0ge1xuICAgICAgICAgICAgd3JhcHBlcjogdGhpcy53cmFwcGVyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLW1lcmlkaWVtJylbMF0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubWVyaWRpZW1FbHMuc3BhbnMgPSB0aGlzLm1lcmlkaWVtRWxzLndyYXBwZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5RWxzID0ge1xuICAgICAgICAgICAgdGltZTogdGhpcy53cmFwcGVyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLWRpc3BsYXlfX3RpbWUnKVswXSxcbiAgICAgICAgICAgIG1lcmlkaWVtOiB0aGlzLndyYXBwZXJFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtZGlzcGxheV9fbWVyaWRpZW0nKVswXSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5idXR0b25FbHMgPSB7XG4gICAgICAgICAgICBjYW5jZWw6IHRoaXMucGlja2VyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLWFjdGlvbnNfX2NhbmNlbCcpWzBdLFxuICAgICAgICAgICAgYmFjazogdGhpcy5waWNrZXJFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtYWN0aW9uc19fYmFjaycpWzBdLFxuICAgICAgICAgICAgb2s6IHRoaXMucGlja2VyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLWFjdGlvbnNfX29rJylbMF0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2xvY2tFbHMgPSB7XG4gICAgICAgICAgICBob3VyczogdGhpcy5waWNrZXJFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtY2xvY2tfX2hvdXJzJylbMF0sXG4gICAgICAgICAgICBtaW51dGVzOiB0aGlzLnBpY2tlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1jbG9ja19fbWludXRlcycpWzBdLFxuICAgICAgICAgICAgbWlsaXRhcnlIb3VyczogdGhpcy5waWNrZXJFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtY2xvY2tfX2hvdXJzLW1pbGl0YXJ5JylbMF0sXG4gICAgICAgICAgICBoYW5kOiB0aGlzLnBpY2tlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1jbG9ja19faGFuZCcpWzBdLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRpbWVFbHMgPSB7XG4gICAgICAgICAgICBob3VyczogdGhpcy5jbG9ja0Vscy5ob3Vycy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKSxcbiAgICAgICAgICAgIG1pbnV0ZXM6IHRoaXMuY2xvY2tFbHMubWludXRlcy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKSxcbiAgICAgICAgICAgIG1pbGl0YXJ5SG91cnM6IHRoaXMuY2xvY2tFbHMubWlsaXRhcnlIb3Vycy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIXRoaXMuaGFzU2V0RXZlbnRzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RXZlbnRzKCk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXJFbC5jbGFzc0xpc3QuYWRkKCdtdHAtZXZlbnRzLXNldCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBldmVudHMgb24gcGlja2VyIGVsZW1lbnRzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNldEV2ZW50cygpIHtcbiAgICAgICAgLy8gY2xvc2VcbiAgICAgICAgdGhpcy5vdmVybGF5RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0aGlzLmhpZGVFdmVudChldmVudCkpO1xuICAgICAgICB0aGlzLmJ1dHRvbkVscy5jYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0aGlzLmhpZGVFdmVudChldmVudCkpO1xuXG4gICAgICAgIC8vIG5leHQvcHJldiBzdGVwIGFjdGlvbnNcbiAgICAgICAgdGhpcy5idXR0b25FbHMub2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmNoYW5nZVN0ZXAodGhpcy5jdXJyZW50U3RlcCArIDEpKTtcbiAgICAgICAgdGhpcy5idXR0b25FbHMuYmFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2hhbmdlU3RlcCgwKSk7XG5cbiAgICAgICAgLy8gbWVyaWRpZW0gc2VsZWN0IGV2ZW50c1xuICAgICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5tZXJpZGllbUVscy5zcGFucywgc3BhbiA9PiB7XG4gICAgICAgICAgICBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGhpcy5tZXJpZGllbVNlbGVjdEV2ZW50KGV2ZW50KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRpbWUgc2VsZWN0IGV2ZW50c1xuICAgICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy50aW1lRWxzLmhvdXJzLCBob3VyID0+IHtcbiAgICAgICAgICAgIGhvdXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lU2VsZWN0RXZlbnQoZXZlbnQsIHRoaXMuY2xvY2tFbHMuaG91cnMsIHRoaXMudGltZUVscy5ob3VycywgMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLnRpbWVFbHMubWludXRlcywgbWludXRlID0+IHtcbiAgICAgICAgICAgIG1pbnV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVTZWxlY3RFdmVudChldmVudCwgdGhpcy5jbG9ja0Vscy5taW51dGVzLCB0aGlzLnRpbWVFbHMubWludXRlcywgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLnRpbWVFbHMubWlsaXRhcnlIb3VycywgaG91ciA9PiB7XG4gICAgICAgICAgICBob3VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZVNlbGVjdEV2ZW50KGV2ZW50LCB0aGlzLmNsb2NrRWxzLm1pbGl0YXJ5SG91cnMsIHRoaXMudGltZUVscy5taWxpdGFyeUhvdXJzLCAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSBwaWNrZXIgaW4gdGhlIERPTVxuICAgICAqXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzaG93KCkge1xuICAgICAgICBjb25zdCBpc01pbGl0YXJ5Rm9ybWF0ID0gdGhpcy5pc01pbGl0YXJ5Rm9ybWF0KCk7XG5cbiAgICAgICAgLy8gYmx1ciBpbnB1dCB0byBwcmV2ZW50IG9uc2NyZWVuIGtleWJvYXJkIGZyb20gZGlzcGxheWluZ1xuICAgICAgICB0aGlzLmlucHV0RWwuYmx1cigpO1xuICAgICAgICB0aGlzLnRvZ2dsZUhvdXJzVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgdGhpcy50b2dnbGVNaW51dGVzVmlzaWJsZSgpO1xuICAgICAgICB0aGlzLnNldERpc3BsYXlUaW1lKHRoaXMuaXNNaWxpdGFyeUZvcm1hdCgpID8gJzAwJyA6ICcxMicsIDApO1xuICAgICAgICB0aGlzLnNldERpc3BsYXlUaW1lKCcwJywgMSk7XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5RWxzLm1lcmlkaWVtLnN0eWxlLmRpc3BsYXkgPSBpc01pbGl0YXJ5Rm9ybWF0ID8gJ25vbmUnIDogJ2lubGluZSc7XG4gICAgICAgIHRoaXMubWVyaWRpZW1FbHMud3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gaXNNaWxpdGFyeUZvcm1hdCA/ICdub25lJyA6ICdibG9jayc7XG4gICAgICAgIHRoaXMub3ZlcmxheUVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZSBmb3IgaW5wdXQgZm9jdXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IEV2ZW50IG9iamVjdCBwYXNzZWQgZnJvbSBsaXN0ZW5lclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2hvd0V2ZW50KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaW5wdXRFbCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSB0aGUgcGlja2VyIGluIHRoZSBET01cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5RWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy5pbnB1dEVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdibHVyJykpO1xuICAgICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIHRoZSBwaWNrZXIgZWxlbWVudCBvbiB0aGUgcGFnZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgRXZlbnQgb2JqZWN0IHBhc3NlZCBmcm9tIGV2ZW50IGxpc3RlbmVyIGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBoaWRlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gb25seSBhbGxvdyBldmVudCBiYXNlZCBjbG9zZSBpZiBldmVudC50YXJnZXQgY29udGFpbnMgb25lIG9mIHRoZXNlIGNsYXNzZXNcbiAgICAgICAgLy8gaGFjayB0byBwcmV2ZW50IG92ZXJsYXkgY2xvc2UgZXZlbnQgZnJvbSB0cmlnZ2VyaW5nIG9uIGFsbCBlbGVtZW50c1xuICAgICAgICBjb25zdCBhbGxvd2VkQ2xhc3NlcyA9IFsnbXRwLW92ZXJsYXknLCAnbXRwLWFjdGlvbnNfX2NhbmNlbCddO1xuICAgICAgICBjb25zdCBjbGFzc0xpc3QgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0O1xuXG4gICAgICAgIGFsbG93ZWRDbGFzc2VzLnNvbWUoYWxsb3dlZENsYXNzID0+IHtcbiAgICAgICAgICAgIGlmIChjbGFzc0xpc3QuY29udGFpbnMoYWxsb3dlZENsYXNzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldCBwaWNrZXIgc3RhdGUgdG8gZGVmYXVsdHNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgcmVzZXRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RlcCA9IDA7XG5cbiAgICAgICAgdGhpcy50b2dnbGVIb3Vyc1Zpc2libGUodHJ1ZSk7XG4gICAgICAgIHRoaXMudG9nZ2xlTWludXRlc1Zpc2libGUoKTtcbiAgICAgICAgdGhpcy50aW1lRWxzLmhvdXJzWzldLmNsaWNrKCk7XG4gICAgICAgIHRoaXMudGltZUVscy5taW51dGVzWzldLmNsaWNrKCk7XG4gICAgICAgIHRoaXMudGltZUVscy5taWxpdGFyeUhvdXJzWzldLmNsaWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBkaXNwbGF5ZWQgdGltZSwgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGZpbGwgaW5wdXQgdmFsdWUgb24gY29tcGxldGV0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgTmV3bHkgc2VsZWN0ZWQgdGltZSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXggSW5kZXggb2YgdmFsdWUgdG8gcmVwbGFjZSBbMCA9IGhvdXJzLCAxID0gbWludXRlc11cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNldERpc3BsYXlUaW1lKHZhbHVlLCBpbmRleCkge1xuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5kaXNwbGF5RWxzLnRpbWUuaW5uZXJIVE1MLnNwbGl0KCc6Jyk7XG5cbiAgICAgICAgLy8gcHJlcGVuZCB3aXRoIHplcm8gaWYgc2VsZWN0aW5nIG1pbnV0ZXMgYW5kIHZhbHVlIGlzIHNpbmdsZSBkaWdpdFxuICAgICAgICB0aW1lW2luZGV4XSA9IGluZGV4ID09PSAxICYmIHZhbHVlIDwgMTAgPyBgMCR7dmFsdWV9YCA6IHZhbHVlO1xuICAgICAgICBjb25zdCBuZXdUaW1lID0gdGltZS5qb2luKCc6Jyk7XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5RWxzLnRpbWUuaW5uZXJIVE1MID0gbmV3VGltZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSb3RhdGUgdGhlIGhhbmQgZWxlbWVudCB0byBzZWxlY3RlZCB0aW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG5vZGVJbmRleCBJbmRleCBvZiBhY3RpdmUgZWxlbWVudFxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgcm90YXRlSGFuZChub2RlSW5kZXggPSA5KSB7XG4gICAgICAgIC8vIHJvdGF0aW9uIGlzIGRvbmUgaW4gaW5jcmVtZW50cyBvZiAzMGRlZ1xuICAgICAgICAvLyBub2RlSW5kZXggMCBpcyAzIGVsZW1lbnRzIGJlaGluZCAwZGVnIHNvIHN1YnRyYWN0IDkwIGZyb20gdGhlIHN1bVxuICAgICAgICBjb25zdCByb3RhdGVEZWcgPSBub2RlSW5kZXggKiAzMCAtIDkwO1xuICAgICAgICBjb25zdCBzdHlsZVZhbCA9IGByb3RhdGUoJHtyb3RhdGVEZWd9ZGVnKWA7XG5cbiAgICAgICAgdGhpcy5jbG9ja0Vscy5oYW5kLnN0eWxlLnRyYW5zZm9ybSA9IHN0eWxlVmFsO1xuICAgICAgICB0aGlzLmNsb2NrRWxzLmhhbmQuc3R5bGVbJy13ZWJraXQtdHJhbnNmb3JtJ10gPSBzdHlsZVZhbDtcbiAgICAgICAgdGhpcy5jbG9ja0Vscy5oYW5kLnN0eWxlWyctbXMtdHJhbnNmb3JtJ10gPSBzdHlsZVZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgdG8gdGhlIHNwZWNpZmllZCBzdGVwXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IHN0ZXAgSW5kZXggb2Ygc3RlcCB0byBjaGFuZ2UgdG9cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGNoYW5nZVN0ZXAoc3RlcCkge1xuICAgICAgICBjb25zdCBob3VyRWxzID0gdGhpcy5pc01pbGl0YXJ5Rm9ybWF0KCkgPyB0aGlzLnRpbWVFbHMubWlsaXRhcnlIb3VycyA6IHRoaXMudGltZUVscy5ob3VycztcbiAgICAgICAgY29uc3QgbWludXRlRWxzID0gdGhpcy50aW1lRWxzLm1pbnV0ZXM7XG4gICAgICAgIGNvbnN0IGNoYW5nZVN0ZXBBY3Rpb24gPSBbXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVIb3Vyc1Zpc2libGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVNaW51dGVzVmlzaWJsZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucm90YXRlSGFuZCh0aGlzLmdldEFjdGl2ZUluZGV4KGhvdXJFbHMpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVIb3Vyc1Zpc2libGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZU1pbnV0ZXNWaXNpYmxlKHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMucm90YXRlSGFuZCh0aGlzLmdldEFjdGl2ZUluZGV4KG1pbnV0ZUVscykpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVTZWxlY3RlZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXVtzdGVwXTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRTdGVwID0gc3RlcDtcbiAgICAgICAgY2hhbmdlU3RlcEFjdGlvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBob3VyIChib3RoIG1pbGl0YXJ5IGFuZCBzdGFuZGFyZCkgY2xvY2sgdmlzaWJsaXR5IGluIERPTVxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc1Zpc2libGUgSXMgY2xvY2sgZmFjZSB0b2dnbGVkIHZpc2libGUgb3IgaGlkZGVuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB0b2dnbGVIb3Vyc1Zpc2libGUoaXNWaXNpYmxlID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgaXNNaWxpdGFyeUZvcm1hdCA9IHRoaXMuaXNNaWxpdGFyeUZvcm1hdCgpO1xuXG4gICAgICAgIHRoaXMuY2xvY2tFbHMuaG91cnMuc3R5bGUuZGlzcGxheSA9IGlzVmlzaWJsZSAmJiAhaXNNaWxpdGFyeUZvcm1hdCA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICAgIHRoaXMuY2xvY2tFbHMubWlsaXRhcnlIb3Vycy5zdHlsZS5kaXNwbGF5ID0gaXNWaXNpYmxlICYmIGlzTWlsaXRhcnlGb3JtYXQgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBtaW51dGUgY2xvY2sgdmlzaWJsaXR5IGluIERPTVxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc1Zpc2libGUgSXMgY2xvY2sgZmFjZSB0b2dnbGVkIHZpc2libGUgb3IgaGlkZGVuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB0b2dnbGVNaW51dGVzVmlzaWJsZShpc1Zpc2libGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNsb2NrRWxzLm1pbnV0ZXMuc3R5bGUuZGlzcGxheSA9IGlzVmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICAgIHRoaXMuYnV0dG9uRWxzLmJhY2suc3R5bGUuZGlzcGxheSA9IGlzVmlzaWJsZSA/ICdpbmxpbmUtYmxvY2snIDogJ25vbmUnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYWN0aXZlIHRpbWUgZWxlbWVudCBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gdGltZUVscyBDb2xsZWN0aW9uIG9mIHRpbWUgZWxlbWVudHMgdG8gZmluZCBhY3RpdmUgaW5cbiAgICAgKiBAcmV0dXJuIHtpbnRlZ2VyfSBBY3RpdmUgZWxlbWVudCBpbmRleFxuICAgICAqL1xuICAgIGdldEFjdGl2ZUluZGV4KHRpbWVFbHMpIHtcbiAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gMDtcblxuICAgICAgICBbXS5zb21lLmNhbGwodGltZUVscywgKHRpbWVFbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aW1lRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdtdHAtY2xvY2stLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGFjdGl2ZUluZGV4ID4gMTEgPyBhY3RpdmVJbmRleCAtIDEyIDogYWN0aXZlSW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHNlbGVjdGVkIHRpbWUgdG8gaW5wdXQgZWxlbWVudFxuICAgICAqXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB0aW1lU2VsZWN0ZWQoKSB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLmRpc3BsYXlFbHMudGltZS5pbm5lckhUTUw7XG4gICAgICAgIGNvbnN0IG1lcmlkaWVtID0gdGhpcy5pc01pbGl0YXJ5Rm9ybWF0KCkgPyAnJyA6IHRoaXMuZGlzcGxheUVscy5tZXJpZGllbS5pbm5lckhUTUw7XG5cbiAgICAgICAgdGhpcy5pbnB1dEVsLnZhbHVlID0gYCR7dGltZX0gJHttZXJpZGllbX1gO1xuICAgICAgICB0aGlzLmlucHV0RWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBhY3RpdmUgY2xvY2sgZmFjZSBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRhaW5lckVsIE5ldyBhY3RpdmUgZWxlbWVudHMgLnBhcmVudE5vZGVcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGFjdGl2ZUVsIEVsZW1lbnQgdG8gc2V0IGFjdGl2ZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2V0QWN0aXZlKGNvbnRhaW5lckVsLCBhY3RpdmVFbCkge1xuICAgICAgICBjb25zdCBhY3RpdmVDbGFzc05hbWUgPSAnbXRwLWNsb2NrLS1hY3RpdmUnO1xuICAgICAgICBjb25zdCBjdXJyZW50QWN0aXZlID0gY29udGFpbmVyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShhY3RpdmVDbGFzc05hbWUpWzBdO1xuXG4gICAgICAgIGN1cnJlbnRBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVDbGFzc05hbWUpO1xuICAgICAgICBhY3RpdmVFbC5jbGFzc0xpc3QuYWRkKGFjdGl2ZUNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWVyaWRpZW0gc2VsZWN0IGV2ZW50IGhhbmRsZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbmV0fSBldmVudCBFdmVudCBvYmplY3QgcGFzc2VkIGZyb20gbGlzdGVuZXJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIG1lcmlkaWVtU2VsZWN0RXZlbnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgY3VycmVudEFjdGl2ZSA9IHRoaXMubWVyaWRpZW1FbHMud3JhcHBlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtY2xvY2stLWFjdGl2ZScpWzBdO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQuaW5uZXJIVE1MO1xuXG4gICAgICAgIGlmIChlbGVtZW50ICE9PSBjdXJyZW50QWN0aXZlKSB7XG4gICAgICAgICAgICBjdXJyZW50QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ210cC1jbG9jay0tYWN0aXZlJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ210cC1jbG9jay0tYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlFbHMubWVyaWRpZW0uaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaW1lIHNlbGVjdCBldmVudCBoYW5kbGVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBFdmVudCBvYmplY3QgcGFzc2VkIGZyb20gbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXJFbCBFbGVtZW50IGNvbnRhaW5pbmcgdGltZSBsaXN0IGVsZW1lbnRzXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gbGlzdEVscyBDb2xsZWN0aW9uIG9mIGxpc3QgZWxlbWVudHNcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IGRpc3BsYXlJbmRleCBJbmRleCBhdCB3aGljaCBzZWxlY3RlZCB0aW1lIHNob3VsZCBkaXNwbGF5IFsxOiBob3VycywgMjogbWludXRlc11cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHRpbWVTZWxlY3RFdmVudChldmVudCwgY29udGFpbmVyRWwsIGxpc3RFbHMsIGRpc3BsYXlJbmRleCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCBuZXdBY3RpdmUgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgdGhpcy5zZXRBY3RpdmUoY29udGFpbmVyRWwsIG5ld0FjdGl2ZSk7XG4gICAgICAgIHRoaXMuc2V0RGlzcGxheVRpbWUobmV3QWN0aXZlLmlubmVySFRNTCwgZGlzcGxheUluZGV4KTtcbiAgICAgICAgdGhpcy5yb3RhdGVIYW5kKHRoaXMuZ2V0QWN0aXZlSW5kZXgobGlzdEVscykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHBpY2tlciBzZXQgdG8gbWlsaXRhcnkgdGltZSBtb2RlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBJcyBpbiBtaWxpdGFyeSB0aW1lIG1vZGVcbiAgICAgKi9cbiAgICBpc01pbGl0YXJ5Rm9ybWF0KCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmlucHV0RWwubXRwT3B0aW9ucy50aW1lRm9ybWF0ID09PSAnbWlsaXRhcnknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBwaWNrZXIgb2JqZWN0IGhhcyBhbHJlYWR5IHNldCBldmVudHMgb24gcGlja2VyIGVsZW1lbnRzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBIYXMgZXZlbnRzIGJlZW4gc2V0IG9uIHBpY2tlciBlbGVtZW50c1xuICAgICAqL1xuICAgIGhhc1NldEV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlckVsLmNsYXNzTGlzdC5jb250YWlucygnbXRwLWV2ZW50cy1zZXQnKTtcbiAgICB9XG59XG5cbi8vIE9iamVjdC5hc3NpZ24gcG9seWZpbGwgc28gYGJhYmVsL3BvbHlmaWxsYCBpcyBub3QgcmVxdWlyZWRcbmlmICghT2JqZWN0LmFzc2lnbikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsICdhc3NpZ24nLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogdGFyZ2V0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gT2JqZWN0KHRhcmdldCk7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09ICd1bmRlZmluZWQnIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGZpcnN0IGFyZ3VtZW50IHRvIG9iamVjdCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpbmMgPSAxOyBpbmMgPCBhcmd1bWVudHMubGVuZ3RoOyBpbmMgKz0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBuZXh0U291cmNlID0gYXJndW1lbnRzW2luY107XG5cbiAgICAgICAgICAgICAgICBpZiAobmV4dFNvdXJjZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmV4dFNvdXJjZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBuZXh0U291cmNlID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleXNBcnJheSA9IE9iamVjdC5rZXlzKG5leHRTb3VyY2UpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbmV4dEluZGV4ID0gMCwgbGVuID0ga2V5c0FycmF5Lmxlbmd0aDsgbmV4dEluZGV4IDwgbGVuOyBuZXh0SW5kZXggKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0S2V5ID0ga2V5c0FycmF5W25leHRJbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXNjICE9PSAndW5kZWZpbmVkJyAmJiBkZXNjLmVudW1lcmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRvO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG53aW5kb3cuVGltZVBpY2tlciA9IG5ldyBUaW1lUGlja2VyKCk7XG5leHBvcnQgZGVmYXVsdCBuZXcgVGltZVBpY2tlcigpO1xuIl19
