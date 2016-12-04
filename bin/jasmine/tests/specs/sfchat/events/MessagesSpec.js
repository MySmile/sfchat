define([
    'events/messages',
    'text!fixtures/chat.active.html'
], function (
    messages,
    chatActiveFixture
) {

    'use strict';

    var resourceMessageMock;

    beforeEach(function() {
        // resource mock
        resourceMessageMock = {
            postMessage: function(msg, eventOptions) {

            },

            getMessage: function(eventOptions) {

            },

            deleteMessage: function(data, eventOptions) {

            }
        };
        messages._messages = resourceMessageMock;
        
        // dom element mock
        setFixtures(chatActiveFixture);
        messages.options.chatBodyDom = $j('#chat-body');
        messages.options.chatTypeDom = $j('#chat-type textarea');
    });


    describe('Event->Messages->postMessage', function () {

        it('should reject posting empty message', function () {
            var messageVal = '  ';

            // message text
            spyOn(messages.options.chatTypeDom, 'val').and.returnValue(messageVal);

            // resource message mock
            spyOn(resourceMessageMock, 'postMessage');

            messages.postMessage();
            expect(resourceMessageMock.postMessage.calls.count()).toEqual(0);
        });

        it('should post message', function () {
            var messageVal = 'message';

            // message text
            spyOn(messages.options.chatTypeDom, 'val').and.returnValue(messageVal);

            // resource message mock
            spyOn(resourceMessageMock, 'postMessage');

            messages.postMessage();
            expect(resourceMessageMock.postMessage.calls.count()).toEqual(1);
        });
    });
});
