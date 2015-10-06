(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = "<div class=\"mtp-overlay\" style=\"display:none\"><div class=\"mtp-wrapper\"><div class=\"mtp-display\"> <span class=\"mtp-display__time\">12:00</span> <span class=\"mtp-display__meridiem\">am</span></div><div class=\"mtp-picker\"><div class=\"mtp-meridiem\"> <span class=\"mtp-clock--active\">am</span> <span>pm</span></div><div class=\"mtp-clock\"><div class=\"mtp-clock__center\"></div><div class=\"mtp-clock__hand\"></div><ul class=\"mtp-clock__time mtp-clock__outer mtp-clock__hours\" style=\"display:none\"><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li class=\"mtp-clock--active\">12</li><li>1</li><li>2</li></ul><ul class=\"mtp-clock__time mtp-clock__outer mtp-clock__minutes\" style=\"display:none\"><li>15</li><li>20</li><li>25</li><li>30</li><li>35</li><li>40</li><li>45</li><li>50</li><li>55</li><li class=\"mtp-clock--active\">0</li><li>5</li><li>10</li></ul><ul class=\"mtp-clock__time mtp-clock__hours-military\" style=\"display:none\"><div class=\"mtp-clock__inner\"><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li class=\"mtp-clock--active\">00</li><li>1</li><li>2</li></div><div class=\"mtp-clock__outer\"><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li>21</li><li>22</li><li>23</li><li>12</li><li>13</li><li>14</li></div></ul></div><div class=\"mtp-actions\"> <button type=\"button\" class=\"mtp-actions__button mtp-actions__cancel\">Cancel</button> <button type=\"button\" class=\"mtp-actions__button mtp-actions__back\" style=\"display:none\">Back</button> <button type=\"button\" class=\"mtp-actions__button mtp-actions__ok\">OK</button></div></div></div></div>";

},{}],2:[function(require,module,exports){
/**
 * Object.assign polyfill
 *
 * @param {object} target Target object to merge properties onto
 * @param {...object} sources  Source object to merge properties from
 * @return {object} Target object with merged properties
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
function assign(target) {
    var to = Object(target);

    if (target === 'undefined' || target === null) {
        throw new TypeError('Cannot convert first argument to object');
    }

    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
    }

    for (var inc = 1; inc < sources.length; inc += 1) {
        var nextSource = sources[inc];

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

exports['default'] = assign;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _htmlTimepickerHtml = require('../html/timepicker.html');

var _htmlTimepickerHtml2 = _interopRequireDefault(_htmlTimepickerHtml);

var _assign = require('./assign');

var _assign2 = _interopRequireDefault(_assign);

var TimePicker = (function () {

    /**
     * Initialize new TimePicker instance
     *
     * @return {TimePicker} New TimePicker instance
     */

    function TimePicker() {
        _classCallCheck(this, TimePicker);

        this.template = _htmlTimepickerHtml2['default'];
        this.setupTemplate();
        this.currentStep = 0;
        this.defaultOptions = {};
        // `standard` or `military` display hours
        this.defaultOptions.timeFormat = 'standard';
        this.cachedEls = {};
        this.cachedEls.overlay = document.getElementsByClassName('mtp-overlay')[0];
        this.cachedEls.wrapper = this.cachedEls.overlay.getElementsByClassName('mtp-wrapper')[0];
        this.cachedEls.picker = this.cachedEls.wrapper.getElementsByClassName('mtp-picker')[0];
        this.cachedEls.meridiem = this.cachedEls.wrapper.getElementsByClassName('mtp-meridiem')[0];
        this.cachedEls.meridiemSpans = this.cachedEls.meridiem.getElementsByTagName('span');
        this.cachedEls.displayTime = this.cachedEls.wrapper.getElementsByClassName('mtp-display__time')[0];
        this.cachedEls.displayMeridiem = this.cachedEls.wrapper.getElementsByClassName('mtp-display__meridiem')[0];
        this.cachedEls.buttonCancel = this.cachedEls.picker.getElementsByClassName('mtp-actions__cancel')[0];
        this.cachedEls.buttonBack = this.cachedEls.picker.getElementsByClassName('mtp-actions__back')[0];
        this.cachedEls.buttonOk = this.cachedEls.picker.getElementsByClassName('mtp-actions__ok')[0];
        this.cachedEls.clockHours = this.cachedEls.picker.getElementsByClassName('mtp-clock__hours')[0];
        this.cachedEls.clockMinutes = this.cachedEls.picker.getElementsByClassName('mtp-clock__minutes')[0];
        this.cachedEls.clockMilitaryHours = this.cachedEls.picker.getElementsByClassName('mtp-clock__hours-military')[0];
        this.cachedEls.clockHand = this.cachedEls.picker.getElementsByClassName('mtp-clock__hand')[0];
        this.cachedEls.clockHoursLi = this.cachedEls.clockHours.getElementsByTagName('li');
        this.cachedEls.clockMinutesLi = this.cachedEls.clockMinutes.getElementsByTagName('li');
        this.cachedEls.clockMilitaryHoursLi = this.cachedEls.clockMilitaryHours.getElementsByTagName('li');

        this.setEvents();

        return this;
    }

    /**
     * Setup the template in DOM if not already
     *
     * @return {void}
     */

    _createClass(TimePicker, [{
        key: 'setupTemplate',
        value: function setupTemplate() {
            if (!this.isTemplateInDOM()) {
                document.body.insertAdjacentHTML('beforeend', _htmlTimepickerHtml2['default']);
            }
        }

        /**
         * Bind event to the input element to open when `focus` event is triggered
         *
         * @param {string|HTMLElement} inputEl Selector element to be queried or existing HTMLElement
         * @param {object} options Options to merged with defaults and set to input element object
         * @return {void}
         */
    }, {
        key: 'bindInput',
        value: function bindInput(inputEl) {
            var _this = this;

            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var element = inputEl instanceof HTMLElement ? inputEl : document.querySelector(inputEl);

            element.mtpOptions = (0, _assign2['default'])({}, this.defaultOptions, options);
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
            this.inputEl.mtpOptions = (0, _assign2['default'])({}, this.defaultOptions, options);
            this.show();
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

            if (!this.hasSetEvents()) {
                // close
                this.cachedEls.overlay.addEventListener('click', function (event) {
                    return _this2.hideEvent(event);
                });
                this.cachedEls.buttonCancel.addEventListener('click', function (event) {
                    return _this2.hideEvent(event);
                });

                // next/prev step actions
                this.cachedEls.buttonOk.addEventListener('click', function () {
                    return _this2.changeStep(_this2.currentStep + 1);
                });
                this.cachedEls.buttonBack.addEventListener('click', function () {
                    return _this2.changeStep(0);
                });

                // meridiem select events
                [].forEach.call(this.cachedEls.meridiemSpans, function (span) {
                    span.addEventListener('click', function (event) {
                        return _this2.meridiemSelectEvent(event);
                    });
                });

                // time select events
                [].forEach.call(this.cachedEls.clockHoursLi, function (hour) {
                    hour.addEventListener('click', function (event) {
                        _this2.timeSelectEvent(event, _this2.cachedEls.clockHours, _this2.cachedEls.clockHoursLi, 0);
                    });
                });
                [].forEach.call(this.cachedEls.clockMinutesLi, function (minute) {
                    minute.addEventListener('click', function (event) {
                        _this2.timeSelectEvent(event, _this2.cachedEls.clockMinutes, _this2.cachedEls.clockMinutesLi, 1);
                    });
                });
                [].forEach.call(this.cachedEls.clockMilitaryHoursLi, function (hour) {
                    hour.addEventListener('click', function (event) {
                        _this2.timeSelectEvent(event, _this2.cachedEls.clockMilitaryHours, _this2.cachedEls.clockMilitaryHoursLi, 0);
                    });
                });
                this.cachedEls.wrapper.classList.add('mtp-events-set');
            }
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

            this.cachedEls.displayMeridiem.style.display = isMilitaryFormat ? 'none' : 'inline';
            this.cachedEls.meridiem.style.display = isMilitaryFormat ? 'none' : 'block';
            this.cachedEls.overlay.style.display = 'block';
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
            this.cachedEls.overlay.style.display = 'none';
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
            this.cachedEls.clockHoursLi[9].click();
            this.cachedEls.clockMinutesLi[9].click();
            this.cachedEls.clockMilitaryHoursLi[9].click();
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
            var time = this.cachedEls.displayTime.innerHTML.split(':');

            // prepend with zero if selecting minutes and value is single digit
            time[index] = index === 1 && value < 10 ? '0' + value : value;
            var newTime = time.join(':');

            this.cachedEls.displayTime.innerHTML = newTime;
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

            this.cachedEls.clockHand.style.transform = styleVal;
            this.cachedEls.clockHand.style['-webkit-transform'] = styleVal;
            this.cachedEls.clockHand.style['-ms-transform'] = styleVal;
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

            var hourEls = this.isMilitaryFormat() ? this.cachedEls.clockMilitaryHoursLi : this.cachedEls.clockHoursLi;
            var minuteEls = this.cachedEls.clockMinutesLi;
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

            this.cachedEls.clockHours.style.display = isVisible && !isMilitaryFormat ? 'block' : 'none';
            this.cachedEls.clockMilitaryHours.style.display = isVisible && isMilitaryFormat ? 'block' : 'none';
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

            this.cachedEls.clockMinutes.style.display = isVisible ? 'block' : 'none';
            this.cachedEls.buttonBack.style.display = isVisible ? 'inline-block' : 'none';
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
            var time = this.cachedEls.displayTime.innerHTML;
            var meridiem = this.isMilitaryFormat() ? '' : this.cachedEls.displayMeridiem.innerHTML;

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
            var currentActive = this.cachedEls.meridiem.getElementsByClassName('mtp-clock--active')[0];
            var value = element.innerHTML;

            if (element !== currentActive) {
                currentActive.classList.remove('mtp-clock--active');
                element.classList.add('mtp-clock--active');
                this.cachedEls.displayMeridiem.innerHTML = value;
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
            return this.cachedEls.wrapper.classList.contains('mtp-events-set');
        }

        /**
         * Check if template has already been appended to DOM
         *
         * @return {boolean} Is template in DOM
         */
    }, {
        key: 'isTemplateInDOM',
        value: function isTemplateInDOM() {
            return Boolean(document.getElementsByClassName('mtp-overlay')[0]);
        }
    }]);

    return TimePicker;
})();

window.TimePicker = TimePicker;
exports['default'] = TimePicker;
module.exports = exports['default'];

},{"../html/timepicker.html":1,"./assign":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaHRtbC90aW1lcGlja2VyLmh0bWwiLCIvdmFyL3d3dy9qcy1tb2R1bGVzL3RpbWVwaWNrZXIvc3JjL2pzL2Fzc2lnbi5qcyIsIi92YXIvd3d3L2pzLW1vZHVsZXMvdGltZXBpY2tlci9zcmMvanMvdGltZXBpY2tlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTUEsU0FBUyxNQUFNLENBQUMsTUFBTSxFQUFjO0FBQ2hDLFFBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFMUIsUUFBSSxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFDM0MsY0FBTSxJQUFJLFNBQVMsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0tBQ2xFOztzQ0FMc0IsT0FBTztBQUFQLGVBQU87OztBQU85QixTQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFO0FBQzlDLFlBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFOUIsWUFBSSxVQUFVLEtBQUssV0FBVyxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFDbkQscUJBQVM7U0FDWjs7QUFFRCxrQkFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNoQyxZQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUUxQyxhQUFLLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLEdBQUcsR0FBRyxFQUFFLFNBQVMsSUFBSSxDQUFDLEVBQUU7QUFDN0UsZ0JBQU0sT0FBTyxHQUFH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bUJBQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQztTQUNyRTs7Ozs7Ozs7O2VBT1csd0JBQUc7QUFDWCxtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdEU7Ozs7Ozs7OztlQU9jLDJCQUFHO0FBQ2QsbUJBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JFOzs7V0F4WUMsVUFBVTs7O0FBMlloQixNQUFNLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztxQkFDaEIsVUFBVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwibXRwLW92ZXJsYXlcXFwiIHN0eWxlPVxcXCJkaXNwbGF5Om5vbmVcXFwiPjxkaXYgY2xhc3M9XFxcIm10cC13cmFwcGVyXFxcIj48ZGl2IGNsYXNzPVxcXCJtdHAtZGlzcGxheVxcXCI+IDxzcGFuIGNsYXNzPVxcXCJtdHAtZGlzcGxheV9fdGltZVxcXCI+MTI6MDA8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJtdHAtZGlzcGxheV9fbWVyaWRpZW1cXFwiPmFtPC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm10cC1waWNrZXJcXFwiPjxkaXYgY2xhc3M9XFxcIm10cC1tZXJpZGllbVxcXCI+IDxzcGFuIGNsYXNzPVxcXCJtdHAtY2xvY2stLWFjdGl2ZVxcXCI+YW08L3NwYW4+IDxzcGFuPnBtPC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm10cC1jbG9ja1xcXCI+PGRpdiBjbGFzcz1cXFwibXRwLWNsb2NrX19jZW50ZXJcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm10cC1jbG9ja19faGFuZFxcXCI+PC9kaXY+PHVsIGNsYXNzPVxcXCJtdHAtY2xvY2tfX3RpbWUgbXRwLWNsb2NrX19vdXRlciBtdHAtY2xvY2tfX2hvdXJzXFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lXFxcIj48bGk+MzwvbGk+PGxpPjQ8L2xpPjxsaT41PC9saT48bGk+NjwvbGk+PGxpPjc8L2xpPjxsaT44PC9saT48bGk+OTwvbGk+PGxpPjEwPC9saT48bGk+MTE8L2xpPjxsaSBjbGFzcz1cXFwibXRwLWNsb2NrLS1hY3RpdmVcXFwiPjEyPC9saT48bGk+MTwvbGk+PGxpPjI8L2xpPjwvdWw+PHVsIGNsYXNzPVxcXCJtdHAtY2xvY2tfX3RpbWUgbXRwLWNsb2NrX19vdXRlciBtdHAtY2xvY2tfX21pbnV0ZXNcXFwiIHN0eWxlPVxcXCJkaXNwbGF5Om5vbmVcXFwiPjxsaT4xNTwvbGk+PGxpPjIwPC9saT48bGk+MjU8L2xpPjxsaT4zMDwvbGk+PGxpPjM1PC9saT48bGk+NDA8L2xpPjxsaT40NTwvbGk+PGxpPjUwPC9saT48bGk+NTU8L2xpPjxsaSBjbGFzcz1cXFwibXRwLWNsb2NrLS1hY3RpdmVcXFwiPjA8L2xpPjxsaT41PC9saT48bGk+MTA8L2xpPjwvdWw+PHVsIGNsYXNzPVxcXCJtdHAtY2xvY2tfX3RpbWUgbXRwLWNsb2NrX19ob3Vycy1taWxpdGFyeVxcXCIgc3R5bGU9XFxcImRpc3BsYXk6bm9uZVxcXCI+PGRpdiBjbGFzcz1cXFwibXRwLWNsb2NrX19pbm5lclxcXCI+PGxpPjM8L2xpPjxsaT40PC9saT48bGk+NTwvbGk+PGxpPjY8L2xpPjxsaT43PC9saT48bGk+ODwvbGk+PGxpPjk8L2xpPjxsaT4xMDwvbGk+PGxpPjExPC9saT48bGkgY2xhc3M9XFxcIm10cC1jbG9jay0tYWN0aXZlXFxcIj4wMDwvbGk+PGxpPjE8L2xpPjxsaT4yPC9saT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtdHAtY2xvY2tfX291dGVyXFxcIj48bGk+MTU8L2xpPjxsaT4xNjwvbGk+PGxpPjE3PC9saT48bGk+MTg8L2xpPjxsaT4xOTwvbGk+PGxpPjIwPC9saT48bGk+MjE8L2xpPjxsaT4yMjwvbGk+PGxpPjIzPC9saT48bGk+MTI8L2xpPjxsaT4xMzwvbGk+PGxpPjE0PC9saT48L2Rpdj48L3VsPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm10cC1hY3Rpb25zXFxcIj4gPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJtdHAtYWN0aW9uc19fYnV0dG9uIG10cC1hY3Rpb25zX19jYW5jZWxcXFwiPkNhbmNlbDwvYnV0dG9uPiA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcIm10cC1hY3Rpb25zX19idXR0b24gbXRwLWFjdGlvbnNfX2JhY2tcXFwiIHN0eWxlPVxcXCJkaXNwbGF5Om5vbmVcXFwiPkJhY2s8L2J1dHRvbj4gPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJtdHAtYWN0aW9uc19fYnV0dG9uIG10cC1hY3Rpb25zX19va1xcXCI+T0s8L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIjtcbiIsIi8qKlxuICogT2JqZWN0LmFzc2lnbiBwb2x5ZmlsbFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdCB0byBtZXJnZSBwcm9wZXJ0aWVzIG9udG9cbiAqIEBwYXJhbSB7Li4ub2JqZWN0fSBzb3VyY2VzICBTb3VyY2Ugb2JqZWN0IHRvIG1lcmdlIHByb3BlcnRpZXMgZnJvbVxuICogQHJldHVybiB7b2JqZWN0fSBUYXJnZXQgb2JqZWN0IHdpdGggbWVyZ2VkIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgLi4uc291cmNlcykge1xuICAgIGNvbnN0IHRvID0gT2JqZWN0KHRhcmdldCk7XG5cbiAgICBpZiAodGFyZ2V0ID09PSAndW5kZWZpbmVkJyB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaW5jID0gMTsgaW5jIDwgc291cmNlcy5sZW5ndGg7IGluYyArPSAxKSB7XG4gICAgICAgIGxldCBuZXh0U291cmNlID0gc291cmNlc1tpbmNdO1xuXG4gICAgICAgIGlmIChuZXh0U291cmNlID09PSAndW5kZWZpbmVkJyB8fCBuZXh0U291cmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5leHRTb3VyY2UgPSBPYmplY3QobmV4dFNvdXJjZSk7XG4gICAgICAgIGNvbnN0IGtleXNBcnJheSA9IE9iamVjdC5rZXlzKG5leHRTb3VyY2UpO1xuXG4gICAgICAgIGZvciAobGV0IG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4ICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRLZXkgPSBrZXlzQXJyYXlbbmV4dEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xuXG4gICAgICAgICAgICBpZiAoZGVzYyAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVzYy5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ247XG4iLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vaHRtbC90aW1lcGlja2VyLmh0bWwnO1xuaW1wb3J0IGFzc2lnbiBmcm9tICcuL2Fzc2lnbic7XG5cbmNsYXNzIFRpbWVQaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBuZXcgVGltZVBpY2tlciBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHJldHVybiB7VGltZVBpY2tlcn0gTmV3IFRpbWVQaWNrZXIgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgICAgICB0aGlzLnNldHVwVGVtcGxhdGUoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RlcCA9IDA7XG4gICAgICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSB7fTtcbiAgICAgICAgLy8gYHN0YW5kYXJkYCBvciBgbWlsaXRhcnlgIGRpc3BsYXkgaG91cnNcbiAgICAgICAgdGhpcy5kZWZhdWx0T3B0aW9ucy50aW1lRm9ybWF0ID0gJ3N0YW5kYXJkJztcbiAgICAgICAgdGhpcy5jYWNoZWRFbHMgPSB7fTtcbiAgICAgICAgdGhpcy5jYWNoZWRFbHMub3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1vdmVybGF5JylbMF07XG4gICAgICAgIHRoaXMuY2FjaGVkRWxzLndyYXBwZXIgPSB0aGlzLmNhY2hlZEVscy5vdmVybGF5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC13cmFwcGVyJylbMF07XG4gICAgICAgIHRoaXMuY2FjaGVkRWxzLnBpY2tlciA9IHRoaXMuY2FjaGVkRWxzLndyYXBwZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLXBpY2tlcicpWzBdO1xuICAgICAgICB0aGlzLmNhY2hlZEVscy5tZXJpZGllbSA9IHRoaXMuY2FjaGVkRWxzLndyYXBwZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLW1lcmlkaWVtJylbMF07XG4gICAgICAgIHRoaXMuY2FjaGVkRWxzLm1lcmlkaWVtU3BhbnMgPSB0aGlzLmNhY2hlZEVscy5tZXJpZGllbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpO1xuICAgICAgICB0aGlzLmNhY2hlZEVscy5kaXNwbGF5VGltZSA9IHRoaXMuY2FjaGVkRWxzLndyYXBwZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXRwLWRpc3BsYXlfX3RpbWUnKVswXTtcbiAgICAgICAgdGhpcy5jYWNoZWRFbHMuZGlzcGxheU1lcmlkaWVtID0gdGhpcy5jYWNoZWRFbHMud3JhcHBlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtZGlzcGxheV9fbWVyaWRpZW0nKVswXTtcbiAgICAgICAgdGhpcy5jYWNoZWRFbHMuYnV0dG9uQ2FuY2VsID0gdGhpcy5jYWNoZWRFbHMucGlja2VyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1hY3Rpb25zX19jYW5jZWwnKVswXTtcbiAgICAgICAgdGhpcy5jYWNoZWRFbHMuYnV0dG9uQmFjayA9IHRoaXMuY2FjaGVkRWxzLnBpY2tlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtYWN0aW9uc19fYmFjaycpWzBdO1xuICAgICAgICB0aGlzLmNhY2hlZEVscy5idXR0b25PayA9IHRoaXMuY2FjaGVkRWxzLnBpY2tlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtYWN0aW9uc19fb2snKVswXTtcbiAgICAgICAgdGhpcy5jYWNoZWRFbHMuY2xvY2tIb3VycyA9IHRoaXMuY2FjaGVkRWxzLnBpY2tlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtY2xvY2tfX2hvdXJzJylbMF07XG4gICAgICAgIHRoaXMuY2FjaGVkRWxzLmNsb2NrTWludXRlcyA9IHRoaXMuY2FjaGVkRWxzLnBpY2tlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtY2xvY2tfX21pbnV0ZXMnKVswXTtcbiAgICAgICAgdGhpcy5jYWNoZWRFbHMuY2xvY2tNaWxpdGFyeUhvdXJzID0gdGhpcy5jYWNoZWRFbHMucGlja2VyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1jbG9ja19faG91cnMtbWlsaXRhcnknKVswXTtcbiAgICAgICAgdGhpcy5jYWNoZWRFbHMuY2xvY2tIYW5kID0gdGhpcy5jYWNoZWRFbHMucGlja2VyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1jbG9ja19faGFuZCcpWzBdO1xuICAgICAgICB0aGlzLmNhY2hlZEVscy5jbG9ja0hvdXJzTGkgPSB0aGlzLmNhY2hlZEVscy5jbG9ja0hvdXJzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaScpO1xuICAgICAgICB0aGlzLmNhY2hlZEVscy5jbG9ja01pbnV0ZXNMaSA9IHRoaXMuY2FjaGVkRWxzLmNsb2NrTWludXRlcy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKTtcbiAgICAgICAgdGhpcy5jYWNoZWRFbHMuY2xvY2tNaWxpdGFyeUhvdXJzTGkgPSB0aGlzLmNhY2hlZEVscy5jbG9ja01pbGl0YXJ5SG91cnMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyk7XG5cbiAgICAgICAgdGhpcy5zZXRFdmVudHMoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgdGVtcGxhdGUgaW4gRE9NIGlmIG5vdCBhbHJlYWR5XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNldHVwVGVtcGxhdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1RlbXBsYXRlSW5ET00oKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJpbmQgZXZlbnQgdG8gdGhlIGlucHV0IGVsZW1lbnQgdG8gb3BlbiB3aGVuIGBmb2N1c2AgZXZlbnQgaXMgdHJpZ2dlcmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudH0gaW5wdXRFbCBTZWxlY3RvciBlbGVtZW50IHRvIGJlIHF1ZXJpZWQgb3IgZXhpc3RpbmcgSFRNTEVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPcHRpb25zIHRvIG1lcmdlZCB3aXRoIGRlZmF1bHRzIGFuZCBzZXQgdG8gaW5wdXQgZWxlbWVudCBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGJpbmRJbnB1dChpbnB1dEVsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGlucHV0RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA/IGlucHV0RWwgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlucHV0RWwpO1xuXG4gICAgICAgIGVsZW1lbnQubXRwT3B0aW9ucyA9IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBldmVudCA9PiB0aGlzLnNob3dFdmVudChldmVudCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gcGlja2VyIHdpdGggdGhlIGlucHV0IHByb3ZpZGVkIGluIGNvbnRleHQgd2l0aG91dCBiaW5kaW5nIGV2ZW50c1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR9IGlucHV0RWwgU2VsZWN0b3IgZWxlbWVudCB0byBiZSBxdWVyaWVkIG9yIGV4aXN0aW5nIEhUTUxFbGVtZW50XG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT3B0aW9ucyB0byBtZXJnZWQgd2l0aCBkZWZhdWx0cyBhbmQgc2V0IHRvIGlucHV0IGVsZW1lbnQgb2JqZWN0XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBvcGVuT25JbnB1dChpbnB1dEVsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5pbnB1dEVsID0gaW5wdXRFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gaW5wdXRFbCA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaW5wdXRFbCk7XG4gICAgICAgIHRoaXMuaW5wdXRFbC5tdHBPcHRpb25zID0gYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBldmVudHMgb24gcGlja2VyIGVsZW1lbnRzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNldEV2ZW50cygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc1NldEV2ZW50cygpKSB7XG4gICAgICAgICAgICAvLyBjbG9zZVxuICAgICAgICAgICAgdGhpcy5jYWNoZWRFbHMub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRoaXMuaGlkZUV2ZW50KGV2ZW50KSk7XG4gICAgICAgICAgICB0aGlzLmNhY2hlZEVscy5idXR0b25DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0aGlzLmhpZGVFdmVudChldmVudCkpO1xuXG4gICAgICAgICAgICAvLyBuZXh0L3ByZXYgc3RlcCBhY3Rpb25zXG4gICAgICAgICAgICB0aGlzLmNhY2hlZEVscy5idXR0b25Pay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2hhbmdlU3RlcCh0aGlzLmN1cnJlbnRTdGVwICsgMSkpO1xuICAgICAgICAgICAgdGhpcy5jYWNoZWRFbHMuYnV0dG9uQmFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2hhbmdlU3RlcCgwKSk7XG5cbiAgICAgICAgICAgIC8vIG1lcmlkaWVtIHNlbGVjdCBldmVudHNcbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLmNhY2hlZEVscy5tZXJpZGllbVNwYW5zLCBzcGFuID0+IHtcbiAgICAgICAgICAgICAgICBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGhpcy5tZXJpZGllbVNlbGVjdEV2ZW50KGV2ZW50KSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gdGltZSBzZWxlY3QgZXZlbnRzXG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5jYWNoZWRFbHMuY2xvY2tIb3Vyc0xpLCBob3VyID0+IHtcbiAgICAgICAgICAgICAgICBob3VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVTZWxlY3RFdmVudChldmVudCwgdGhpcy5jYWNoZWRFbHMuY2xvY2tIb3VycywgdGhpcy5jYWNoZWRFbHMuY2xvY2tIb3Vyc0xpLCAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMuY2FjaGVkRWxzLmNsb2NrTWludXRlc0xpLCBtaW51dGUgPT4ge1xuICAgICAgICAgICAgICAgIG1pbnV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lU2VsZWN0RXZlbnQoZXZlbnQsIHRoaXMuY2FjaGVkRWxzLmNsb2NrTWludXRlcywgdGhpcy5jYWNoZWRFbHMuY2xvY2tNaW51dGVzTGksIDEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5jYWNoZWRFbHMuY2xvY2tNaWxpdGFyeUhvdXJzTGksIGhvdXIgPT4ge1xuICAgICAgICAgICAgICAgIGhvdXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZVNlbGVjdEV2ZW50KGV2ZW50LCB0aGlzLmNhY2hlZEVscy5jbG9ja01pbGl0YXJ5SG91cnMsIHRoaXMuY2FjaGVkRWxzLmNsb2NrTWlsaXRhcnlIb3Vyc0xpLCAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5jYWNoZWRFbHMud3JhcHBlci5jbGFzc0xpc3QuYWRkKCdtdHAtZXZlbnRzLXNldCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyB0aGUgcGlja2VyIGluIHRoZSBET01cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2hvdygpIHtcbiAgICAgICAgY29uc3QgaXNNaWxpdGFyeUZvcm1hdCA9IHRoaXMuaXNNaWxpdGFyeUZvcm1hdCgpO1xuXG4gICAgICAgIC8vIGJsdXIgaW5wdXQgdG8gcHJldmVudCBvbnNjcmVlbiBrZXlib2FyZCBmcm9tIGRpc3BsYXlpbmdcbiAgICAgICAgdGhpcy5pbnB1dEVsLmJsdXIoKTtcbiAgICAgICAgdGhpcy50b2dnbGVIb3Vyc1Zpc2libGUodHJ1ZSk7XG4gICAgICAgIHRoaXMudG9nZ2xlTWludXRlc1Zpc2libGUoKTtcbiAgICAgICAgdGhpcy5zZXREaXNwbGF5VGltZSh0aGlzLmlzTWlsaXRhcnlGb3JtYXQoKSA/ICcwMCcgOiAnMTInLCAwKTtcbiAgICAgICAgdGhpcy5zZXREaXNwbGF5VGltZSgnMCcsIDEpO1xuXG4gICAgICAgIHRoaXMuY2FjaGVkRWxzLmRpc3BsYXlNZXJpZGllbS5zdHlsZS5kaXNwbGF5ID0gaXNNaWxpdGFyeUZvcm1hdCA/ICdub25lJyA6ICdpbmxpbmUnO1xuICAgICAgICB0aGlzLmNhY2hlZEVscy5tZXJpZGllbS5zdHlsZS5kaXNwbGF5ID0gaXNNaWxpdGFyeUZvcm1hdCA/ICdub25lJyA6ICdibG9jayc7XG4gICAgICAgIHRoaXMuY2FjaGVkRWxzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlIGZvciBpbnB1dCBmb2N1c1xuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgRXZlbnQgb2JqZWN0IHBhc3NlZCBmcm9tIGxpc3RlbmVyXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzaG93RXZlbnQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pbnB1dEVsID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIHRoZSBwaWNrZXIgaW4gdGhlIERPTVxuICAgICAqXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmNhY2hlZEVscy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuaW5wdXRFbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnYmx1cicpKTtcbiAgICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSB0aGUgcGlja2VyIGVsZW1lbnQgb24gdGhlIHBhZ2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IEV2ZW50IG9iamVjdCBwYXNzZWQgZnJvbSBldmVudCBsaXN0ZW5lciBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgaGlkZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIC8vIG9ubHkgYWxsb3cgZXZlbnQgYmFzZWQgY2xvc2UgaWYgZXZlbnQudGFyZ2V0IGNvbnRhaW5zIG9uZSBvZiB0aGVzZSBjbGFzc2VzXG4gICAgICAgIC8vIGhhY2sgdG8gcHJldmVudCBvdmVybGF5IGNsb3NlIGV2ZW50IGZyb20gdHJpZ2dlcmluZyBvbiBhbGwgZWxlbWVudHNcbiAgICAgICAgY29uc3QgYWxsb3dlZENsYXNzZXMgPSBbJ210cC1vdmVybGF5JywgJ210cC1hY3Rpb25zX19jYW5jZWwnXTtcbiAgICAgICAgY29uc3QgY2xhc3NMaXN0ID0gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdDtcblxuICAgICAgICBhbGxvd2VkQ2xhc3Nlcy5zb21lKGFsbG93ZWRDbGFzcyA9PiB7XG4gICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKGFsbG93ZWRDbGFzcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgcGlja2VyIHN0YXRlIHRvIGRlZmF1bHRzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHJlc2V0U3RhdGUoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0ZXAgPSAwO1xuXG4gICAgICAgIHRoaXMudG9nZ2xlSG91cnNWaXNpYmxlKHRydWUpO1xuICAgICAgICB0aGlzLnRvZ2dsZU1pbnV0ZXNWaXNpYmxlKCk7XG4gICAgICAgIHRoaXMuY2FjaGVkRWxzLmNsb2NrSG91cnNMaVs5XS5jbGljaygpO1xuICAgICAgICB0aGlzLmNhY2hlZEVscy5jbG9ja01pbnV0ZXNMaVs5XS5jbGljaygpO1xuICAgICAgICB0aGlzLmNhY2hlZEVscy5jbG9ja01pbGl0YXJ5SG91cnNMaVs5XS5jbGljaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZGlzcGxheWVkIHRpbWUsIHdoaWNoIHdpbGwgYmUgdXNlZCB0byBmaWxsIGlucHV0IHZhbHVlIG9uIGNvbXBsZXRldGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIE5ld2x5IHNlbGVjdGVkIHRpbWUgdmFsdWVcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IGluZGV4IEluZGV4IG9mIHZhbHVlIHRvIHJlcGxhY2UgWzAgPSBob3VycywgMSA9IG1pbnV0ZXNdXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZXREaXNwbGF5VGltZSh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgY29uc3QgdGltZSA9IHRoaXMuY2FjaGVkRWxzLmRpc3BsYXlUaW1lLmlubmVySFRNTC5zcGxpdCgnOicpO1xuXG4gICAgICAgIC8vIHByZXBlbmQgd2l0aCB6ZXJvIGlmIHNlbGVjdGluZyBtaW51dGVzIGFuZCB2YWx1ZSBpcyBzaW5nbGUgZGlnaXRcbiAgICAgICAgdGltZVtpbmRleF0gPSBpbmRleCA9PT0gMSAmJiB2YWx1ZSA8IDEwID8gYDAke3ZhbHVlfWAgOiB2YWx1ZTtcbiAgICAgICAgY29uc3QgbmV3VGltZSA9IHRpbWUuam9pbignOicpO1xuXG4gICAgICAgIHRoaXMuY2FjaGVkRWxzLmRpc3BsYXlUaW1lLmlubmVySFRNTCA9IG5ld1RpbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUm90YXRlIHRoZSBoYW5kIGVsZW1lbnQgdG8gc2VsZWN0ZWQgdGltZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtpbnRlZ2VyfSBub2RlSW5kZXggSW5kZXggb2YgYWN0aXZlIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHJvdGF0ZUhhbmQobm9kZUluZGV4ID0gOSkge1xuICAgICAgICAvLyByb3RhdGlvbiBpcyBkb25lIGluIGluY3JlbWVudHMgb2YgMzBkZWdcbiAgICAgICAgLy8gbm9kZUluZGV4IDAgaXMgMyBlbGVtZW50cyBiZWhpbmQgMGRlZyBzbyBzdWJ0cmFjdCA5MCBmcm9tIHRoZSBzdW1cbiAgICAgICAgY29uc3Qgcm90YXRlRGVnID0gbm9kZUluZGV4ICogMzAgLSA5MDtcbiAgICAgICAgY29uc3Qgc3R5bGVWYWwgPSBgcm90YXRlKCR7cm90YXRlRGVnfWRlZylgO1xuXG4gICAgICAgIHRoaXMuY2FjaGVkRWxzLmNsb2NrSGFuZC5zdHlsZS50cmFuc2Zvcm0gPSBzdHlsZVZhbDtcbiAgICAgICAgdGhpcy5jYWNoZWRFbHMuY2xvY2tIYW5kLnN0eWxlWyctd2Via2l0LXRyYW5zZm9ybSddID0gc3R5bGVWYWw7XG4gICAgICAgIHRoaXMuY2FjaGVkRWxzLmNsb2NrSGFuZC5zdHlsZVsnLW1zLXRyYW5zZm9ybSddID0gc3R5bGVWYWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHRvIHRoZSBzcGVjaWZpZWQgc3RlcFxuICAgICAqXG4gICAgICogQHBhcmFtIHtpbnRlZ2VyfSBzdGVwIEluZGV4IG9mIHN0ZXAgdG8gY2hhbmdlIHRvXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBjaGFuZ2VTdGVwKHN0ZXApIHtcbiAgICAgICAgY29uc3QgaG91ckVscyA9IHRoaXMuaXNNaWxpdGFyeUZvcm1hdCgpID8gdGhpcy5jYWNoZWRFbHMuY2xvY2tNaWxpdGFyeUhvdXJzTGkgOiB0aGlzLmNhY2hlZEVscy5jbG9ja0hvdXJzTGk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZUVscyA9IHRoaXMuY2FjaGVkRWxzLmNsb2NrTWludXRlc0xpO1xuICAgICAgICBjb25zdCBjaGFuZ2VTdGVwQWN0aW9uID0gW1xuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlSG91cnNWaXNpYmxlKHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlTWludXRlc1Zpc2libGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0ZUhhbmQodGhpcy5nZXRBY3RpdmVJbmRleChob3VyRWxzKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlSG91cnNWaXNpYmxlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVNaW51dGVzVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0ZUhhbmQodGhpcy5nZXRBY3RpdmVJbmRleChtaW51dGVFbHMpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lU2VsZWN0ZWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF1bc3RlcF07XG5cbiAgICAgICAgdGhpcy5jdXJyZW50U3RlcCA9IHN0ZXA7XG4gICAgICAgIGNoYW5nZVN0ZXBBY3Rpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgaG91ciAoYm90aCBtaWxpdGFyeSBhbmQgc3RhbmRhcmQpIGNsb2NrIHZpc2libGl0eSBpbiBET01cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNWaXNpYmxlIElzIGNsb2NrIGZhY2UgdG9nZ2xlZCB2aXNpYmxlIG9yIGhpZGRlblxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgdG9nZ2xlSG91cnNWaXNpYmxlKGlzVmlzaWJsZSA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGlzTWlsaXRhcnlGb3JtYXQgPSB0aGlzLmlzTWlsaXRhcnlGb3JtYXQoKTtcblxuICAgICAgICB0aGlzLmNhY2hlZEVscy5jbG9ja0hvdXJzLnN0eWxlLmRpc3BsYXkgPSBpc1Zpc2libGUgJiYgIWlzTWlsaXRhcnlGb3JtYXQgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgICB0aGlzLmNhY2hlZEVscy5jbG9ja01pbGl0YXJ5SG91cnMuc3R5bGUuZGlzcGxheSA9IGlzVmlzaWJsZSAmJiBpc01pbGl0YXJ5Rm9ybWF0ID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgbWludXRlIGNsb2NrIHZpc2libGl0eSBpbiBET01cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNWaXNpYmxlIElzIGNsb2NrIGZhY2UgdG9nZ2xlZCB2aXNpYmxlIG9yIGhpZGRlblxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgdG9nZ2xlTWludXRlc1Zpc2libGUoaXNWaXNpYmxlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5jYWNoZWRFbHMuY2xvY2tNaW51dGVzLnN0eWxlLmRpc3BsYXkgPSBpc1Zpc2libGUgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgICB0aGlzLmNhY2hlZEVscy5idXR0b25CYWNrLnN0eWxlLmRpc3BsYXkgPSBpc1Zpc2libGUgPyAnaW5saW5lLWJsb2NrJyA6ICdub25lJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGFjdGl2ZSB0aW1lIGVsZW1lbnQgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IHRpbWVFbHMgQ29sbGVjdGlvbiBvZiB0aW1lIGVsZW1lbnRzIHRvIGZpbmQgYWN0aXZlIGluXG4gICAgICogQHJldHVybiB7aW50ZWdlcn0gQWN0aXZlIGVsZW1lbnQgaW5kZXhcbiAgICAgKi9cbiAgICBnZXRBY3RpdmVJbmRleCh0aW1lRWxzKSB7XG4gICAgICAgIGxldCBhY3RpdmVJbmRleCA9IDA7XG5cbiAgICAgICAgW10uc29tZS5jYWxsKHRpbWVFbHMsICh0aW1lRWwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodGltZUVsLmNsYXNzTGlzdC5jb250YWlucygnbXRwLWNsb2NrLS1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBhY3RpdmVJbmRleCA+IDExID8gYWN0aXZlSW5kZXggLSAxMiA6IGFjdGl2ZUluZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBzZWxlY3RlZCB0aW1lIHRvIGlucHV0IGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgdGltZVNlbGVjdGVkKCkge1xuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5jYWNoZWRFbHMuZGlzcGxheVRpbWUuaW5uZXJIVE1MO1xuICAgICAgICBjb25zdCBtZXJpZGllbSA9IHRoaXMuaXNNaWxpdGFyeUZvcm1hdCgpID8gJycgOiB0aGlzLmNhY2hlZEVscy5kaXNwbGF5TWVyaWRpZW0uaW5uZXJIVE1MO1xuXG4gICAgICAgIHRoaXMuaW5wdXRFbC52YWx1ZSA9IGAke3RpbWV9ICR7bWVyaWRpZW19YDtcbiAgICAgICAgdGhpcy5pbnB1dEVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYWN0aXZlIGNsb2NrIGZhY2UgZWxlbWVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBjb250YWluZXJFbCBOZXcgYWN0aXZlIGVsZW1lbnRzIC5wYXJlbnROb2RlXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBhY3RpdmVFbCBFbGVtZW50IHRvIHNldCBhY3RpdmVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNldEFjdGl2ZShjb250YWluZXJFbCwgYWN0aXZlRWwpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlQ2xhc3NOYW1lID0gJ210cC1jbG9jay0tYWN0aXZlJztcbiAgICAgICAgY29uc3QgY3VycmVudEFjdGl2ZSA9IGNvbnRhaW5lckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYWN0aXZlQ2xhc3NOYW1lKVswXTtcblxuICAgICAgICBjdXJyZW50QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlQ2xhc3NOYW1lKTtcbiAgICAgICAgYWN0aXZlRWwuY2xhc3NMaXN0LmFkZChhY3RpdmVDbGFzc05hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1lcmlkaWVtIHNlbGVjdCBldmVudCBoYW5kbGVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW5ldH0gZXZlbnQgRXZlbnQgb2JqZWN0IHBhc3NlZCBmcm9tIGxpc3RlbmVyXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBtZXJpZGllbVNlbGVjdEV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRBY3RpdmUgPSB0aGlzLmNhY2hlZEVscy5tZXJpZGllbS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtdHAtY2xvY2stLWFjdGl2ZScpWzBdO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQuaW5uZXJIVE1MO1xuXG4gICAgICAgIGlmIChlbGVtZW50ICE9PSBjdXJyZW50QWN0aXZlKSB7XG4gICAgICAgICAgICBjdXJyZW50QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ210cC1jbG9jay0tYWN0aXZlJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ210cC1jbG9jay0tYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLmNhY2hlZEVscy5kaXNwbGF5TWVyaWRpZW0uaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaW1lIHNlbGVjdCBldmVudCBoYW5kbGVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBFdmVudCBvYmplY3QgcGFzc2VkIGZyb20gbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXJFbCBFbGVtZW50IGNvbnRhaW5pbmcgdGltZSBsaXN0IGVsZW1lbnRzXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gbGlzdEVscyBDb2xsZWN0aW9uIG9mIGxpc3QgZWxlbWVudHNcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IGRpc3BsYXlJbmRleCBJbmRleCBhdCB3aGljaCBzZWxlY3RlZCB0aW1lIHNob3VsZCBkaXNwbGF5IFsxOiBob3VycywgMjogbWludXRlc11cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHRpbWVTZWxlY3RFdmVudChldmVudCwgY29udGFpbmVyRWwsIGxpc3RFbHMsIGRpc3BsYXlJbmRleCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCBuZXdBY3RpdmUgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgdGhpcy5zZXRBY3RpdmUoY29udGFpbmVyRWwsIG5ld0FjdGl2ZSk7XG4gICAgICAgIHRoaXMuc2V0RGlzcGxheVRpbWUobmV3QWN0aXZlLmlubmVySFRNTCwgZGlzcGxheUluZGV4KTtcbiAgICAgICAgdGhpcy5yb3RhdGVIYW5kKHRoaXMuZ2V0QWN0aXZlSW5kZXgobGlzdEVscykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHBpY2tlciBzZXQgdG8gbWlsaXRhcnkgdGltZSBtb2RlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBJcyBpbiBtaWxpdGFyeSB0aW1lIG1vZGVcbiAgICAgKi9cbiAgICBpc01pbGl0YXJ5Rm9ybWF0KCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmlucHV0RWwubXRwT3B0aW9ucy50aW1lRm9ybWF0ID09PSAnbWlsaXRhcnknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBwaWNrZXIgb2JqZWN0IGhhcyBhbHJlYWR5IHNldCBldmVudHMgb24gcGlja2VyIGVsZW1lbnRzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBIYXMgZXZlbnRzIGJlZW4gc2V0IG9uIHBpY2tlciBlbGVtZW50c1xuICAgICAqL1xuICAgIGhhc1NldEV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkRWxzLndyYXBwZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdtdHAtZXZlbnRzLXNldCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRlbXBsYXRlIGhhcyBhbHJlYWR5IGJlZW4gYXBwZW5kZWQgdG8gRE9NXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBJcyB0ZW1wbGF0ZSBpbiBET01cbiAgICAgKi9cbiAgICBpc1RlbXBsYXRlSW5ET00oKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ210cC1vdmVybGF5JylbMF0pO1xuICAgIH1cbn1cblxud2luZG93LlRpbWVQaWNrZXIgPSBUaW1lUGlja2VyO1xuZXhwb3J0IGRlZmF1bHQgVGltZVBpY2tlcjtcbiJdfQ==
