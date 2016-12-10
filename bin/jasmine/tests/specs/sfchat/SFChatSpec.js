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
        it('should init options', function () {
            var target = $j('.onload-js-options'),
                options = [
                    'googleAnalytics.debugMode',
                    'chatBootstrap.endPoint',
                    'chatBootstrap.userToken',
                    'chatBootstrap.chatStatus',
                    'errorHandler.targetError',
                    'errorHandler.hideClass',
                    'errorHandler.targetHeader',
                    'errorHandler.errorHeaderClass'
                ],
                actual;

            actual = sfChat.getOnloadOptions(target, options);
            expect(actual.googleAnalytics).toBeDefined();
            expect(actual.chatBootstrap).toBeDefined();
            expect(actual.errorHandler).toBeDefined();
        });

        it('should throw error on invalid target', function () {
            var target = '.invalid-target',
                options = [];

            expect(function() {
                sfChat.getOnloadOptions(target, options);
            }).toThrowError(TypeError);
        });

        it('should throw error on invalid option\'s parameter', function () {
            var target = $j('.onload-js-options'),
                options = [
                    'googleAnalyticsInvalid.debugMode'
                ];

            expect(function() {
                sfChat.getOnloadOptions(target, options);
            }).toThrowError(TypeError);
        });

        it('should throw error on invalid option\'s key', function () {
            var target = $j('.onload-js-options'),
                options = [
                    'googleAnalytics.invalid'
                ];

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
