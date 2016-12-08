define([
    'api/resources/chat'
], function (
    chat
) {
    'use strict';
    
    describe('Api->V1->Resources->Chat->deleteChat', function () {
        it('should delete chat', function () {
            var clientMock = jasmine.createSpyObj('client', ['sendRequest']),
                eventOptions = {},
                resourceChat = new chat(clientMock);


            resourceChat.deleteChat(eventOptions);
            expect(clientMock.sendRequest.calls.count()).toEqual(1);
            expect(clientMock.sendRequest.calls.argsFor(0)).toEqual(['DELETE', 'chat', undefined, eventOptions]);
        });
    });
});
