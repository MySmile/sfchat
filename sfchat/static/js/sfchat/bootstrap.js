/**
 * sfchat/bootstrap.js: SFChat Bootstrap
 */
define(['jquery',
    'api/client',
    'api/auth',
    'events/messages',
    'events/chat',
    'events/title'

], function($,
            client,
            auth,
            eventMessage,
            eventChat,
            eventTitle
) {

    "use strict";

    /**
     * SFChat bootstrap
     *
     * @type {Function}
     * @param {Object} options
     */
    var bootstrap = function (options) {
        /**
         * Default options
         *
         * @property {Object} options
         * @property {String} options.endPoint
         * @property {String} options.userToken
         * @property {Object} options.chat
         * @property {String} options.chat.targetBody
         * @property {String} options.chat.targetType
         * @property {String} options.chat.targetSend
         * @property {String} options.chat.targetClose
         * @property {String} options.draftClass
         * @property {String} options.chatStatus
         */
        this.options = {
            endPoint:   undefined,
            userToken:  undefined,
            chat: {
                targetBody:     '#chat-body',
                targetType:     '#chat-type textarea',
                targetSend:     '#chat-type .btn',
                targetClose:    '#chat-close'
            },
            draftClass: 'btn-grey',
            chatStatus: undefined
        };

        /**
         * Events
         *
         * @property {Object}
         */
        this.events = {
            // message's events
            postMessage:            eventMessage.postMessage,
            showPostedMessage:      eventMessage.showPostedMessage,
            showHistoryMessage:     eventMessage.showHistoryMessage,

            getMessage:             eventMessage.getMessage,
            showReceivedMessage:    eventMessage.showReceivedMessage,
            deleteMessage:          eventMessage.deleteMessage,
            showDeletedMessage:     eventMessage.showDeletedMessage,

            // chat's events
            deleteChat:             eventChat.deleteChat,
            setChatReady:           eventChat.setChatReady,
            setChatClosed:          eventChat.setChatClosed,
            setChatStatus:          eventChat.setChatStatus,

            // title's events
            showTitle:              eventTitle.showTitle,
            clearTitle:             eventTitle.clearTitle,
            click:                  eventTitle.clearTitle
        };

        this._setOptions(options);

        /**
         * Chat Body DOM
         *
         * @property {jQuery}
         */
        this.chatBodyDom = $(this.options.chat.targetBody);

        /**
         * Type DOM
         *
         * @property {jQuery}
         */
        this.chatTypeDom = $(this.options.chat.targetType);

        /**
         * Send DOM
         *
         * @property {jQuery}
         */
        this.chatSendDom = $(this.options.chat.targetSend);

        /**
         * Api Client
         *
         * @property {Object}
         */
        this.client = undefined;

        // set client
        this._setClient();
        // init event
        this._initEvents();

        // show history messages, set chat status, get messages, long-polling
        this.chatBodyDom
            .trigger('showHistoryMessage')
            .trigger('setChatStatus', [this.options.chatStatus])
            .trigger('getMessage');
    };

    /**
     * Sets options
     *
     * @param {Object} options
     * @throws {TypeError}
     */
    bootstrap.prototype._setOptions = function(options) {
        if (!options && typeof(options) !== 'object') {
            throw new TypeError('Invalid Options type. Object is expected.');
        }

        this.options = $.extend(this.options, options);
    };

    /**
     * Initiate resources
     */
    bootstrap.prototype._setClient = function() {
        var _this = this;

        auth.setUserToken(_this.options.userToken);
        _this.client = new client({
            endPoint: _this.options.endPoint
        });
    };

    /**
     * Init Events
     */
    bootstrap.prototype._initEvents = function() {
        var _this = this;

        // init event options
        eventMessage.init({
            chatBodyDom: _this.chatBodyDom,
            chatTypeDom: _this.chatTypeDom,
            client:      _this.client
        });

        // init event options
        eventChat.init({
            chatBodyDom: _this.chatBodyDom,
            chatTypeDom: _this.chatTypeDom,
            chatSendDom: _this.chatSendDom,
            client:      _this.client,
            draftClass:  _this.options.draftClass
        });

        // init events
        $.each(_this.events, function(key, item){
            _this.chatBodyDom.on(key, item);
        });

        // init chat close
        _this._initChatClose();
    };

    /**
     * Initiate handler for chat close
     */
    bootstrap.prototype._initChatClose = function() {
        var _this = this;

        // click on close
        $(_this.options.chat.targetClose).click(function () {
            _this.chatBodyDom.trigger('deleteChat');
        });
    };

    // api
    return bootstrap;
});
