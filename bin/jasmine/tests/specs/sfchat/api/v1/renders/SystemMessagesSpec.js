define([
    'api/renders/systemMessages'
], function (
    messages
) {
    'use strict';

    describe('Api->V1->Renders->SystemMessages->render', function () {
        it('should render message', function () {
            var msg = 'Welcome to SFChat!',
                actual;

            actual = messages.render(msg);
            expect(actual).toHaveClass('message');
            expect(actual).toHaveClass('system');
            expect(actual).toContainElement('div.msg-border');
            expect(actual).toContainElement('div.msg-text');
            expect(actual).toContainText(msg);
        });
    });
});
