/* eslint-disable */
import TimePicker from '../../../src/js/timepicker';

describe('TimePicker Unit Tests', function() {  
    let picker;

    beforeEach(function() {
        let spanNode = document.createElement('span');
        let liNode = document.createElement('li');
        let divNode = document.createElement('div');
        let ulNode = document.createElement('ul');
        let buttonNode = document.createElement('button');

        picker = new TimePicker();
        picker.cachedEls = {};
        picker.cachedEls.overlay = divNode.cloneNode();
        picker.cachedEls.wrapper = divNode.cloneNode();
        picker.cachedEls.picker = divNode.cloneNode();
        picker.cachedEls.meridiem = divNode.cloneNode();
        picker.cachedEls.displayTime = spanNode.cloneNode();
        picker.cachedEls.displayMeridiem = divNode.cloneNode();
        picker.cachedEls.buttonCancel = buttonNode.cloneNode();
        picker.cachedEls.buttonBack = buttonNode.cloneNode();
        picker.cachedEls.buttonOk = buttonNode.cloneNode();
        picker.cachedEls.clockHours = ulNode.cloneNode();
        picker.cachedEls.clockMinutes = ulNode.cloneNode();
        picker.cachedEls.clockMilitaryHours = ulNode.cloneNode();
        picker.cachedEls.clockHand = divNode.cloneNode();

        for (let inc = 0; inc < 24; inc += 1) {
            if (inc <= 1) {
                picker.cachedEls.meridiem.appendChild(spanNode.cloneNode());
            }
            if (inc <= 11) {
                picker.cachedEls.clockHours.appendChild(liNode.cloneNode());
                picker.cachedEls.clockMinutes.appendChild(liNode.cloneNode());
            }

            picker.cachedEls.clockMilitaryHours.appendChild(liNode.cloneNode());
        }

        picker.cachedEls.meridiemSpans = picker.cachedEls.meridiem.childNodes;
        picker.cachedEls.clockHoursLi = picker.cachedEls.clockHours.childNodes;
        picker.cachedEls.clockMinutesLi = picker.cachedEls.clockMinutes.childNodes;
        picker.cachedEls.clockMilitaryHoursLi = picker.cachedEls.clockMilitaryHours.childNodes;
    });

    afterEach(function() {
        picker = null;
    });

    describe('#setupTemplate', function() {
        let isTemplateInDOMStub, insertAdjacentHTMLStub;

        beforeEach(function() {
            isTemplateInDOMStub = sinon.stub(picker, 'isTemplateInDOM');
            insertAdjacentHTMLStub = sinon.spy(document.body, 'insertAdjacentHTML');
        });

        afterEach(function() {
            isTemplateInDOMStub.restore();
            insertAdjacentHTMLStub.restore();
        });

        it('should insert template in DOM if #isTemplateInDOM returns false', function() {
            isTemplateInDOMStub.onFirstCall().returns(false);
            picker.setupTemplate();

            expect(isTemplateInDOMStub.calledOnce).to.be.true;
            expect(isTemplateInDOMStub.calledBefore(insertAdjacentHTMLStub)).to.be.true;
            expect(insertAdjacentHTMLStub.calledWith('beforeend', picker.template)).to.be.true;
        });

        it('should not insert template in DOM if #isTemplateInDOM returns true', function() {
            isTemplateInDOMStub.onFirstCall().returns(true);
            picker.setupTemplate();

            expect(isTemplateInDOMStub.calledOnce).to.be.true;
            expect(isTemplateInDOMStub.calledBefore(insertAdjacentHTMLStub)).to.be.true;
            expect(insertAdjacentHTMLStub.neverCalledWith('beforeend', picker.template)).to.be.true;
        });
    });

    describe('#setEvents', function() {
        let hasSetEventsStub, cachedEls, wrapperClassListAddSpy;
        const addEventListenerSpys = {};

        beforeEach(function() {
            cachedEls = picker.cachedEls;
            hasSetEventsStub = sinon.stub(picker, 'hasSetEvents');
            wrapperClassListAddSpy = sinon.spy(cachedEls.wrapper.classList, 'add');
            addEventListenerSpys.overlay = sinon.spy(cachedEls.overlay, 'addEventListener');
            addEventListenerSpys.buttonCancel = sinon.spy(cachedEls.buttonCancel, 'addEventListener');
            addEventListenerSpys.buttonOk = sinon.spy(cachedEls.buttonOk, 'addEventListener');
            addEventListenerSpys.buttonBack = sinon.spy(cachedEls.buttonBack, 'addEventListener');
            addEventListenerSpys.meridiemSpans = [];
            addEventListenerSpys.clockHoursLi = [];
            addEventListenerSpys.clockMinutesLi = [];
            addEventListenerSpys.clockMilitaryHoursLi = [];

            [].forEach.call(cachedEls.meridiemSpans, span => {
                addEventListenerSpys.meridiemSpans.push(sinon.spy(span, 'addEventListener'));
            });

            [].forEach.call(cachedEls.clockHoursLi, listItem => {
                addEventListenerSpys.clockHoursLi.push(sinon.spy(listItem, 'addEventListener'));
            });

            [].forEach.call(cachedEls.clockMinutesLi, listItem => {
                addEventListenerSpys.clockMinutesLi.push(sinon.spy(listItem, 'addEventListener'));
            });

            [].forEach.call(cachedEls.clockMilitaryHoursLi, listItem => {
                addEventListenerSpys.clockMilitaryHoursLi.push(sinon.spy(listItem, 'addEventListener'));
            });
        });

        afterEach(function() {
            hasSetEventsStub.restore();
            wrapperClassListAddSpy.restore();
            addEventListenerSpys.overlay.restore();
            addEventListenerSpys.buttonCancel.restore();
            addEventListenerSpys.buttonOk.restore();
            addEventListenerSpys.buttonBack.restore();

            addEventListenerSpys.meridiemSpans.forEach(span => {
                span.restore();
            });

            addEventListenerSpys.clockHoursLi.forEach(listItem => {
                listItem.restore();
            });

            addEventListenerSpys.clockMinutesLi.forEach(listItem => {
                listItem.restore();
            });

            addEventListenerSpys.clockMilitaryHoursLi.forEach(listItem => {
                listItem.restore();
            });
        });

        it('should set events on cached elements if #hasSetEvents returns false', function() {
            hasSetEventsStub.onFirstCall().returns(false);
            picker.setEvents();

            expect(hasSetEventsStub.calledOnce).to.be.true;
            expect(addEventListenerSpys.overlay.calledWith('click', sinon.match.func)).to.be.true;
            expect(addEventListenerSpys.buttonCancel.calledWith('click', sinon.match.func)).to.be.true;
            expect(addEventListenerSpys.buttonOk.calledWith('click', sinon.match.func)).to.be.true;
            expect(addEventListenerSpys.buttonBack.calledWith('click', sinon.match.func)).to.be.true;

            addEventListenerSpys.meridiemSpans.forEach(span => {
                expect(span.calledWith('click', sinon.match.func)).to.be.true;
            });

            addEventListenerSpys.clockHoursLi.forEach(listItem => {
                expect(listItem.calledWith('click', sinon.match.func)).to.be.true;
            });

            addEventListenerSpys.clockMinutesLi.forEach(listItem => {
                expect(listItem.calledWith('click', sinon.match.func)).to.be.true;
            });

            addEventListenerSpys.clockMilitaryHoursLi.forEach(listItem => {
                expect(listItem.calledWith('click', sinon.match.func)).to.be.true;
            });
        });

        it('should not set events on cached elements if #hasSetEvents returns true', function() {
            hasSetEventsStub.onFirstCall().returns(true);
            picker.setEvents();

            expect(hasSetEventsStub.calledOnce).to.be.true;
            expect(addEventListenerSpys.overlay.neverCalledWith('click', sinon.match.func)).to.be.true;
            expect(addEventListenerSpys.buttonCancel.neverCalledWith('click', sinon.match.func)).to.be.true;
            expect(addEventListenerSpys.buttonOk.neverCalledWith('click', sinon.match.func)).to.be.true;
            expect(addEventListenerSpys.buttonBack.neverCalledWith('click', sinon.match.func)).to.be.true;

            addEventListenerSpys.meridiemSpans.forEach(span => {
                expect(span.neverCalledWith('click', sinon.match.func)).to.be.true;
            });

            addEventListenerSpys.clockHoursLi.forEach(listItem => {
                expect(listItem.neverCalledWith('click', sinon.match.func)).to.be.true;
            });

            addEventListenerSpys.clockMinutesLi.forEach(listItem => {
                expect(listItem.neverCalledWith('click', sinon.match.func)).to.be.true;
            });

            addEventListenerSpys.clockMilitaryHoursLi.forEach(listItem => {
                expect(listItem.neverCalledWith('click', sinon.match.func)).to.be.true;
            });
        });

        it('should add .mtp-events-set to cachedEls.wrapper.classList if #hasSetEvents returns false', function() {
            hasSetEventsStub.onFirstCall().returns(false);
            picker.setEvents();

            expect(hasSetEventsStub.calledOnce).to.be.true;
            expect(hasSetEventsStub.calledBefore(wrapperClassListAddSpy)).to.be.true;
            expect(wrapperClassListAddSpy.calledWith('mtp-events-set')).to.be.true;
        });

        it('should not add .mtp-events-set to cachedEls.wrapper.classList if #hasSetEvents returns true', function() {
            hasSetEventsStub.onFirstCall().returns(true);
            picker.setEvents();

            expect(hasSetEventsStub.calledOnce).to.be.true;
            expect(hasSetEventsStub.calledBefore(wrapperClassListAddSpy)).to.be.true;
            expect(wrapperClassListAddSpy.neverCalledWith('mtp-events-set')).to.be.true;
        });
    });

    describe('#show', function() {
        let blurSpy, isMilitaryFormatStub, toggleHoursVisibleSpy, toggleMinutesVisibleSpy,
        setDisplayTimeSpy;

        beforeEach(function() {
            picker.inputEl = document.createElement('input');
            blurSpy = sinon.spy(picker.inputEl, 'blur');
            isMilitaryFormatStub = sinon.stub(picker, 'isMilitaryFormat');
            toggleHoursVisibleSpy = sinon.spy(picker, 'toggleHoursVisible');
            toggleMinutesVisibleSpy = sinon.spy(picker, 'toggleMinutesVisible');
            setDisplayTimeSpy = sinon.spy(picker, 'setDisplayTime');
        });

        afterEach(function() {
            blurSpy.restore();
            isMilitaryFormatStub.restore();
            toggleHoursVisibleSpy.restore();
            toggleMinutesVisibleSpy.restore();
            setDisplayTimeSpy.restore();
        });

        it('should call blur on inputEl', function() {
            picker.show();

            expect(blurSpy.calledOnce).to.be.true;
        });

        it('should call #toggleHoursVisible with true', function() {
            picker.show();

            expect(toggleHoursVisibleSpy.calledOnce).to.be.true;
            expect(toggleHoursVisibleSpy.calledWith(true)).to.be.true;
        });

        it('should call #toggleMinutesVisible with no parameters', function() {
            picker.show();

            expect(toggleMinutesVisibleSpy.calledOnce).to.be.true;
            expect(toggleMinutesVisibleSpy.neverCalledWith(true)).to.be.true;
        });

        it('should call #setDisplayTime with 00 if isMilitaryFormat is true', function() {
            isMilitaryFormatStub.onFirstCall().returns(true);
            picker.show();

            expect(isMilitaryFormatStub.calledOnce).to.be.true;
            expect(isMilitaryFormatStub.calledBefore(setDisplayTimeSpy)).to.be.true;
            expect(setDisplayTimeSpy.calledWith('00', 0)).to.be.true;
        });

        it('should call #setDisplayTime, index 0, with 12 if isMilitaryFormat is false', function() {
            isMilitaryFormatStub.onFirstCall().returns(false);
            picker.show();

            expect(isMilitaryFormatStub.calledOnce).to.be.true;
            expect(isMilitaryFormatStub.calledBefore(setDisplayTimeSpy)).to.be.true;
            expect(setDisplayTimeSpy.getCall(0).calledWith('12', 0)).to.be.true;
        });

        it('should call #setDisplayTime, index 1, with 0', function() {
            picker.show();

            expect(setDisplayTimeSpy.getCall(1).calledWith('0', 1)).to.be.true;
        });

        it('should set cachedEls.displayMeridiem.style.display to none when isMilitaryFormat is true', function() {
            isMilitaryFormatStub.onFirstCall().returns(true);
            picker.show();

            expect(isMilitaryFormatStub.calledOnce).to.be.true;
            expect(picker.cachedEls.displayMeridiem.style.display).to.equal('none');
        });

        it('should set cachedEls.displayMeridiem.style.display to inline when isMilitaryFormat is false', function() {
            isMilitaryFormatStub.onFirstCall().returns(false);
            picker.show();

            expect(isMilitaryFormatStub.calledOnce).to.be.true;
            expect(picker.cachedEls.displayMeridiem.style.display).to.equal('inline');
        });

        it('should set cachedEls.meridiem.style.display to none when isMilitaryFormat is true', function() {
            isMilitaryFormatStub.onFirstCall().returns(true);
            picker.show();

            expect(isMilitaryFormatStub.calledOnce).to.be.true;
            expect(picker.cachedEls.meridiem.style.display).to.equal('none');
        });

        it('should set cachedEls.meridiem.style.display to block when isMilitaryFormat is false', function() {
            isMilitaryFormatStub.onFirstCall().returns(false);
            picker.show();

            expect(isMilitaryFormatStub.calledOnce).to.be.true;
            expect(picker.cachedEls.meridiem.style.display).to.equal('block');
        });

        it('should set cachedEls.overlay.style.display to block', function() {
            picker.show();

            expect(picker.cachedEls.overlay.style.display).to.equal('block');
        });
    });

    describe('#showEvent', function() {
        it('should assign event.target to inputEl call property', function() {
            const event = {};

            event.target = document.createElement('input');
            event.target.mtpOptions = picker.defaultOptions;
            picker.showEvent(event);

            expect(picker.inputEl).to.equal(event.target);
        });

        it('should call #show method', function() {
            const showSpy = sinon.spy(picker, 'show');
            const event = {};

            event.target = document.createElement('input');
            event.target.mtpOptions = picker.defaultOptions;
            picker.showEvent(event);

            expect(showSpy.calledOnce).to.be.true;
        });
    });

    describe('#hide', function() {
        beforeEach(function() {
            picker.inputEl = document.createElement('input');
            picker.inputEl.mtpOptions = picker.defaultOptions;
        });

        it('should set cachedEls.overlay.style.display to none', function() {
            picker.hide();

            expect(picker.cachedEls.overlay.style.display).to.equal('none');
        });

        it('should call dispatchEvevnt with blur event on inputEl', function() {
            const dispatchEventSpy = sinon.spy(picker.inputEl, 'dispatchEvent');    
            
            picker.hide();

            expect(dispatchEventSpy.calledOnce).to.be.true;
            expect(dispatchEventSpy.calledWith(sinon.match(new Event('blur')))).to.be.true;

            dispatchEventSpy.restore();
        });

        it('should call #resetState class method', function() {
            const resetStateSpy = sinon.spy(picker, 'resetState');

            picker.hide();

            expect(resetStateSpy.calledOnce).to.be.true;

            resetStateSpy.restore();
        });
    });

    describe('#hideEvent', function() {
        let event, hideSpy, stopPropagationSpy;

        beforeEach(function() {
            event = {};
            event.stopPropagation = function() {};
            event.target = document.createElement('input');
            picker.inputEl = event.target;
            picker.inputEl.mtpOptions = picker.defaultOptions;
            hideSpy = sinon.spy(picker, 'hide');
            stopPropagationSpy = sinon.spy(event, 'stopPropagation');
        });

        afterEach(function() {
            hideSpy.restore();
            stopPropagationSpy.restore();
        });

        it('should call stopPropagation on event paramater', function() {
            picker.hideEvent(event);

            expect(stopPropagationSpy.calledOnce).to.be.true;
        });

        it('should call #hide if event.target.classList contains mtp-overlay', function() {
            event.target.classList.add('mtp-overlay');
            picker.hideEvent(event);

            expect(hideSpy.calledOnce).to.be.true;
        });

        it('should call #hide if event.target.classList contains mtp-actions__cancel', function() {
            event.target.classList.add('mtp-actions__cancel');
            picker.hideEvent(event);

            expect(hideSpy.calledOnce).to.be.true;
        });

        it('should not call #hide if event.target.classList does not have allowed class', function() {
            picker.hideEvent(event);

            expect(hideSpy.calledOnce).to.be.false;
        });
    });

    describe('#resetState', function() {
        let toggleHoursVisibleSpy, toggleMinutesVisibleSpy, isMilitaryFormatStub, hoursLiDispatchEventSpy,
        minutesLiDispatchEventSpy, militaryHoursLiDispatchEventSpy;

        beforeEach(function() {
            const cachedEls = picker.cachedEls;

            picker.currentStep = 2;
            picker.inputEl = document.createElement('input');
            picker.inputEl.mtpOptions = picker.defaultOptions;
            isMilitaryFormatStub = sinon.stub(picker, 'isMilitaryFormat');
            toggleHoursVisibleSpy = sinon.spy(picker, 'toggleHoursVisible');
            toggleMinutesVisibleSpy = sinon.spy(picker, 'toggleMinutesVisible');
            hoursLiDispatchEventSpy = sinon.spy(cachedEls.clockHoursLi[9], 'dispatchEvent');
            minutesLiDispatchEventSpy = sinon.spy(cachedEls.clockMinutesLi[9], 'dispatchEvent');
            militaryHoursLiDispatchEventSpy = sinon.spy(cachedEls.clockMilitaryHoursLi[9], 'dispatchEvent');
        });

        afterEach(function() {
            isMilitaryFormatStub.restore();
            toggleHoursVisibleSpy.restore();
            toggleMinutesVisibleSpy.restore();
            hoursLiDispatchEventSpy.restore();
            minutesLiDispatchEventSpy.restore();
            militaryHoursLiDispatchEventSpy.restore();
        });

        it('should set currentStep to 0', function() {
            expect(picker.currentStep).to.equal(2);

            picker.resetState();

            expect(picker.currentStep).to.equal(0);
        });

        it('should call #toggleHoursVisible with parameters true, and result of #isMilitaryFormat', function() {
            isMilitaryFormatStub.onCall(0).returns(true);
            isMilitaryFormatStub.onCall(1).returns(false);

            picker.resetState();

            expect(isMilitaryFormatStub.calledOnce).to.be.true;
            expect(toggleHoursVisibleSpy.calledWith(true, true)).to.be.true;

            picker.resetState();

            expect(isMilitaryFormatStub.calledTwice).to.be.true;
            expect(toggleHoursVisibleSpy.calledWith(true, false)).to.be.true;
        });

        it('should call #toggleMinutesVisible', function() {
            picker.resetState();

            expect(toggleMinutesVisibleSpy.calledOnce).to.be.true;
        });

        it('should call dispatchEvent with click event on cachedEls.clockHoursLi[9]', function() {
            picker.resetState();

            expect(hoursLiDispatchEventSpy.calledOnce).to.be.true;
            expect(hoursLiDispatchEventSpy.calledWith(sinon.match(new Event('click')))).to.be.true;
        });

        it('should call dispatchEvent with click event on cachedEls.clockMinutesLi[9]', function() {
            picker.resetState();

            expect(minutesLiDispatchEventSpy.calledOnce).to.be.true;
            expect(minutesLiDispatchEventSpy.calledWith(sinon.match(new Event('click')))).to.be.true;
        });

        it('should call dispatchEvent with click event on cachedEls.clockMilitaryHoursLi[9]', function() {
            picker.resetState();

            expect(militaryHoursLiDispatchEventSpy.calledOnce).to.be.true;
            expect(militaryHoursLiDispatchEventSpy.calledWith(sinon.match(new Event('click')))).to.be.true;
        });
    });

    describe('#setDisplayTime', function() {
        let displayTimeEl;

        beforeEach(function() {
            picker.cachedEls.displayTime.innerHTML = '00:00';
            displayTimeEl = picker.cachedEls.displayTime;
        });

        it('should replace hour time with value given when index 0', function() {
            expect(displayTimeEl.innerHTML).to.equal('00:00');

            picker.setDisplayTime('15', 0);

            expect(displayTimeEl.innerHTML).to.equal('15:00');
        });

        it('should replace minute time with value given when index 1', function() {
            expect(displayTimeEl.innerHTML).to.equal('00:00');

            picker.setDisplayTime('15', 1);

            expect(displayTimeEl.innerHTML).to.equal('00:15');
        });

        it('should pad minute value with 0 if value is single diget', function() {
            expect(displayTimeEl.innerHTML).to.equal('00:00');

            picker.setDisplayTime('1', 1);

            expect(displayTimeEl.innerHTML).to.equal('00:01');
        });
    });

    describe('#rotateHand', function() {
        it('should set cachedEls.clockHand.style.transform to rotate((nodeIndex * 30 - 90)deg)', function() {
            const nodeIndex = 5;
            const rotateVal = 5 * 30 - 90;

            picker.rotateHand(nodeIndex);

            expect(picker.cachedEls.clockHand.style.transform).to.equal(`rotate(${rotateVal}deg)`);
        });

        it('should have a default value of 9 for nodeIndex', function() {
            const rotateVal = 9 * 30 - 90;

            picker.rotateHand();

            expect(picker.cachedEls.clockHand.style.transform).to.equal(`rotate(${rotateVal}deg)`);
        });
    });

    describe('#changeStep', function() {
    });

    describe('#toggleHoursVisible', function() {

    });

    describe('#toggleMinutesVisible', function() {

    });

    describe('#getActiveIndex', function() {

    });

    describe('#timeSelected', function() {

    });

    describe('#setActiveEl', function() {

    });

    describe('#meridiemSelectEvent', function() {

    });

    describe('#timeSelectEvent', function() {

    });
});
