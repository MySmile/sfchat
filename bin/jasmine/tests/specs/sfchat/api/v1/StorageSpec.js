define([
    'api/storage'
], function (
    storage
) {
    'use strict';

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
            spyOn(window.sessionStorage, 'setItem');

            storage.addData(key, 'data 1');
            storage.addData(key, 'data 2');
            expect(window.sessionStorage.setItem.calls.count()).toEqual(2);
        });
    });
});
