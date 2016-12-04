define([
    'events/title'
], function (title) {

    'use strict';

    describe('Event->Title->showTitle', function () {

        it('should append message number', function () {
           var eventMock = {},
               msgCount = 1,
               titleMock = '(1) SFChat: Chatting';

            // document
            document.title = titleMock;

            title.showTitle(eventMock, msgCount);
            expect(document.title).toBe('(2) SFChat: Chatting');
        });

        it('should start message counting', function () {
            var eventMock = {},
               msgCount = 1,
               titleMock = 'SFChat: Chatting';

            // document
            document.title = titleMock;

            title.showTitle(eventMock, msgCount);
            expect(document.title).toBe('(1) SFChat: Chatting');
        });
    });

    describe('Event->Title->clearTitle', function () {

        it('should clear title', function () {
            var eventMock = {},
               titleMock = '(1) SFChat: Chatting';

            // document
            document.title = titleMock;

            title.clearTitle(eventMock);
            expect(document.title).toBe('SFChat: Chatting');
        });
    });
});
