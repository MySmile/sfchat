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

    describe('Event->Chat->init', function () {
        it('should init object', function () {
            var options = {
                chatBodyDom: 'chatBodyDom',
                chatTypeDom: 'chatTypeDom',
                chatSendDom: 'chatSendDom',
                client:      {},
                draftClass:  'draftClass'
            };

            chat.init(options);
            expect(chat.options).toEqual(options);
            expect(chat._chat).not.toBeUndefined();
        });
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
    
    describe('Event->Chat->setChatClosed', function () {
        it('should close chat', function () {
            var eventMock = {},
                request = {
                    data: {
                        messages: []
                    }
                },
                response = {
                    results: {
                        messages: [],
                        code: 200
                    }
                };

            // dom
            spyOn(chat.options.chatSendDom, 'addClass').and.returnValue(chat.options.chatSendDom);
            spyOn(chat.options.chatSendDom, 'off');
            spyOn(chat.options.chatTypeDom, 'prop').and.returnValue(chat.options.chatTypeDom);
            spyOn(chat.options.chatTypeDom, 'off');
            spyOn(chat.options.chatBodyDom, 'off');
            spyOn(chat.options.chatBodyDom, 'trigger');

            chat.setChatClosed(eventMock, request, response);
            expect(chat.options.chatSendDom.addClass.calls.count()).toEqual(1);
            expect(chat.options.chatSendDom.addClass.calls.argsFor(0)).toEqual([chat.options.draftClass]);
            expect(chat.options.chatSendDom.off.calls.count()).toEqual(1);

            expect(chat.options.chatTypeDom.prop.calls.count()).toEqual(1);
            expect(chat.options.chatTypeDom.prop.calls.argsFor(0)).toEqual(['disabled', true]);
            expect(chat.options.chatTypeDom.off.calls.count()).toEqual(1);

            expect(chat.options.chatBodyDom.off.calls.count()).toEqual(2);
            expect(chat.options.chatBodyDom.off.calls.argsFor(0)).toEqual(['deleteChat']);
            expect(chat.options.chatBodyDom.off.calls.argsFor(1)).toEqual(['deleteMessage']);
            expect(chat.options.chatBodyDom.trigger.calls.count()).toEqual(1);
            expect(chat.options.chatBodyDom.trigger.calls.argsFor(0)).toEqual(['clearTitle']);
        });

        it('should throw error', function () {
            var eventMock = {},
                request = {
                    data: {
                        messages: []
                    }
                },
                response = {
                    results: {
                        messages: [],
                        code: 500
                    }
                };

            expect(function() {
                chat.setChatClosed(eventMock, request, response);
            }).toThrowError();
        });
    });

    describe('Event->Chat->setChatClosed', function () {
        it('should send message by clink on send button', function () {
            // dom
            spyOn(chat.options.chatSendDom, 'hasClass').and.returnValue(true);
            spyOn(chat.options.chatSendDom, 'click').and.callThrough();
            spyOn(chat.options.chatSendDom, 'removeClass');
            spyOn(chat.options.chatBodyDom, 'trigger');
            spyOn(chat.options.chatTypeDom, 'prop');
            spyOn(chat.options.chatTypeDom, 'focus');

            chat.setChatReady();
            chat.options.chatSendDom.click();

            expect(chat.options.chatSendDom.hasClass.calls.count()).toEqual(1);
            expect(chat.options.chatSendDom.hasClass.calls.argsFor(0)).toEqual([chat.options.draftClass]);
            expect(chat.options.chatSendDom.click.calls.count()).toEqual(2);
            expect(chat.options.chatSendDom.removeClass.calls.count()).toEqual(1);
            expect(chat.options.chatSendDom.removeClass.calls.argsFor(0)).toEqual([chat.options.draftClass]);

            expect(chat.options.chatBodyDom.trigger.calls.count()).toEqual(1);
            expect(chat.options.chatBodyDom.trigger.calls.argsFor(0)).toEqual(['postMessage']);

            expect(chat.options.chatTypeDom.prop.calls.count()).toEqual(1);
            expect(chat.options.chatTypeDom.prop.calls.argsFor(0)).toEqual(['disabled', false]);
            expect(chat.options.chatTypeDom.focus.calls.count()).toEqual(1);
        });

        it('should init all events to send message', function () {
            // dom
            spyOn(chat.options.chatSendDom, 'hasClass').and.returnValue(true);
            spyOn(chat.options.chatSendDom, 'click');
            spyOn(chat.options.chatSendDom, 'removeClass');
            spyOn(chat.options.chatBodyDom, 'trigger');
            spyOn(chat.options.chatTypeDom, 'keydown');
            spyOn(chat.options.chatTypeDom, 'prop');
            spyOn(chat.options.chatTypeDom, 'focus');

            chat.setChatReady();
            expect(chat.options.chatSendDom.hasClass.calls.count()).toEqual(1);
            expect(chat.options.chatSendDom.hasClass.calls.argsFor(0)).toEqual([chat.options.draftClass]);
            expect(chat.options.chatSendDom.click.calls.count()).toEqual(1);
            expect(chat.options.chatSendDom.removeClass.calls.count()).toEqual(1);
            expect(chat.options.chatSendDom.removeClass.calls.argsFor(0)).toEqual([chat.options.draftClass]);

            expect(chat.options.chatTypeDom.keydown.calls.count()).toEqual(1);
            expect(chat.options.chatTypeDom.prop.calls.count()).toEqual(1);
            expect(chat.options.chatTypeDom.prop.calls.argsFor(0)).toEqual(['disabled', false]);
            expect(chat.options.chatTypeDom.focus.calls.count()).toEqual(1);
        });

        it('should prevent duplicate init', function () {
             // dom
            spyOn(chat.options.chatSendDom, 'hasClass').and.returnValue(false);
            spyOn(chat.options.chatSendDom, 'click');
            spyOn(chat.options.chatSendDom, 'removeClass');
            spyOn(chat.options.chatBodyDom, 'trigger');
            spyOn(chat.options.chatTypeDom, 'keydown');
            spyOn(chat.options.chatTypeDom, 'prop');
            spyOn(chat.options.chatTypeDom, 'focus');

            chat.setChatReady();
            expect(chat.options.chatSendDom.hasClass.calls.count()).toEqual(1);
            expect(chat.options.chatSendDom.click.calls.count()).toEqual(0);
            expect(chat.options.chatSendDom.removeClass.calls.count()).toEqual(0);

            expect(chat.options.chatTypeDom.keydown.calls.count()).toEqual(0);
            expect(chat.options.chatTypeDom.prop.calls.count()).toEqual(0);
            expect(chat.options.chatTypeDom.focus.calls.count()).toEqual(0);
        });
    });

    describe('Event->Chat->setChatStatus', function () {
        it('should set "ready" chat', function () {
            // dom
            spyOn(chat.options.chatBodyDom, 'trigger');

            chat.setChatStatus(null, 'ready');
            expect(chat.options.chatBodyDom.trigger.calls.count()).toEqual(1);
            expect(chat.options.chatBodyDom.trigger.calls.argsFor(0)).toEqual(['setChatReady']);
        });

        it('should set "closed" chat', function () {
            // dom
            spyOn(chat.options.chatBodyDom, 'trigger');

            // storage mock
            spyOn(storageMock, 'removeAllData');

            chat.setChatStatus(null, 'closed');
            expect(chat.options.chatBodyDom.trigger.calls.count()).toEqual(1);
            expect(chat.options.chatBodyDom.trigger.calls.argsFor(0)).toEqual(['setChatClosed']);

            expect(storageMock.removeAllData.calls.count()).toEqual(1);
        });
    });
});
