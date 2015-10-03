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
            ok: this.pickerEl.getElementsByClassName('mtp-actions__ok')[0],
        };
        this.clockEls = {
            hours: this.pickerEl.getElementsByClassName('mtp-clock__hours')[0],
            minutes: this.pickerEl.getElementsByClassName('mtp-clock__minutes')[0],
            hoursMilitary: this.pickerEl.getElementsByClassName('mtp-clock__hours-military')[0],
            hand: this.pickerEl.getElementsByClassName('mtp-clock__hand')[0],
        };
        this.timeEls = {
            hours: this.clockEls.hours.getElementsByTagName('li'),
            minutes: this.clockEls.minutes.getElementsByTagName('li'),
            hoursMilitary: this.clockEls.hoursMilitary.getElementsByTagName('li'),
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
        this.buttonEls.ok.addEventListener('click', () => this.nextStep());

        // time select events
        [].forEach.call(this.timeEls.hours, hour => {
            hour.addEventListener('click', event => this.hourSelect(event));
        });
        [].forEach.call(this.timeEls.minutes, minute => {
            minute.addEventListener('click', event => this.minuteSelect(event));
        });
        [].forEach.call(this.timeEls.hoursMilitary, hour => {
            hour.addEventListener('click', event => this.hourMilitarySelect(event));
        });
    }

    /**
     * Show the picker
     *
     * @return {void}
     */
    show() {
        const isMilitaryFormat = this.options.timeFormat === 'military';

        // blur input to prevent onscreen keyboard from displaying
        this.inputEl.blur();

        this.clockEls.hours.style.display = isMilitaryFormat ? 'none' : 'block';
        this.clockEls.hoursMilitary.style.display = isMilitaryFormat ? 'block' : 'none';
        this.displayEls.meridiem.style.display = isMilitaryFormat ? 'none' : 'inline';
        this.meridiemEl.style.display = isMilitaryFormat ? 'none' : 'block';
        this.clockEls.minutes.style.display = 'none';
        this.overlayEl.style.display = 'block';
    }

    /**
     * Hide the picker
     *
     * @return {void}
     */
    hide() {
        this.overlayEl.style.display = 'none';
        this.inputEl.dispatchEvent(new Event('blur'));
        this.rotateHand(9);
        this.toggleHourVisible(true);
        this.toggleMinutesVisible();
        this.step = 0;
    }

    /**
     * Hide the picker element on the page
     *
     * @param {Event} event Event object passed from event listener callback
     * @return {void}
     */
    hideEvent(event) {
        // only allow event based close if event.path[0] element contains these classes
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
    rotateHand(nodeIndex) {
        // nodeIndex 0 is 3 elements behind 0deg so subtract 90 from the sum
        const rotateDeg = nodeIndex * 30 - 90;
        const styleVal = `rotate(${rotateDeg}deg)`;

        this.clockEls.hand.style.transform = styleVal;
        this.clockEls.hand.style['-webkit-transform'] = styleVal;
        this.clockEls.hand.style['-ms-transform'] = styleVal;
    }

    nextStep() {
        const nextStepAction = [
            () => {
                this.toggleHourVisible(true);
                this.toggleMinutesVisible();
            },
            () => {
                this.toggleHourVisible();
                this.toggleMinutesVisible(true);
            },
            () => {
                this.toggleHourVisible();
                this.toggleMinutesVisible();
                this.timeSelected();
            },
        ][this.currentStep + 1];

        nextStepAction();
    }

    toggleHourVisible(isVisible = false) {
        const isMilitaryFormat = Boolean(this.options.timeFormat === 'military');
        const hourEl = this.clockEls[isMilitaryFormat ? 'hoursMilitary' : 'hours'];

        hourEl.style.display = isVisible ? 'block' : 'none';
        this.rotateHand(9);
        this.currentStep = 0;
    }

    toggleMinutesVisible(isVisible = false) {
        this.clockEls.minutes.style.display = isVisible ? 'block' : 'none';
        this.rotateHand(9);
        this.currentStep = 1;
    }

    timeSelected() {

    }

    setActive(containerEl, activeEl) {
        const activeClassName = 'mtp-clock--active';
        const currentActive = containerEl.getElementsByClassName(activeClassName)[0];

        currentActive.classList.remove(activeClassName);
        activeEl.classList.add(activeClassName);
    }

    hourSelect(event) {
        const newActive = event.toElement;
        const nodeIndex = [].indexOf.call(newActive.parentNode.children, newActive);

        this.setActive(this.clockEls.hours, newActive);
        this.rotateHand(nodeIndex);
        this.setDisplayTime(newActive.innerHTML, 0);
    }

    minuteSelect(event) {
        const newActive = event.toElement;
        const nodeIndex = [].indexOf.call(newActive.parentNode.children, newActive);

        this.setActive(this.clockEls.minutes, newActive);
        this.rotateHand(nodeIndex);
        this.setDisplayTime(newActive.innerHTML, 1);
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
