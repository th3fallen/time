/* eslint-disable */
import TimePicker from '../../../src/js/timepicker';

describe('TimePicker Unit Tests', function() {  
    describe('#setupTemplate', function() {
        let picker, isTemplateInDOMStub, insertAdjacentHTMLStub;

        beforeEach(function() {
            picker = new TimePicker();
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

            expect(isTemplateInDOMStub.calledOnce).to.equal(true);
            expect(isTemplateInDOMStub.calledBefore(insertAdjacentHTMLStub)).to.equal(true);
            expect(insertAdjacentHTMLStub.calledWith('beforeend', picker.template)).to.equal(true);
        });

        it('should not insert template in DOM if #isTemplateInDOM returns true', function() {
            isTemplateInDOMStub.onFirstCall().returns(true);
            picker.setupTemplate();

            expect(isTemplateInDOMStub.calledOnce).to.equal(true);
            expect(isTemplateInDOMStub.calledBefore(insertAdjacentHTMLStub)).to.equal(true);
            expect(insertAdjacentHTMLStub.neverCalledWith('beforeend', picker.template)).to.equal(true);
        });
    });

    describe('#setEvents', function() {
        let picker, hasSetEventsStub, cachedEls, wrapperClassListAddSpy;
        const addEventListenerSpys = {};

        beforeEach(function() {
            picker = new TimePicker();
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
});
