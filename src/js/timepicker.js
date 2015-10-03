import template from '../html/timepicker.html';

const defaultOptions = {
    // `standard` or `military` display hours
    timeFormat: 'standard',
};

class TimePicker {

    /**
     * Initialize new TimePicker instance
     *
     * @param {HTMLElement} inputEl Input element(s) to use with timepicker
     * @param {object} options Configuration options to be merged with defaults
     * @return {TimePicker} New TimePicker instance
     */
    constructor(inputEl, options = {}) {
        this.inputEl = inputEl;
        this.options = Object.assign(defaultOptions, options);
        this.currentStep = 0;

        this.setupElements();

        return this;
    }

    /**
     * Add template to DOM if no already, and cache elements use by picker
     *
     * @return {void}
     */
    setupElements() {
        const mtpExists = Boolean(document.getElementsByClassName('mtp-overlay')[0]);

        if (!mtpExists) {
            document.body.insertAdjacentHTML('beforeend', template);
        }

        this.overlayEl = document.getElementsByClassName('mtp-overlay')[0];
        this.wrapperEl = this.overlayEl.getElementsByClassName('mtp-wrapper')[0];
        this.pickerEl = this.wrapperEl.getElementsByClassName('mtp-picker')[0];
        this.meridiemEl = this.wrapperEl.getElementsByClassName('mtp-meridiem')[0];
        this.displayEls = {
            time: this.wrapperEl.getElementsByClassName('mtp-display__time')[0],
            meridiem: this.wrapperEl.getElementsByClassName('mtp-display__meridiem')[0],
        };
        this.buttonEls = {
            cancel: this.pickerEl.getElementsByClassName('mtp-actions__cancel')[0],
            back: this.pickerEl.getElementsByClassName('mtp-actions__back')[0],
            ok: this.pickerEl.getElementsByClassName('mtp-actions__ok')[0],
        };
        this.clockEls = {
            hours: this.pickerEl.getElementsByClassName('mtp-clock__hours')[0],
            minutes: this.pickerEl.getElementsByClassName('mtp-clock__minutes')[0],
            militaryHours: this.pickerEl.getElementsByClassName('mtp-clock__hours-military')[0],
            hand: this.pickerEl.getElementsByClassName('mtp-clock__hand')[0],
        };
        this.timeEls = {
            hours: this.clockEls.hours.getElementsByTagName('li'),
            minutes: this.clockEls.minutes.getElementsByTagName('li'),
            militaryHours: this.clockEls.militaryHours.getElementsByTagName('li'),
        };

        this.setEvents();
    }

    /**
     * Set the events on picker elements
     *
     * @return {void}
     */
    setEvents() {
        // open
        this.inputEl.addEventListener('focus', () => this.show());

        // close
        this.overlayEl.addEventListener('click', event => this.hideEvent(event));
        this.buttonEls.cancel.addEventListener('click', event => this.hideEvent(event));

        // next/prev step actions
        this.buttonEls.ok.addEventListener('click', () => this.changeStep(this.currentStep + 1));
        this.buttonEls.back.addEventListener('click', () => this.changeStep(0));

        // time select events
        [].forEach.call(this.timeEls.hours, hour => {
            hour.addEventListener('click', event => {
                this.hourSelect(event, this.clockEls.hours, this.timeEls.hours, 0);
            });
        });
        [].forEach.call(this.timeEls.minutes, minute => {
            minute.addEventListener('click', event => {
                this.minuteSelect(event, this.clockEls.minutes, this.timeEls.minutes, 1);
            });
        });
        [].forEach.call(this.timeEls.militaryHours, hour => {
            hour.addEventListener('click', event => {
                this.militaryHourSelect(event, this.clockEls.militaryHours, this.timeEls.militaryHours, 0);
            });
        });
    }

    /**
     * Show the picker in the DOM
     *
     * @return {void}
     */
    show() {
        const isMilitaryFormat = this.isMilitaryFormat();

        // blur input to prevent onscreen keyboard from displaying
        this.inputEl.blur();
        this.toggleHoursVisible(true);
        this.toggleMinutesVisible();

        this.displayEls.meridiem.style.display = isMilitaryFormat ? 'none' : 'inline';
        this.meridiemEl.style.display = isMilitaryFormat ? 'none' : 'block';
        this.overlayEl.style.display = 'block';
    }

    /**
     * Hide the picker in the DOM
     *
     * @return {void}
     */
    hide() {
        this.overlayEl.style.display = 'none';
        this.inputEl.dispatchEvent(new Event('blur'));
        this.resetState();
    }

