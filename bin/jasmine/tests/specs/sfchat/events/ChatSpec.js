define([
    'events/chat',
    'text!fixtures/chat.active.html'
], function (
    chat,
    chatActiveFixture
) {
    'use strict';

    var storageMock;

    var resourceChatMock;

    beforeEach(function() {
        // storage mock
        storageMock = {
            removeData: function(key) {

            },
            removeAllData: function() {

            },
            addData: function(key, data) {

            },
            setData: function(key, data) {

            },
            getData: function(key) {

            },
            getChatToken: function() {

            }
        };
        chat._storage = storageMock;

        // resource mock
        resourceChatMock = {
            deleteChat: function(eventOptions) {

            }
        };
        chat._chat = resourceChatMock;

        // dom element mock
        setFixtures(chatActiveFixture);
        chat.options.chatBodyDom = $j('#chat-body');
        chat.options.chatTypeDom = $j('#chat-type textarea');
        chat.options.chatSendDom = $j('#chat-type .btn');
        chat.options.draftClass = 'btn-grey';
    });
    
    describe('Event->Chat->deleteChat', function () {
        it('should delete chat', function () {

            // resource mock
            spyOn(resourceChatMock, 'deleteChat');

            chat.deleteChat();
            expect(resourceChatMock.deleteChat.calls.count()).toEqual(1);
            expect(resourceChatMock.deleteChat.calls.argsFor(0)).toEqual([{
                manager: chat.options.chatBodyDom,
                event: 'setChatClosed'
            }]);
        })
    });
});
