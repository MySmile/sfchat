define([
    'api/renders/messages'
], function (
    messages
) {
    'use strict';

    describe('Api->V1->Renders->Messages->render', function () {
        it('should render message', function () {
            var msg = 'Hello SFChat!',
                actual;

            actual = messages.render(msg);
            expect(actual).toHaveClass('message');
            expect(actual).toContainElement('div.msg-date');
            expect(actual).toContainElement('div.msg-name.msg-you');
            expect(actual).toContainElement('div.msg-text');
            expect(actual).toContainText(msg);
        });
    });
});
