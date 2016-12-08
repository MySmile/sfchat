define([
    'api/client',
    'jasmine-ajax'
], function (
    client
) {
    'use strict';

    var endPoint = 'http://test.dev';

    var apiClient;

    var managerMock;

    var authMock;

    beforeEach(function() {
        managerMock = jasmine.createSpyObj('manager', ['trigger']);
        authMock = {
            authenticate: function() {
            }
        };

        apiClient = new client({
            endPoint: endPoint
        });
        spyOn(apiClient, '_getAuth').and.callFake(function() {
            return authMock;
        });

        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    describe('Api->V1->Client->setOptions', function () {
        it('should throw error', function () {
            var options = '';

            expect(function() {
                apiClient.setOptions(options);
            }).toThrowError();
        });
    });

    describe('Api->V1->Client->sendRequest', function () {
        it('should send request', function () {
            var eventOptions = {
                manager: managerMock,
                event: 'testEvent'
            },
            currentUser = {
                chatToken: 'chat-token',
                userToken: 'user-token'
            },
            type = 'GET',
            resource = 'test',
            data = {};

            // auth mock
            spyOn(authMock, 'authenticate').and.returnValue(currentUser);

            apiClient.sendRequest(type, resource, data, eventOptions);
            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200,
                'contentType': 'application/json',
                'responseText': '{"results":{"code":200,"msg":"Ok","count":1,"status":"ready","messages":[{"_id":"58494adf55e43003411cb0ef","msg":"Talker was successfully joined to chat","system":true}]}}'
            });

            expect(authMock.authenticate.calls.count()).toEqual(1);
            expect(managerMock.trigger.calls.count()).toEqual(1);
            expect(managerMock.trigger.calls.argsFor(0)).toEqual([eventOptions.event, jasmine.any(Object)]);
        });
    });
});
