define([
    'api/auth',
    'events/messages',
    'events/chat',
    'sfchat/bootstrap',
    'text!fixtures/chat.active.html'
], function (
    auth,
    eventMessage,
    eventChat,
    bootstrap,
    chatActiveFixture
) {

    'use strict';

    beforeEach(function() {
        // dom element mock
        setFixtures(chatActiveFixture);
    });

    describe('Bootstrap->_setOptions', function () {
        it('should init options', function () {
            var options = {
                endPoint: '//sfchat.mysmile.com.ua/api',
                userToken: '584bda2255e43001321cb123',
                chatStatus: 'draft'
            },
            bootstrapObj;

            // auth
            spyOn(auth, 'setUserToken');

            // event message
            spyOn(eventMessage, 'init');

            // event chat
            spyOn(eventChat, 'init');

            bootstrapObj = new bootstrap(options);
            expect(bootstrapObj.options.endPoint).toEqual(options.endPoint);
            expect(bootstrapObj.options.userToken).toEqual(options.userToken);
            expect(bootstrapObj.options.chatStatus).toEqual(options.chatStatus);

            expect(eventMessage.init.calls.count()).toEqual(1);
            expect(eventChat.init.calls.count()).toEqual(1);

            expect(auth.setUserToken.calls.count()).toEqual(1);
            expect(auth.setUserToken.calls.argsFor(0)).toEqual([options.userToken]);
        });
    });
});
