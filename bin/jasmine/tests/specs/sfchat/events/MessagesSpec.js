define([
    'events/messages',
    'text!fixtures/chat.active.html',
    'text!fixtures/chat.message.html'
], function (
    messages,
    chatActiveFixture,
    chatMessageFixture
) {

    'use strict';

    var storageMock;

    var resourceMessageMock;

    var renderMessageMock;

    var renderSystemMessageMock;

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
        messages._storage = storageMock;

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

        // render message mock
        renderMessageMock = {
            render: function(msg, date, msgSource) {

            }
        };
        messages._renderMessages = renderMessageMock;

        // render system message mock
        renderSystemMessageMock = {
            render: function(msg) {

            }
        };
        messages._renderSystemMessages = renderSystemMessageMock;
    });


    describe('Event->Messages->init', function () {
         it('should init object', function () {
             var options = {
                 chatBodyDom: 'chatBodyDom',
                 chatTypeDom: 'chatTypeDom',
                 client: 'client'
             };

             messages.init(options);
             expect(messages.options).toEqual(options);
             expect(messages._messages).not.toBeUndefined();
         });
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
            expect(resourceMessageMock.postMessage.calls.argsFor(0)).toEqual([messageVal, {
                manager: messages.options.chatBodyDom,
                event:  'showPostedMessage'
            }]);
        });
    });

    describe('Event->Messages->getMessage', function () {

        it('should get messages', function () {
            // resource message mock
            spyOn(resourceMessageMock, 'getMessage');

            messages.getMessage();
            expect(resourceMessageMock.getMessage.calls.count()).toEqual(1);
            expect(resourceMessageMock.getMessage.calls.argsFor(0)).toEqual([{
                manager: messages.options.chatBodyDom,
                event:  'showReceivedMessage'
            }]);
        });
    });

    describe('Event->Messages->deleteMessage', function () {

        it('should delete messages', function () {
            var eventMock = {},
                data = [{
                    "_id": "5845301c55e4307073b4028d",
                    "msg": "Hi, how are you doing?",
                    "system": false

                }];

            // resource message mock
            spyOn(resourceMessageMock, 'deleteMessage');

            messages.deleteMessage(eventMock, data);
            expect(resourceMessageMock.deleteMessage.calls.count()).toEqual(1);
            expect(resourceMessageMock.deleteMessage.calls.argsFor(0)).toEqual([
                {
                    data: {
                        messages: [{'_id': data[0]['_id']}]
                    }
                }, {
                    manager: messages.options.chatBodyDom,
                    event:  'showDeletedMessage'
            }]);
        });
    });

    describe('Event->Messages->showPostedMessage', function () {

        it('should show posted messages', function () {
            var eventMock = {},
                request = {
                    data: {
                        messages: [{
                            msg: 'Hello SFChat!'
                        }]
                    }
                },
                response = {
                    results: {
                        code: 200
                    }
                },
                chatMessage = $j(chatMessageFixture);
            
            // message text
            spyOn(messages.options.chatTypeDom, 'val');
            spyOn(messages.options.chatBodyDom, 'trigger');
            spyOn(messages.options.chatBodyDom, 'append');
            spyOn(messages.options.chatBodyDom, 'scrollTop');

            // render message mock
            spyOn(renderMessageMock, 'render').and.returnValue(chatMessage);

            // render system message mock
            spyOn(renderSystemMessageMock, 'render');

            // storage mock
            spyOn(storageMock, 'addData');

            messages.showPostedMessage(eventMock, request, response);
            expect(messages.options.chatTypeDom.val.calls.count()).toEqual(1);
            expect(messages.options.chatTypeDom.val.calls.argsFor(0)).toEqual(['']);

            expect(messages.options.chatBodyDom.trigger.calls.count()).toEqual(1);
            expect(messages.options.chatBodyDom.trigger.calls.argsFor(0)).toEqual(['clearTitle']);
            expect(messages.options.chatBodyDom.append.calls.count()).toEqual(1);
            expect(messages.options.chatBodyDom.append.calls.argsFor(0)).toEqual([chatMessage]);
            expect(messages.options.chatBodyDom.scrollTop.calls.count()).toEqual(1);
            expect(messages.options.chatBodyDom.scrollTop.calls.argsFor(0)).toEqual([messages.options.chatBodyDom[0].scrollHeight]);

            expect(renderMessageMock.render.calls.count()).toEqual(1);
            expect(renderSystemMessageMock.render.calls.count()).toEqual(0);

            expect(storageMock.addData.calls.count()).toEqual(1);
        });

        it('should show system messages', function () {
            var eventMock = {},
                request = {
                    data: {
                        messages: [{
                            msg: 'Hello SFChat!',
                            system: true
                        }]
                    }
                },
                response = {
                    results: {
                        code: 200
                    }
                },
                chatMessage = $j(chatMessageFixture);

            // message text
            spyOn(messages.options.chatTypeDom, 'val');
            spyOn(messages.options.chatBodyDom, 'trigger');
            spyOn(messages.options.chatBodyDom, 'append');
            spyOn(messages.options.chatBodyDom, 'scrollTop');

            // render message mock
            spyOn(renderMessageMock, 'render');

            // render system message mock
            spyOn(renderSystemMessageMock, 'render').and.returnValue(chatMessage);

            // storage mock
            spyOn(storageMock, 'addData');

            messages.showPostedMessage(eventMock, request, response);
            expect(messages.options.chatTypeDom.val.calls.count()).toEqual(1);
            expect(messages.options.chatTypeDom.val.calls.argsFor(0)).toEqual(['']);

            expect(messages.options.chatBodyDom.trigger.calls.count()).toEqual(1);
            expect(messages.options.chatBodyDom.trigger.calls.argsFor(0)).toEqual(['clearTitle']);
            expect(messages.options.chatBodyDom.append.calls.count()).toEqual(1);
            expect(messages.options.chatBodyDom.append.calls.argsFor(0)).toEqual([chatMessage]);
            expect(messages.options.chatBodyDom.scrollTop.calls.count()).toEqual(1);
            expect(messages.options.chatBodyDom.scrollTop.calls.argsFor(0)).toEqual([messages.options.chatBodyDom[0].scrollHeight]);

            expect(renderMessageMock.render.calls.count()).toEqual(0);
            expect(renderSystemMessageMock.render.calls.count()).toEqual(1);

            expect(storageMock.addData.calls.count()).toEqual(1);
        });

        it('should throw error', function () {
            var eventMock = {},
                request = {
                    data: {
                        messages: [{
                            msg: 'Hello SFChat!',
                            system: true
                        }]
                    }
                },
                response = {
                    results: {
                        code: 500
                    }
                };

            // message text
            spyOn(messages.options.chatTypeDom, 'val');
            spyOn(messages.options.chatBodyDom, 'trigger');

            // render message mock
            spyOn(renderMessageMock, 'render');

            // render system message mock
            spyOn(renderSystemMessageMock, 'render');

            // storage mock
            spyOn(storageMock, 'addData');

            expect(function() {
                messages.showPostedMessage(eventMock, request, response);
            }).toThrowError();
            expect(messages.options.chatTypeDom.val.calls.count()).toEqual(0);
            expect(messages.options.chatBodyDom.trigger.calls.count()).toEqual(0);

            expect(renderMessageMock.render.calls.count()).toEqual(0);
            expect(renderSystemMessageMock.render.calls.count()).toEqual(0);

            expect(storageMock.addData.calls.count()).toEqual(0);
        });
    });

    describe('Event->Messages->showReceivedMessage', function () {
        it('should start long-polling', function () {
            var eventMock = {},
                request = {
                    data: {
                        messages: []
                    }
                },
                response = {
                    results: {
                        code: 200,
                        messages: [],
                        status: 'ready'
                    }
                };

            // message text
            spyOn(messages.options.chatBodyDom, 'trigger');

            messages.showReceivedMessage(eventMock, request, response);
            expect(messages.options.chatBodyDom.trigger.calls.count()).toEqual(1);
            expect(messages.options.chatBodyDom.trigger.calls.argsFor(0)).toEqual(['getMessage']);

        });

         it('should show messages', function () {
             var eventMock = {},
                request = {
                    data: {
                        messages: []
                    }
                },
                response = {
                    results: {
                        code: 200,
                        messages: [{
                            _id: "5845301c55e4307073b4028d",
                            msg: 'Hello SFChat!',
                            system: false
                        }, {
                            _id: "5845301c55e4307073b40288",
                            msg: 'Hello SFChat!',
                            system: true
                        }],
                        status: 'ready'
                    }
                },
                chatMessage = $j(chatMessageFixture);

             // message text
             spyOn(messages.options.chatBodyDom, 'append');
             spyOn(messages.options.chatBodyDom, 'scrollTop');

             // render message mock
             spyOn(renderMessageMock, 'render').and.returnValue(chatMessage);

             // render system message mock
             spyOn(renderSystemMessageMock, 'render').and.returnValue(chatMessage);

             // storage mock
             spyOn(storageMock, 'addData');

             // message text
             spyOn(messages.options.chatBodyDom, 'trigger');

             messages.showReceivedMessage(eventMock, request, response);
             expect(renderMessageMock.render.calls.count()).toEqual(1);
             expect(renderSystemMessageMock.render.calls.count()).toEqual(1);

             expect(storageMock.addData.calls.count()).toEqual(2);

             expect(messages.options.chatBodyDom.trigger.calls.count()).toEqual(3);
             expect(messages.options.chatBodyDom.trigger.calls.argsFor(0)).toEqual(['showTitle', [response.results.messages.length]]);
             expect(messages.options.chatBodyDom.trigger.calls.argsFor(1)).toEqual(['deleteMessage', [response.results.messages]]);
             expect(messages.options.chatBodyDom.trigger.calls.argsFor(2)).toEqual(['setChatStatus', [response.results.status]]);

             expect(messages.options.chatBodyDom.append.calls.count()).toEqual(2);
             expect(messages.options.chatBodyDom.append.calls.argsFor(0)).toEqual([chatMessage]);
             expect(messages.options.chatBodyDom.append.calls.argsFor(1)).toEqual([chatMessage]);
             expect(messages.options.chatBodyDom.scrollTop.calls.count()).toEqual(2);
             expect(messages.options.chatBodyDom.scrollTop.calls.argsFor(0)).toEqual([messages.options.chatBodyDom[0].scrollHeight]);
             expect(messages.options.chatBodyDom.scrollTop.calls.argsFor(1)).toEqual([messages.options.chatBodyDom[0].scrollHeight]);
         });

        it('should show closed chat messages', function () {
            var eventMock = {},
                request = {
                    data: {
                        messages: []
                    }
                },
                response = {
                    results: {
                        code: 200,
                        messages: [{
                            _id: "5845301c55e4307073b4028d",
                            msg: 'Hello SFChat!',
                            system: false
                        }, {
                            _id: "5845301c55e4307073b40288",
                            msg: 'Hello SFChat!',
                            system: true
                        }],
                        status: 'closed'
                    }
                };

            // render message mock
            spyOn(renderMessageMock, 'render').and.returnValue($j(chatMessageFixture));

            // render system message mock
            spyOn(renderSystemMessageMock, 'render').and.returnValue($j(chatMessageFixture));

            // storage mock
            spyOn(storageMock, 'addData');

             // message text
            spyOn(messages.options.chatBodyDom, 'trigger');

            messages.showReceivedMessage(eventMock, request, response);
            expect(renderMessageMock.render.calls.count()).toEqual(1);
            expect(renderSystemMessageMock.render.calls.count()).toEqual(1);

            expect(storageMock.addData.calls.count()).toEqual(2);

            expect(messages.options.chatBodyDom.trigger.calls.count()).toEqual(1);
            expect(messages.options.chatBodyDom.trigger.calls.argsFor(0)).toEqual(['setChatStatus', [response.results.status]]);
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

            // message text
            spyOn(messages.options.chatBodyDom, 'trigger');

            // render message mock
            spyOn(renderMessageMock, 'render');

            // render system message mock
            spyOn(renderSystemMessageMock, 'render');

            // storage mock
            spyOn(storageMock, 'addData');

            expect(function() {
                messages.showReceivedMessage(eventMock, request, response);
            }).toThrowError();
            expect(messages.options.chatBodyDom.trigger.calls.count()).toEqual(0);

            expect(renderMessageMock.render.calls.count()).toEqual(0);
            expect(renderSystemMessageMock.render.calls.count()).toEqual(0);

            expect(storageMock.addData.calls.count()).toEqual(0);
        });
    });

    describe('Event->Messages->showDeletedMessage', function () {
        
        it('should show deleted messages', function () {
            var eventMock = {},
                request = {
                    data: {
                         messages: [{
                            _id: "5845301c55e4307073b4028d",
                            msg: 'Hello SFChat!',
                            system: false
                        }, {
                            _id: "5845301c55e4307073b40288",
                            msg: 'Hello SFChat!',
                            system: true
                        }]
                    }
                },
                response = {
                    results: {
                        code: 200
                    }
                };

            // message text
            spyOn(messages.options.chatBodyDom, 'trigger');

            messages.showDeletedMessage(eventMock, request, response);
            expect(messages.options.chatBodyDom.trigger.calls.count()).toEqual(1);
            expect(messages.options.chatBodyDom.trigger.calls.argsFor(0)).toEqual(['getMessage']);

            $j.each(request.data.messages, function(key, item) {
                expect(messages._deletedMessages).toContain(item._id);
            });
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

            // message text
            spyOn(messages.options.chatBodyDom, 'trigger');

            expect(function() {
                messages.showDeletedMessage(eventMock, request, response);
            }).toThrowError();
            expect(messages.options.chatBodyDom.trigger.calls.count()).toEqual(0);
        });
    });

    describe('Event->Messages->showDeletedMessage', function () {

        it('should show history messages', function () {
            var chatMessage = $j(chatMessageFixture);

            // message text
            spyOn(messages.options.chatBodyDom, 'append');
            spyOn(messages.options.chatBodyDom, 'text').and.returnValue('');
            spyOn(messages.options.chatBodyDom, 'scrollTop');

            // storage mock
            spyOn(storageMock, 'getData').and.returnValue(chatMessage);

            messages.showHistoryMessage();
            expect(messages.options.chatBodyDom.text.calls.count()).toEqual(1);
            expect(messages.options.chatBodyDom.append.calls.count()).toEqual(1);
            expect(messages.options.chatBodyDom.append.calls.argsFor(0)).toEqual([chatMessage]);
            expect(messages.options.chatBodyDom.scrollTop.calls.count()).toEqual(1);
            expect(messages.options.chatBodyDom.scrollTop.calls.argsFor(0)).toEqual([messages.options.chatBodyDom[0].scrollHeight]);

            expect(storageMock.getData.calls.count()).toEqual(1);
        });

        it('should skip empty history messages', function () {
            // message text
            spyOn(messages.options.chatBodyDom, 'append');
            spyOn(messages.options.chatBodyDom, 'scrollTop');
            spyOn(messages.options.chatBodyDom, 'text').and.returnValue('');

            // storage mock
            spyOn(storageMock, 'getData').and.returnValue(null);

            messages.showHistoryMessage();
            expect(messages.options.chatBodyDom.append.calls.count()).toEqual(0);
            expect(messages.options.chatBodyDom.scrollTop.calls.count()).toEqual(0);

            expect(storageMock.getData.calls.count()).toEqual(1);
        });

        it('should skip duplication history messages', function () {
            var chatMessage = $j(chatMessageFixture);

            // message text
            spyOn(messages.options.chatBodyDom, 'append');
            spyOn(messages.options.chatBodyDom, 'scrollTop');
            spyOn(messages.options.chatBodyDom, 'text').and.returnValue('test');

            // storage mock
            spyOn(storageMock, 'getData').and.returnValue(chatMessage);

            messages.showHistoryMessage();
            expect(messages.options.chatBodyDom.append.calls.count()).toEqual(0);
            expect(messages.options.chatBodyDom.scrollTop.calls.count()).toEqual(0);

            expect(storageMock.getData.calls.count()).toEqual(1);
        });
    });
});
