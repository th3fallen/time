import template from '../html/timepicker.html';
import assign from './assign';

class TimePicker {

    /**
     * Initialize new TimePicker instance
     *
     * @return {TimePicker} New TimePicker instance
     */
    constructor() {
        this.template = template;
        this.setupTemplate();
        this.currentStep = 0;
        this.defaultOptions = {
            // `standard` or `military` display hours
            timeFormat: 'standard',
        };
        this.overlayEl = document.getElementsByClassName('mtp-overlay')[0];
        this.wrapperEl = this.overlayEl.getElementsByClassName('mtp-wrapper')[0];
        this.pickerEl = this.wrapperEl.getElementsByClassName('mtp-picker')[0];
        this.meridiemEls = {
            wrapper: this.wrapperEl.getElementsByClassName('mtp-meridiem')[0],
        };
        this.meridiemEls.spans = this.meridiemEls.wrapper.getElementsByTagName('span');
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

        return this;
    }

    /**
     * Setup the template in DOM if not already
     *
     * @return {void}
     */
    setupTemplate() {
        if (!this.isTemplateInDOM()) {
            document.body.insertAdjacentHTML('beforeend', template);
        }
    }

    /**
     * Bind event to the input element to open when `focus` event is triggered
     *
     * @param {string|HTMLElement} inputEl Selector element to be queried or existing HTMLElement
     * @param {object} options Options to merged with defaults and set to input element object
     * @return {void}
     */
    bindInput(inputEl, options = {}) {
        const element = inputEl instanceof HTMLElement ? inputEl : document.querySelector(inputEl);

        element.mtpOptions = assign({}, this.defaultOptions, options);
        element.addEventListener('focus', event => this.showEvent(event));
    }

    /**
     * Open picker with the input provided in context without binding events
     *
     * @param {string|HTMLElement} inputEl Selector element to be queried or existing HTMLElement
     * @param {object} options Options to merged with defaults and set to input element object
     * @return {void}
     */
    openOnInput(inputEl, options = {}) {
        this.inputEl = inputEl instanceof HTMLElement ? inputEl : document.querySelector(inputEl);
        this.inputEl.mtpOptions = assign({}, this.defaultOptions, options);
        this.show();
    }

    /**
     * Set the events on picker elements
     *
     * @return {void}
     */
    setEvents() {
        if (!this.hasSetEvents()) {
            // close
            this.overlayEl.addEventListener('click', event => this.hideEvent(event));
            this.buttonEls.cancel.addEventListener('click', event => this.hideEvent(event));

            // next/prev step actions
            this.buttonEls.ok.addEventListener('click', () => this.changeStep(this.currentStep + 1));
            this.buttonEls.back.addEventListener('click', () => this.changeStep(0));

            // meridiem select events
            [].forEach.call(this.meridiemEls.spans, span => {
                span.addEventListener('click', event => this.meridiemSelectEvent(event));
            });

            // time select events
            [].forEach.call(this.timeEls.hours, hour => {
                hour.addEventListener('click', event => {
                    this.timeSelectEvent(event, this.clockEls.hours, this.timeEls.hours, 0);
                });
            });
            [].forEach.call(this.timeEls.minutes, minute => {
                minute.addEventListener('click', event => {
                    this.timeSelectEvent(event, this.clockEls.minutes, this.timeEls.minutes, 1);
                });
            });
            [].forEach.call(this.timeEls.militaryHours, hour => {
                hour.addEventListener('click', event => {
                    this.timeSelectEvent(event, this.clockEls.militaryHours, this.timeEls.militaryHours, 0);
                });
            });
            this.wrapperEl.classList.add('mtp-events-set');
        }
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
    showEvent(event) {
        this.inputEl = event.target;
        this.show();
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
     * Hide the picker element on the page
     *
     * @param {Event} event Event object passed from event listener callback
     * @return {void}
     */
    hideEvent(event) {
        event.stopPropagation();

        // only allow event based close if event.target contains one of these classes
        // hack to prevent overlay close event from triggering on all elements
        const allowedClasses = ['mtp-overlay', 'mtp-actions__cancel'];
        const classList = event.target.classList;

        allowedClasses.some(allowedClass => {
            if (classList.contains(allowedClass)) {
                this.hide();
                return true;
            }
        });
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
     * Rotate the hand element to selected time
     *
     * @param {integer} nodeIndex Index of active element
     * @return {void}
     */
    rotateHand(nodeIndex = 9) {
        // rotation is done in increments of 30deg
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
        const hourEls = this.isMilitaryFormat() ? this.timeEls.militaryHours : this.timeEls.hours;
        const minuteEls = this.timeEls.minutes;
        const changeStepAction = [
            () => {
                this.toggleHoursVisible(true);
                this.toggleMinutesVisible();
                this.rotateHand(this.getActiveIndex(hourEls));
            },
            () => {
                this.toggleHoursVisible();
                this.toggleMinutesVisible(true);
                this.rotateHand(this.getActiveIndex(minuteEls));
            },
            () => {
                this.timeSelected();
                this.hide();
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
        const isMilitaryFormat = this.isMilitaryFormat();

        this.clockEls.hours.style.display = isVisible && !isMilitaryFormat ? 'block' : 'none';
        this.clockEls.militaryHours.style.display = isVisible && isMilitaryFormat ? 'block' : 'none';
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
    }

    /**
     * Get the active time element index
     *
     * @param {HTMLCollection} timeEls Collection of time elements to find active in
     * @return {integer} Active element index
     */
    getActiveIndex(timeEls) {
        let activeIndex = 0;

        [].some.call(timeEls, (timeEl, index) => {
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
    timeSelected() {
        const time = this.displayEls.time.innerHTML;
        const meridiem = this.isMilitaryFormat() ? '' : this.displayEls.meridiem.innerHTML;

        this.inputEl.value = `${time} ${meridiem}`;
        this.inputEl.dispatchEvent(new Event('input'));
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
     * Meridiem select event handler
     *
     * @param {Evenet} event Event object passed from listener
     * @return {void}
     */
    meridiemSelectEvent(event) {
        const element = event.target;
        const currentActive = this.meridiemEls.wrapper.getElementsByClassName('mtp-clock--active')[0];
        const value = element.innerHTML;

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
    timeSelectEvent(event, containerEl, listEls, displayIndex) {
        event.stopPropagation();

        const newActive = event.target;

        this.setActive(containerEl, newActive);
        this.setDisplayTime(newActive.innerHTML, displayIndex);
        this.rotateHand(this.getActiveIndex(listEls));
    }

    /**
     * Check if picker set to military time mode
     *
     * @return {boolean} Is in military time mode
     */
    isMilitaryFormat() {
        return Boolean(this.inputEl.mtpOptions.timeFormat === 'military');
    }

    /**
     * Check if picker object has already set events on picker elements
     *
     * @return {boolean} Has events been set on picker elements
     */
    hasSetEvents() {
        return this.wrapperEl.classList.contains('mtp-events-set');
    }

    /**
     * Check if template has already been appended to DOM
     *
     * @return {boolean} Is template in DOM
     */
    isTemplateInDOM() {
        return Boolean(document.getElementsByClassName('mtp-overlay')[0]);
    }
}


window.TimePicker = TimePicker;
export default TimePicker;
