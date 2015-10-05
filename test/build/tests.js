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

},{"../html/timepicker.html":1}],3:[function(require,module,exports){
/* eslint-disable */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcJsTimepicker = require('../../src/js/timepicker');

var _srcJsTimepicker2 = _interopRequireDefault(_srcJsTimepicker);

var userAgent = window.navigator.userAgent;
var runningInPhantom = userAgent.search('PhantomJS') > 0;

describe('TimePicker tests', function () {
    it('should provide initialized instance', function () {
        expect(_srcJsTimepicker2['default']).to.be.an('object');
    });

    it('should append picker template to DOM', function () {
        var overlay = document.getElementsByClassName('mtp-overlay')[0];

        expect(overlay).to.exist;
        testIsHTMLElement(overlay);
    });

    describe('initialized class properties', function () {
        it('should start on step 0', function () {
            expect(_srcJsTimepicker2['default'].currentStep).to.equal(0);
        });

        it('should have .mtp-overlay as overlayEl', function () {
            var overlayEl = _srcJsTimepicker2['default'].overlayEl;

            testIsHTMLElement(overlayEl);
            testElementHasClass(overlayEl, 'mtp-overlay');
        });

        it('should have .mtp-wrapper as wrapperEl', function () {
            var wrapperEl = _srcJsTimepicker2['default'].wrapperEl;

            testIsHTMLElement(wrapperEl);
            testElementHasClass(wrapperEl, 'mtp-wrapper');
        });

        it('should have .mtp-picker as pickerEl', function () {
            var pickerEl = _srcJsTimepicker2['default'].pickerEl;

            testIsHTMLElement(pickerEl);
            testElementHasClass(pickerEl, 'mtp-picker');
        });

        it('should have .mtp-meridiem as meridiemEls.wrapper', function () {
            var wrapper = _srcJsTimepicker2['default'].meridiemEls.wrapper;

            testIsHTMLElement(wrapper);
            testElementHasClass(wrapper, 'mtp-meridiem');
        });

        it('should have .mtp-meridiem child spans as meridiemEls.spans', function () {
            var spans = _srcJsTimepicker2['default'].meridiemEls.spans;

            testIsHTMLCollection(spans);
            expect(spans.length).to.equal(2);
        });

        it('should have .mtp-display__time as displayEls.time', function () {
            var time = _srcJsTimepicker2['default'].displayEls.time;

            testIsHTMLElement(time);
            testElementHasClass(time, 'mtp-display__time');
        });

        it('should have .mtp-display__meridiem as displayEls.meridiem', function () {
            var meridiem = _srcJsTimepicker2['default'].displayEls.meridiem;

            testIsHTMLElement(meridiem);
            testElementHasClass(meridiem, 'mtp-display__meridiem');
        });

        it('should have .mtp-actions__cancel as buttonEls.cancel', function () {
            var cancel = _srcJsTimepicker2['default'].buttonEls.cancel;

            testIsHTMLElement(cancel);
            testElementHasClass(cancel, 'mtp-actions__cancel');
        });

        it('should have .mtp-actions__ok as buttonEls.ok', function () {
            var ok = _srcJsTimepicker2['default'].buttonEls.ok;

            testIsHTMLElement(ok);
            testElementHasClass(ok, 'mtp-actions__ok');
        });

        it('should have .mtp-actions__back as buttonEls.back', function () {
            var back = _srcJsTimepicker2['default'].buttonEls.back;

            testIsHTMLElement(back);
            testElementHasClass(back, 'mtp-actions__back');
        });

        it('should have .mtp-clock__hours as clockEls.hours', function () {
            var hours = _srcJsTimepicker2['default'].clockEls.hours;

            testIsHTMLElement(hours);
            testElementHasClass(hours, 'mtp-clock__hours');
        });

        it('should have .mtp-clock__minutes as clockEls.minutes', function () {
            var minutes = _srcJsTimepicker2['default'].clockEls.minutes;

            testIsHTMLElement(minutes);
            testElementHasClass(minutes, 'mtp-clock__minutes');
        });

        it('should have .mtp-clock__hours-military as clockEls.militaryHours', function () {
            var hours = _srcJsTimepicker2['default'].clockEls.militaryHours;

            testIsHTMLElement(hours);
            testElementHasClass(hours, 'mtp-clock__hours-military');
        });

        it('should have .mtp-clock__hand as clockEls.hand', function () {
            var hand = _srcJsTimepicker2['default'].clockEls.hand;

            testIsHTMLElement(hand);
            testElementHasClass(hand, 'mtp-clock__hand');
        });

        it('should have .mtp-clock__hours child li elements as timeEls.hours', function () {
            var hours = _srcJsTimepicker2['default'].timeEls.hours;
            var expected = _srcJsTimepicker2['default'].clockEls.hours.getElementsByTagName('li');

            testIsHTMLCollection(hours);
            expect(hours.length).to.equal(12);
            expect(hours).to.equal(expected);
        });

        it('should have .mtp-clock__minutes child li elements as timeEls.minutes', function () {
            var minutes = _srcJsTimepicker2['default'].timeEls.minutes;
            var expected = _srcJsTimepicker2['default'].clockEls.minutes.getElementsByTagName('li');

            testIsHTMLCollection(minutes);
            expect(minutes.length).to.equal(12);
            expect(minutes).to.equal(expected);
        });

        it('should have .mtp-clock__hours-military child li elements as timeEls.militaryHours', function () {
            var hours = _srcJsTimepicker2['default'].timeEls.militaryHours;
            var expected = _srcJsTimepicker2['default'].clockEls.militaryHours.getElementsByTagName('li');

            testIsHTMLCollection(hours);
            expect(hours.length).to.equal(24);
            expect(hours).to.equal(expected);
        });
    });
});

function testIsHTMLElement(element) {
    expect(element).to.be['instanceof'](HTMLElement);
}

function testIsHTMLCollection(collection) {
    expect(collection).to.be['instanceof'](runningInPhantom ? NodeList : HTMLCollection);
}

function testElementHasClass(element, className) {
    expect(element.classList.contains(className)).to.equal(true);
}

},{"../../src/js/timepicker":2}]},{},[3]);
