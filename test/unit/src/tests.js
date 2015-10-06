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

        it('should insert template in DOM if not already', function() {
            isTemplateInDOMStub.onFirstCall().returns(false);
            picker.setupTemplate();

            expect(isTemplateInDOMStub.calledOnce).to.equal(true);
            expect(isTemplateInDOMStub.calledBefore(insertAdjacentHTMLStub)).to.equal(true);
            expect(insertAdjacentHTMLStub.calledWith('beforeend', picker.template)).to.equal(true);
        });

        it('should not insert template if already in DOM', function() {
            isTemplateInDOMStub.onFirstCall().returns(true);
            picker.setupTemplate();

            expect(isTemplateInDOMStub.calledOnce).to.equal(true);
            expect(isTemplateInDOMStub.calledBefore(insertAdjacentHTMLStub)).to.equal(true);
            expect(insertAdjacentHTMLStub.neverCalledWith('beforeend', picker.template)).to.equal(true);
        });
    });
});
