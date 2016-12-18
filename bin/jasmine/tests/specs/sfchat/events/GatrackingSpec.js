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

    describe('Event->Gatracking->init', function () {
        it('should init object and ga', function () {
            var options = {
                debugMode: 'False',
                trackingId: 'UA-123'
            };

            gatracking.init(options);
            expect(window.ga.calls.count()).toEqual(2);
            expect(window.ga.calls.argsFor(0)).toEqual(['create', options.trackingId, 'auto']);
            expect(window.ga.calls.argsFor(1)).toEqual(['send', 'pageview', { 'anonymizeIp': true }]);
        });

        it('should skip init ga as a debugMode turned on', function () {
            var options = {
                debugMode: 'True',
                trackingId: 'UA-123'
            };

            // ga
            window.ga.calls.reset();

            gatracking.init(options);
            expect(window.ga.calls.count()).toEqual(0);
        });

        it('should skip init ga as a empty trackingId', function () {
            var options = {
                debugMode: 'False',
                trackingId: ''
            };

            // ga
            window.ga.calls.reset();

            gatracking.init(options);
            expect(window.ga.calls.count()).toEqual(0);
        });
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

    describe('Event->Gatracking->addListener', function () {
        it('should add listeners if addEventListener method exist', function () {
            var element = $j('<div></div>'),
                type = 'click',
                handler = function() {

                };

            // dom
            element.addEventListener = function() {

            };
            spyOn(element, 'addEventListener');

            gatracking.addListener(element, type, handler);
            expect(element.addEventListener.calls.count()).toEqual(1);
            expect(element.addEventListener.calls.argsFor(0)).toEqual([type, handler]);
        });

        it('should add listeners if attachEvent method exist', function () {
            var element = $j('<div></div>'),
                type = 'click',
                handler = function() {

                };

            // dom
            element.attachEvent = function() {

            };
            spyOn(element, 'attachEvent');

            gatracking.addListener(element, type, handler);
            expect(element.attachEvent.calls.count()).toEqual(1);
            expect(element.attachEvent.calls.argsFor(0)).toEqual(['on' + type, handler]);
        });
    });
});
