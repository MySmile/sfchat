define([
    'api/resources/messages'
], function (
    messages
) {
    'use strict';

    var messageResource;

    var clientMock;

    beforeEach(function() {
        clientMock = jasmine.createSpyObj('client', ['sendRequest']);
        messageResource = new messages(clientMock);
    });

    describe('Api->V1->Resources->Messages->postMessage', function () {
        it('should post message', function () {
            var msg = 'Hello SFChat!',
                eventOptions = {};

            messageResource.postMessage(msg, eventOptions);
            expect(clientMock.sendRequest.calls.count()).toEqual(1);
            expect(clientMock.sendRequest.calls.argsFor(0)).toEqual(['POST', 'messages', jasmine.any(Object), eventOptions]);
        });

        it('should throw error', function () {
            var msg = 'Hello SFChat! Hello SFChat! Hello SFChat! Hello SFChat! Hello SFChat! Hello SFChat! Hello SFChat! Hello SFChat! Hello SFChat! Hello SFChat! Hello SFChat!',
                eventOptions = {};

            expect(function() {
                messageResource.postMessage(msg, eventOptions);
            }).toThrowError();
        });
    });

    describe('Api->V1->Resources->Messages->getMessage', function () {
        it('should get message', function () {
            var eventOptions = {};

            messageResource.getMessage(eventOptions);
            expect(clientMock.sendRequest.calls.count()).toEqual(1);
            expect(clientMock.sendRequest.calls.argsFor(0)).toEqual(['GET', 'messages', undefined, eventOptions]);
        });
    });

    describe('Api->V1->Resources->Messages->deleteMessage', function () {
        it('should delete message', function () {
            var data = {},
                eventOptions = {};

            messageResource.deleteMessage(data, eventOptions);
            expect(clientMock.sendRequest.calls.count()).toEqual(1);
            expect(clientMock.sendRequest.calls.argsFor(0)).toEqual(['DELETE', 'messages', data, eventOptions]);
        });
    });
});
