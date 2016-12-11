define([
    'events/gatracking',
    'ga',
    'text!fixtures/chat.entry.html'
], function (
    gatracking,
    ga,
    chatEntryFixture
) {
    'use strict';

    beforeEach(function() {
        window.ga = ga;

        // dom element mock
        setFixtures(chatEntryFixture);
    });

    describe('Event->Gatracking->eventBtnClick', function () {
        it('should add listeners for button click', function () {
            var target = '#create_chat',
                label = 'create chat',
                targetBtn = $j(target);

            gatracking.options.debugMode = 'False';
            gatracking.options.trackingId = 'UA-123';

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

            gatracking.options.debugMode = 'True';
            gatracking.options.trackingId = 'UA-123';

            // gatracking spy
            spyOn(gatracking, 'addListener').and.callThrough();

            gatracking.eventBtnClick(targetBtn, label);
            expect(gatracking.addListener.calls.count()).toEqual(0);
        });
    });
});
