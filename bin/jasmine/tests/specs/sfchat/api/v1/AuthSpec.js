define([
    'api/storage',
    'api/auth'
], function (
    storage,
    auth
) {
    'use strict';

    describe('Api->V1->Auth->authenticate', function () {
        it('should get current user', function () {
            var currentUser,
                chatToken = '584bce4c55e43001321cb112',
                userToken = '674bce4c55e47001321cb149';

            // storage mock
            spyOn(storage, 'getChatToken').and.returnValue(chatToken);
            spyOn(storage, 'getData').and.returnValue(userToken);

            currentUser = auth.authenticate();
            expect(storage.getChatToken.calls.count()).toEqual(1);
            expect(storage.getData.calls.count()).toEqual(1);
            expect(storage.getData.calls.argsFor(0)).toEqual(['userToken']);

            expect(currentUser.chatToken).toEqual(chatToken);
            expect(currentUser.userToken).toEqual(userToken);
        });

        it('should throw error on empty chat token', function () {
            var chatToken = null,
                userToken = '674bce4c55e47001321cb149',
                currentUser;

            // storage mock
            spyOn(storage, 'getChatToken').and.returnValue(chatToken);
            spyOn(storage, 'getData').and.returnValue(userToken);

            expect(function() {
                currentUser = auth.authenticate();
                expect(currentUser.code).toEqual(40.3);
                expect(currentUser.msg).toEqual('Authentication failed.');
            }).toThrowError();

            expect(storage.getChatToken.calls.count()).toEqual(1);
            expect(storage.getData.calls.count()).toEqual(1);
            expect(storage.getData.calls.argsFor(0)).toEqual(['userToken']);
        });

        it('should throw error on empty user token', function () {
            var chatToken = '584bce4c55e43001321cb112',
                userToken = null,
                currentUser;

            // storage mock
            spyOn(storage, 'getChatToken').and.returnValue(chatToken);
            spyOn(storage, 'getData').and.returnValue(userToken);

            expect(function() {
                currentUser = auth.authenticate();
                expect(currentUser.code).toEqual(40.3);
                expect(currentUser.msg).toEqual('Authentication failed.');
            }).toThrowError();

            expect(storage.getChatToken.calls.count()).toEqual(1);
            expect(storage.getData.calls.count()).toEqual(1);
            expect(storage.getData.calls.argsFor(0)).toEqual(['userToken']);
        });

        it('should throw error on invalid chat token', function () {
            var chatToken = '123',
                userToken = '674bce4c55e47001321cb149',
                currentUser;

            // storage mock
            spyOn(storage, 'getChatToken').and.returnValue(chatToken);
            spyOn(storage, 'getData').and.returnValue(userToken);

            expect(function() {
                currentUser = auth.authenticate();
                expect(currentUser.code).toEqual(40.3);
                expect(currentUser.msg).toEqual('Authentication failed.');
            }).toThrowError();

            expect(storage.getChatToken.calls.count()).toEqual(1);
            expect(storage.getData.calls.count()).toEqual(1);
            expect(storage.getData.calls.argsFor(0)).toEqual(['userToken']);
        });
    });

    describe('Api->V1->Auth->setUserToken', function () {
        it('should set user token', function () {
            var userToken = '674bce4c55e47001321cb149',
                prevUserToken = '974bce4c54e47001321cb140';

            // storage mock
            spyOn(storage, 'getData').and.returnValue(prevUserToken);
            spyOn(storage, 'removeAllData');
            spyOn(storage, 'setData');

            auth.setUserToken(userToken);
            expect(storage.getData.calls.count()).toEqual(1);
            expect(storage.getData.calls.argsFor(0)).toEqual(['userToken']);

            expect(storage.removeAllData.calls.count()).toEqual(1);

            expect(storage.setData.calls.count()).toEqual(1);
            expect(storage.setData.calls.argsFor(0)).toEqual(['userToken', userToken]);
        });

        it('should skip false user token', function () {
            var userToken = 'False';

            // storage mock
            spyOn(storage, 'getData');
            spyOn(storage, 'removeAllData');
            spyOn(storage, 'setData');

            auth.setUserToken(userToken);
            expect(storage.getData.calls.count()).toEqual(0);
            expect(storage.removeAllData.calls.count()).toEqual(0);
            expect(storage.setData.calls.count()).toEqual(0);
        });

        it('should skip invalid user token', function () {
            var userToken = '123';

            // storage mock
            spyOn(storage, 'getData');
            spyOn(storage, 'removeAllData');
            spyOn(storage, 'setData');

            auth.setUserToken(userToken);
            expect(storage.getData.calls.count()).toEqual(0);
            expect(storage.removeAllData.calls.count()).toEqual(0);
            expect(storage.setData.calls.count()).toEqual(0);
        });
    });

    describe('Api->V1->Auth->removeUserToken', function () {
        it('should remove user token', function () {
            // storage mock
            spyOn(storage, 'removeData');

            auth.removeUserToken();
            expect(storage.removeData.calls.count()).toEqual(1);
            expect(storage.removeData.calls.argsFor(0)).toEqual(['userToken']);
        });
    });
});
