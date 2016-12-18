define([
    'api/storage'
], function (
    storage
) {
    'use strict';

    beforeEach(function() {
        // clear from previously set data
        storage.removeAllData();
    });

    describe('Api->V1->Storage->removeData', function () {
        it('should remove data', function () {
            var key = 'chat';

            // session storage mock
            spyOn(window.sessionStorage, 'removeItem');

            storage.removeData(key);
            expect(window.sessionStorage.removeItem.calls.count()).toEqual(1);
        });
    });
    
    describe('Api->V1->Storage->removeAllData', function () {
        it('should remove all data', function () {
            var key1 = 'chat',
                key2 = 'message';

            // session storage mock
            spyOn(window.sessionStorage, 'removeItem');

            storage.setData(key1, '');
            storage.setData(key2, '');
            storage.removeAllData();
            expect(window.sessionStorage.removeItem.calls.count()).toEqual(2);
        });
    });

    describe('Api->V1->Storage->addData', function () {
        it('should add data', function () {
            var key = 'chat';

            // session storage mock
            spyOn(window.sessionStorage, 'setItem').and.callThrough();

            storage.addData(key, 'data 1');
            storage.addData(key, 'data 2');
            expect(window.sessionStorage.setItem.calls.count()).toEqual(2);
        });
    });

    describe('Api->V1->Storage->getData', function () {
        it('should get data', function () {
            var key = 'chat',
                value = 'value',
                actual;

            // session storage mock
            spyOn(window.sessionStorage, 'setItem').and.callThrough();

            storage.setData(key, value);
            actual = storage.getData(key);
            expect(window.sessionStorage.setItem.calls.count()).toEqual(1);
            expect(actual).toEqual(value);
        });
    });

    describe('Api->V1->Storage->setData', function () {
        it('should set data', function () {
            var key = 'chat',
                value = 'value';

            // session storage mock
            spyOn(window.sessionStorage, 'setItem').and.callThrough();

            storage.setData(key, value);
            expect(window.sessionStorage.setItem.calls.count()).toEqual(1);
        });

        it('should clear data on error and try set again', function () {
            var key = 'chat',
                value = 'value',
                someValue = new Array(2881 + 1).join('#'),
                i = 0;

            // full storage with data
            storage.setData('some-key', someValue);

            // session storage mock
            spyOn(window.sessionStorage, 'setItem').and.callFake(function() {
                if (i === 0) {
                    i++;
                    throw new Error();
                }
            });
            spyOn(window.sessionStorage, 'removeItem');

            storage.setData(key, value);
            expect(window.sessionStorage.setItem.calls.count()).toEqual(2);
            expect(window.sessionStorage.removeItem.calls.count()).toEqual(1);
        });

        it('should throw error', function () {
            var key = 'chat',
                value = 'value',
                someValue = 'some value',
                i = 0;

            // full storage with data
            for(i = 0; i < 41; i++) {
                storage.setData('some-key' + i, someValue);
            }

            // session storage mock
            i = 0;
            spyOn(window.sessionStorage, 'setItem').and.callFake(function() {
                if (i === 0) {
                    i++;
                    throw new Error();
                }
            });
            spyOn(window.sessionStorage, 'removeItem');
            spyOn(window.sessionStorage, 'length').and.returnValue(41);

            expect(function() {
                 storage.setData(key, value);
            }).toThrowError();
            expect(window.sessionStorage.setItem.calls.count()).toEqual(1);
            expect(window.sessionStorage.removeItem.calls.count()).toEqual(0);
        });
    });
});
