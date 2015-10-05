/* eslint-disable */
import TimePicker from '../../src/js/timepicker';

const userAgent = window.navigator.userAgent;
const runningInPhantom = userAgent.search('PhantomJS') > 0;

describe('TimePicker tests', function() {
    it('should provide initialized instance', function() {
        expect(TimePicker).to.be.an('object');
    });

    it('should append picker template to DOM', function() {
        const overlay = document.getElementsByClassName('mtp-overlay')[0];

        expect(overlay).to.exist;
        testIsHTMLElement(overlay);
    });

    describe('initialized class properties', function() {
        it('should start on step 0', function() {
            expect(TimePicker.currentStep).to.equal(0);
        });

        it('should have .mtp-overlay as overlayEl', function() {
            const overlayEl = TimePicker.overlayEl;

            testIsHTMLElement(overlayEl);
            testElementHasClass(overlayEl, 'mtp-overlay');
        });

        it('should have .mtp-wrapper as wrapperEl', function() {
            const wrapperEl = TimePicker.wrapperEl;

            testIsHTMLElement(wrapperEl);
            testElementHasClass(wrapperEl, 'mtp-wrapper');
        });

        it('should have .mtp-picker as pickerEl', function() {
            const pickerEl = TimePicker.pickerEl;

            testIsHTMLElement(pickerEl);
            testElementHasClass(pickerEl, 'mtp-picker');
        });

        it('should have .mtp-meridiem as meridiemEls.wrapper', function() {
            const wrapper = TimePicker.meridiemEls.wrapper;

            testIsHTMLElement(wrapper);
            testElementHasClass(wrapper, 'mtp-meridiem');
        });

        it('should have .mtp-meridiem child spans as meridiemEls.spans', function() {
            const spans = TimePicker.meridiemEls.spans;

            testIsHTMLCollection(spans);
            expect(spans.length).to.equal(2);
        });

        it('should have .mtp-display__time as displayEls.time', function() {
            const time = TimePicker.displayEls.time;

            testIsHTMLElement(time);
            testElementHasClass(time, 'mtp-display__time');
        });

        it('should have .mtp-display__meridiem as displayEls.meridiem', function() {
            const meridiem = TimePicker.displayEls.meridiem;

            testIsHTMLElement(meridiem);
            testElementHasClass(meridiem, 'mtp-display__meridiem');
        });

        it('should have .mtp-actions__cancel as buttonEls.cancel', function() {
            const cancel = TimePicker.buttonEls.cancel;

            testIsHTMLElement(cancel);
            testElementHasClass(cancel, 'mtp-actions__cancel');
        });

        it('should have .mtp-actions__ok as buttonEls.ok', function() {
            const ok = TimePicker.buttonEls.ok;

            testIsHTMLElement(ok);
            testElementHasClass(ok, 'mtp-actions__ok');
        });

        it('should have .mtp-actions__back as buttonEls.back', function() {
            const back = TimePicker.buttonEls.back;

            testIsHTMLElement(back);
            testElementHasClass(back, 'mtp-actions__back');
        });

        it('should have .mtp-clock__hours as clockEls.hours', function() {
            const hours = TimePicker.clockEls.hours;

            testIsHTMLElement(hours);
            testElementHasClass(hours, 'mtp-clock__hours');
        });

        it('should have .mtp-clock__minutes as clockEls.minutes', function() {
            const minutes = TimePicker.clockEls.minutes;

            testIsHTMLElement(minutes);
            testElementHasClass(minutes, 'mtp-clock__minutes');
        });

        it('should have .mtp-clock__hours-military as clockEls.militaryHours', function() {
            const hours = TimePicker.clockEls.militaryHours;

            testIsHTMLElement(hours);
            testElementHasClass(hours, 'mtp-clock__hours-military');
        });

        it('should have .mtp-clock__hand as clockEls.hand', function() {
            const hand = TimePicker.clockEls.hand;

            testIsHTMLElement(hand);
            testElementHasClass(hand, 'mtp-clock__hand');
        });

        it('should have .mtp-clock__hours child li elements as timeEls.hours', function() {
            const hours = TimePicker.timeEls.hours;
            const expected = TimePicker.clockEls.hours.getElementsByTagName('li');

            testIsHTMLCollection(hours);
            expect(hours.length).to.equal(12);
            expect(hours).to.equal(expected);
        });

        it('should have .mtp-clock__minutes child li elements as timeEls.minutes', function() {
            const minutes = TimePicker.timeEls.minutes;
            const expected = TimePicker.clockEls.minutes.getElementsByTagName('li');

            testIsHTMLCollection(minutes);
            expect(minutes.length).to.equal(12);
            expect(minutes).to.equal(expected);
        });

        it('should have .mtp-clock__hours-military child li elements as timeEls.militaryHours', function() {
            const hours = TimePicker.timeEls.militaryHours;
            const expected = TimePicker.clockEls.militaryHours.getElementsByTagName('li');

            testIsHTMLCollection(hours);
            expect(hours.length).to.equal(24);
            expect(hours).to.equal(expected);
        });
    });
});

function testIsHTMLElement(element) {
    expect(element).to.be.instanceof(HTMLElement);
}

function testIsHTMLCollection(collection) {
    expect(collection).to.be.instanceof(runningInPhantom ? NodeList : HTMLCollection);
}

function testElementHasClass(element, className) {
    expect(element.classList.contains(className)).to.equal(true);
}
