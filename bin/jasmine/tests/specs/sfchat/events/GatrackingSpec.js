define([
    'events/gatracking',
    'sfchat/sfchat',
    'ga',
    'text!fixtures/chat.entry.html'
], function (
    gatracking,
    sfchat,
    ga,
    chatEntryFixture
) {
    'use strict';

    beforeEach(function() {
        window.ga = ga;

        // dom element mock
        setFixtures(chatEntryFixture);
    });

    describe('Event->Gatracking->eventError', function () {
        it('should send js error to ga', function () {
            var errorMock = 'Error';

            sfchat.debugmode = 'False';

            gatracking.eventError(errorMock);
            expect(ga.calls.count()).toEqual(1);
            expect(ga.calls.argsFor(0)).toEqual(['send', 'event', 'error', errorMock]);
        });

        it('should skip ga for debug mode', function () {
             var errorMock = 'Error';

             sfchat.debugmode = 'True';

             // ga mock
             ga.calls.reset();

             gatracking.eventError(errorMock);
             expect(ga.calls.count()).toEqual(0);
        });
    });

    describe('Event->Gatracking->eventBtnClick', function () {
        it('should add listeners for button click', function () {
            var target = '#create_chat',
                label = 'create chat',
                targetBtn = $j(target);

            sfchat.debugmode = 'False';

            // dom
            spyOn(targetBtn, 'length').and.returnValue(1);

            // gatracking spy
            spyOn(gatracking, 'addListener').and.callThrough();

            gatracking.eventBtnClick(targetBtn, label);
            expect(gatracking.addListener.calls.count()).toEqual(1);
        });

        it('should skip ga for debug mode', function () {
            var target = '#create_chat',
                label = 'create chat',
                targetBtn = $j(target);

            sfchat.debugmode = 'True';

            // gatracking spy
            spyOn(gatracking, 'addListener').and.callThrough();

            gatracking.eventBtnClick(targetBtn, label);
            expect(gatracking.addListener.calls.count()).toEqual(0);
        });
    });
});
