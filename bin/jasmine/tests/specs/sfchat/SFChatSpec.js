define([
    'sfchat/sfchat',
    'text!fixtures/chat.active.html'
], function (
    sfChat,
    chatActiveFixture
) {

    'use strict';

    beforeEach(function() {
        // dom element mock
        setFixtures(chatActiveFixture);
    });

    describe('SFChat->getOnloadOptions', function () {
        it('should get options', function () {
            var target = '<div class="onload-js-options"><select id="googleAnalytics"><option value="debugMode">True</option><option value="trackingId">UA-57194449-1</option></select></div>',
                options = [
                    'googleAnalytics.debugMode',
                    'googleAnalytics.trackingId'
                ],
                actual;

                actual = sfChat.getOnloadOptions(target, options);
                expect(actual.googleAnalytics).not.toBeUndefined();
                expect(actual.googleAnalytics.debugMode).not.toBeUndefined();
                expect(actual.googleAnalytics.debugMode).toEqual('True');

                expect(actual.googleAnalytics.trackingId).not.toBeUndefined();
                expect(actual.googleAnalytics.trackingId).toEqual('UA-57194449-1');
        });

        it('should throw error on invalid target', function () {
            var target = '.invalid-target',
                options = [];

            expect(function() {
                sfChat.getOnloadOptions(target, options);
            }).toThrowError(TypeError);
        });

        it('should throw error on invalid option\'s parameter', function () {
            var target = '.onload-js-options',
                options = [
                    'googleAnalyticsInvalid.debugMode'
                ];

            // dom
            spyOn($j(target), 'length').and.returnValue(1);

            expect(function() {
                sfChat.getOnloadOptions(target, options);
            }).toThrowError(TypeError);
        });

        it('should throw error on invalid option\'s key', function () {
            var target = '.onload-js-options',
                options = [
                    'googleAnalytics'
                ];

            // dom
            spyOn($j(target), 'length').and.returnValue(1);

            expect(function() {
                sfChat.getOnloadOptions(target, options);
            }).toThrowError(TypeError);
        });
    });

    describe('SFChat->extend', function () {
        it('should extend', function () {
            var parent = function() {

            },
            child = function() {

            },
            childObj;

            // parent
            parent.prototype.testProperty = 'test property value';

            sfChat.extend(child, parent);
            childObj = new child();
            expect(childObj.testProperty).toEqual(parent.prototype.testProperty);
        });

        it('should throw error', function () {
            var parent = '',
            child = '';

            expect(function() {
                sfChat.extend(child, parent);
            }).toThrowError(TypeError);
        });
    });
});
