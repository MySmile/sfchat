/**
 * sfchat/events/messages.js: SFChat Messages Events
 */
define(['jquery',
    'api/storage',
    'api/resources/messages',
    'api/renders/messages',
    'api/renders/systemMessages'

    ], function($,
                storage,
                resourceMessage,
                renderMessage,
                renderSystemMessage
) {

    "use strict";

    /**
     * SFChat API Message Events
     *
     * @type {Object}
     */
    var eventMessage =  {
        /**
         * Options
         *
         * @property {Object}   options
         * @property {jQuery}   options.chatBodyDom
         * @property {jQuery}   options.chatTypeDom
         * @property {Object}   options.client
         */
        options: {
            chatBodyDom:    undefined,
            chatTypeDom:    undefined,
            client:         undefined
        },

        /**
         * Error messages
         *
         * @property {Object} msgError
         * @property {Number} msgError[].code HTTPCode/10
         * @property {String} msgError[].msg
         */
        msgError: {
            wrongUnique: JSON.stringify({code: 50, msg: 'Duplication message was returned from server.'})
        },

        /**
         * Render Messages
         *
         * @property {Object}
         */
        _renderMessages: renderMessage,

        /**
         * Render System Messages
         *
         * @property {Object}
         */
        _renderSystemMessages: renderSystemMessage,

        /**
         * Storage
         *
         * @property {Object}
         */
        _storage: storage,

        /**
         * Key for Chat History in the storage
         *
         * @property {String}
         */
        _chatHistoryKey: 'chatHistory',

        /**
         * Deleted messages id's
         *
         * @property {Array}
         */
        _deletedMessages: [],

        /**
         * Messages resource
         *
         * @property {Object}
         */
        _messages: undefined,

        /**
         * Init
         *
         * @param {Object} options
         */
        init: function(options) {
            var _this = eventMessage;

            _this.options   = $.extend(_this.options, options);
            _this._messages = new resourceMessage(_this.options.client);
        },

        /**
         * Post Message
         *
         * @param {Event} e
         * @TODO catch exceptions
         */
        postMessage: function(e) {
            var _this   = eventMessage,
                msg     = _this.options.chatTypeDom.val();

            // skip sending empty message
            if(msg.trim().length === 0) {
                return;
            }

            _this._messages.postMessage(msg, {
                manager: _this.options.chatBodyDom,
                event:  'showPostedMessage'
            });
        },

        /**
         * Get Message, long-polling
         * It runs long-polling
         *
         * @param {Event} e
         * @TODO catch exceptions
         */
        getMessage: function(e) {
            var _this = eventMessage;

            _this._messages.getMessage({
                manager: _this.options.chatBodyDom,
                event:   'showReceivedMessage'
            });
        },

        /**
         * Delete message
         *
         * @param {Event}   e
         * @param {Array}   data
         * @param {String}  data[0]._id
         * @param {String}  data[0].msg
         * @param {String}  data[0].created
         * @param {Boolean} data[0].system
         * @throws {Error}
         * @TODO catch exceptions
         */
        deleteMessage: function(e, data) {
            var _this = eventMessage,
                dataRequest;

            // prepare data
            dataRequest = { data:{ messages:[] }};
            $.each(data, function(key, item) {
                dataRequest.data.messages.push({
                    _id: item._id
                });
            });

            // run delete
            _this._messages.deleteMessage(dataRequest, {
                manager: _this.options.chatBodyDom,
                event:   'showDeletedMessage'
            });
        },

        /**
         * Show message
         *
         * @param {Event}   e
         * @param {Object}  request
         * @param {Object}  request.data
         * @param {Array}   request.data.messages
         * @param {Object}  request.data.messages[0]
         * @param {String}  request.data.messages[0].msg
         * @param {Object}  response
         * @param {Object}  response.results
         * @param {Number} response.results.code
         * @param {String}  response.results.msg
         * @throws {Error}
         */
        showPostedMessage: function(e, request, response) {
            var _this   = eventMessage,
                created = new Date(),
                msgDom;

            _this._responseErrorDetected(response);

            created = created.toGMTString();
            $.each(request.data.messages, function(key, item){
                item.created    = created;
                msgDom          = _this._renderMessage(item, 'you');
                _this._appendMessage(msgDom);
            });

            // clear
            _this.options.chatTypeDom.val('');
            _this.options.chatBodyDom.trigger('clearTitle');

        },

        /**
         * Show received messages
         *
         * @param {Event}       e
         * @param {Undefined}   request
         * @param {Object}      response
         * @param {Object}      response.results
         * @param {Number}      response.results.code
         * @param {String}      response.results.msg
         * @param {Number}      response.results.count
         * @param {String}      response.results.status
         * @param {Array}       response.results.messages
         * @param {Object}      response.results.messages[0]
         * @param {String}      response.results.messages[0]._id
         * @param {String}      response.results.messages[0].msg
         * @param {String}      response.results.messages[0].created
         * @param {Boolean}     response.results.messages[0].system
         * @throws {Error}
         * @TODO catch exceptions
         */
        showReceivedMessage: function(e, request, response) {
            var _this       = eventMessage,
                results     = response.results,
                msgCount    = 0,
                msgDom;

            // authorization error
            _this._responseErrorDetected(response);

            // run long-polling
            if (results.status !== 'closed' && results.messages.length === 0) {
                _this.options.chatBodyDom.trigger('getMessage');
                return;
            }

            // display messages
            $.each(results.messages, function(key, item) {
                if ($.inArray(item._id, _this._deletedMessages) === -1) {
                    msgDom = _this._renderMessage(item, 'talker');
                    _this._appendMessage(msgDom);
                    msgCount++;
                }
            });

            // delete messages, run long-polling and show notifier on the document title
            if (results.status !== 'closed') {
                _this.options.chatBodyDom.trigger('showTitle', [msgCount]);
                _this.options.chatBodyDom.trigger('deleteMessage', [results.messages]);
            }

            // chat status
            _this.options.chatBodyDom.trigger('setChatStatus', [results.status]);
        },

       /**
        * Show deleted messages
        *
        * @param {Event}   e
        * @param {Object}  request
        * @param {Object}  request.data
        * @param {Array}   request.data.messages
        * @param {Object}  request.data.messages[0]
        * @param {String}  request.data.messages[0]._id
        * @param {Object}  response
        * @param {Object}  response.results
        * @param {Number}  response.results.code
        * @param {String}  response.results.msg
        * @throws {Error}
        */
        showDeletedMessage: function(e, request, response) {
            var _this = eventMessage;

            _this._responseErrorDetected(response);
            // save message id to prevent displaying duplication
            _this._saveDeleteMessage(request);
            // restart long-polling
            _this.options.chatBodyDom.trigger('getMessage');
        },

        /**
         * Show message history
         *
         * @param {Event} e
         */
        showHistoryMessage: function(e) {
            var _this  = eventMessage,
            msgHistory = _this._storage.getData(_this._chatHistoryKey);
            // @TODO find out better fix to not show duplication history on Android 2.3
            if (msgHistory === null || _this.options.chatBodyDom.text() !== '') {
                return;
            }

            _this._appendMessage(msgHistory);
        },

        /**
         * Detect response error
         *
         * @param {Object} response
         * @throws {Error}
         */
        _responseErrorDetected: function(response) {
            if (response.results.code !== 200) {
                throw new Error(JSON.stringify(response.results));
            }
        },

        /**
         * Render response message
         * Save data to history
         *
         * @param {Object}  data
         * @param {String}  data._id
         * @param {String}  data.msg
         * @param {String}  data.created
         * @param {Boolean} data.system
         * @param {String}  msgSource
         * @return {jQuery}
         */
        _renderMessage: function(data, msgSource) {
            var _this = eventMessage,
                renderMsg,
                result;

            renderMsg = (data.system)? _this._renderSystemMessages: _this._renderMessages;
            result    = renderMsg.render(data.msg, data.created, msgSource);

            // save to history
            _this._storage.addData(_this._chatHistoryKey, result.get(0).outerHTML);

            return result;
        },

        /**
         * Append message to chat body
         *
         * @param {jQuery} msgDom
         */
        _appendMessage: function(msgDom) {
            var _this = eventMessage,
                scrollHeight;

            _this.options.chatBodyDom.append(msgDom);
            // auto scroll
            scrollHeight = _this.options.chatBodyDom[0].scrollHeight;
            _this.options.chatBodyDom.scrollTop(scrollHeight);
        },

       /**
        * Save deleted messages id to prevent duplication messages on a chat
        * It's possible to receive twice one message if delete message event was failed
        *
        * @param {Object}  request
        * @param {Object}  request.data
        * @param {Array}   request.data.messages
        * @param {Object}  request.data.messages[0]
        * @param {String}  request.data.messages[0]._id
        */
        _saveDeleteMessage: function(request) {
            var _this = this;

            $.each(request.data.messages, function(key, item){
                if ($.inArray(item._id, _this._deletedMessages) === -1) {
                    _this._deletedMessages.push(item._id);
                }
            });
        }
    };

    // api
    return eventMessage;
});