    /**
     * Reset picker state to defaults
     *
     * @return {void}
     */
    resetState() {
        this.currentStep = 0;

        this.toggleHoursVisible(true);
        this.toggleMinutesVisible();
        this.timeEls.hours[9].click();
        this.timeEls.minutes[9].click();
        this.timeEls.militaryHours[9].click();
    }

    /**
     * Hide the picker element on the page
     *
     * @param {Event} event Event object passed from event listener callback
     * @return {void}
     */
    hideEvent(event) {
        // only allow event based close if event.toElement contains one of these classes
        // hack to prevent overlay close event from triggering on all elements
        const allowedClasses = ['mtp-overlay', 'mtp-actions__cancel'];
        const classList = event.toElement.classList;

        allowedClasses.some(allowedClass => {
            if (classList.contains(allowedClass)) {
                this.hide();
                return true;
            }
        });
    }

    /**
     * Set the displayed time, which will be used to fill input value on completetion
     *
     * @param {string} value Newly selected time value
     * @param {integer} index Index of value to replace [0 = hours, 1 = minutes]
     * @return {void}
     */
    setDisplayTime(value, index) {
        const time = this.displayEls.time.innerHTML.split(':');

        // prepend with zero if selecting minutes and value is single digit
        time[index] = index === 1 && value < 10 ? `0${value}` : value;
        const newTime = time.join(':');

        this.displayEls.time.innerHTML = newTime;
    }

    /**
     * Rotate the hand element to selected time. Rotation is done in increments of 30deg.
     *
     * @param {integer} nodeIndex Index inside parentNode of the selected time
     * @return {void}
     */
    rotateHand(nodeIndex = 9) {
        // nodeIndex 0 is 3 elements behind 0deg so subtract 90 from the sum
        const rotateDeg = nodeIndex * 30 - 90;
        const styleVal = `rotate(${rotateDeg}deg)`;

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
    changeStep(step) {
        const changeStepAction = [
            () => {
                this.toggleHoursVisible(true);
                this.toggleMinutesVisible();
            },
            () => {
                this.toggleHoursVisible();
                this.toggleMinutesVisible(true);
            },
            () => {
                this.toggleHoursVisible();
                this.toggleMinutesVisible();
                this.timeSelected();
            },
        ][step];

        this.currentStep = step;
        changeStepAction();
    }

    /**
     * Toggle hour (both military and standard) clock visiblity in DOM
     *
     * @param {boolean} isVisible Is clock face toggled visible or hidden
     * @return {void}
     */
    toggleHoursVisible(isVisible = false) {
        const hourEl = this.clockEls[this.isMilitaryFormat() ? 'militaryHours' : 'hours'];

        hourEl.style.display = isVisible ? 'block' : 'none';
        this.rotateHand();
    }

    /**
     * Toggle minute clock visiblity in DOM
     *
     * @param {boolean} isVisible Is clock face toggled visible or hidden
     * @return {void}
     */
    toggleMinutesVisible(isVisible = false) {
        this.clockEls.minutes.style.display = isVisible ? 'block' : 'none';
        this.buttonEls.back.style.display = isVisible ? 'inline-block' : 'none';
        this.rotateHand();
    }

    timeSelected() {

    }

    /**
     * Set active clock face element
     *
     * @param {Element} containerEl New active elements .parentNode
     * @param {Element} activeEl Element to set active
     * @return {void}
     */
    setActive(containerEl, activeEl) {
        const activeClassName = 'mtp-clock--active';
        const currentActive = containerEl.getElementsByClassName(activeClassName)[0];

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
    selectEvent(event, containerEl, listEls, displayIndex) {
        const newActive = event.toElement;
        const nodeIndex = [].indexOf.call(listEls, newActive);

        this.setActive(containerEl, newActive);
        this.rotateHand(nodeIndex > 11 ? nodeIndex - 12 : nodeIndex);
        this.setDisplayTime(newActive.innerHTML, displayIndex);
    }

    /**
     * Check if picker set to military time mode
     *
     * @return {boolean} Is in military time mode
     */
    isMilitaryFormat() {
        return Boolean(this.options.timeFormat === 'military');
    }
}

// Object.assign polyfill so `babel/polyfill` isn't required
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: target => {
            const to = Object(target);

            if (target === 'undefined' || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            for (let inc = 1; inc < arguments.length; inc += 1) {
                let nextSource = arguments[inc];

                if (nextSource === 'undefined' || nextSource === null) {
                    continue;
                }

                nextSource = Object(nextSource);
                const keysArray = Object.keys(nextSource);

                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

                    if (desc !== 'undefined' && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }

            return to;
        },
    });
}

window.TimePicker = TimePicker;
export default TimePicker;
