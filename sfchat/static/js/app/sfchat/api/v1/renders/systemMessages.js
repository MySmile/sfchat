/**
 * sfchat/api/v1/renders/systemMessages.js: SFChat Api Message Render
 */
define(['jquery'], function($) {

    "use strict";

    var msgTextClass = 'msg-text';

    /**
     * Gets System Message template
     *
     * @return {jQuery}
     */
    var getMessageTmp = function() {
        var result = $('<div>', {'class': 'message system'})
            .append($('<div>', {'class': 'msg-border'}));

        result.append($('<div>', {'class': msgTextClass}));
        result.append($('<div>', {'class': 'msg-border'}));

        return result;
    };

    /**
     * Render Message
     *
     * @param {String} msg
     * @return {jQuery}
     */
    var renderMessage = function(msg) {
        var messageTmp = getMessageTmp();
        $( '.' + msgTextClass, messageTmp).html(msg);

        return messageTmp;
    };

    // api
    return {
        render: renderMessage
    };
});
