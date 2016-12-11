define([
    'sfchat/sfchat',
    'sfchat/errorHandler',
    'text!fixtures/chat.active.html'
], function (
    sfChat,
    errorHandler,
    chatActiveFixture
) {

   'use strict';
    
    beforeEach(function() {
        var errorHandlerOptions;

        // dom element mock
        setFixtures(chatActiveFixture);

        // init error handler
        errorHandlerOptions = {
            targetError: $j('#error-general'),
            hideClass: 'hide',
            targetHeader: $j('#chat-header'),
            errorHeaderClass: 'error-header'
        };

        errorHandler.init(errorHandlerOptions);
    });

    describe('ErrorHandler->onError', function () {
        it('should send js error to GA', function () {
            var msg = 'Erro message',
                url = 'https://sfchat.dev',
                line = 12,
                actual;

            // error handler mock
            spyOn(errorHandler, 'showError');

            actual = errorHandler.onError(msg, url, line);
            expect(actual).toBeTruthy();
            expect(errorHandler.showError.calls.count()).toEqual(1);
        });
    });

    describe('ErrorHandler->showError', function () {
        it('should show error 500', function () {
            var error = {
                code: 500,
                msg: 'Uncaught Error: Internal front-end error.'
            };

            // dom
            spyOn(errorHandler.options.targetError, 'text').and.returnValue(errorHandler.options.targetError);
            spyOn(errorHandler.options.targetError, 'removeClass').and.callThrough();
            spyOn(errorHandler.options.targetHeader, 'addClass').and.callThrough();

            errorHandler.showError(JSON.stringify(error));
            expect(errorHandler.options.targetError.text.calls.count()).toEqual(1);
            expect(errorHandler.options.targetError.text.calls.argsFor(0)).toEqual(
                ['Unexpected error was detected. Internal front-end error. Please refresh page and try again later.']
            );

            expect(errorHandler.options.targetError.removeClass.calls.count()).toEqual(1);
            expect(errorHandler.options.targetError.removeClass.calls.argsFor(0)).toEqual([errorHandler.options.hideClass]);

            expect(errorHandler.options.targetHeader.addClass.calls.count()).toEqual(1);
            expect(errorHandler.options.targetHeader.addClass.calls.argsFor(0)).toEqual([errorHandler.options.errorHeaderClass]);
        });

        it('should skip broken error message', function () {
            var error = '{"code": "500", "msg": "Uncaught Error: Internal front-end error.}';

            // dom
            spyOn(errorHandler.options.targetError, 'text');
            spyOn(errorHandler.options.targetError, 'removeClass');
            spyOn(errorHandler.options.targetHeader, 'addClass');

            errorHandler.showError(error);
            expect(errorHandler.options.targetError.text.calls.count()).toEqual(0);
            expect(errorHandler.options.targetError.removeClass.calls.count()).toEqual(0);
            expect(errorHandler.options.targetHeader.addClass.calls.count()).toEqual(0);
        });
    });
});
