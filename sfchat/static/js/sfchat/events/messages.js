/**
 * sfchat/events/messages.js: SFChat Messages Events
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat || !SFChat.api || !SFChat.api.renders 
    || !SFChat.api.storage || !SFChat.api.resources) {
    throw new Error('One of required modules was not loaded.');
} 

if (!SFChat.events) {
    SFChat.events = {};
}
    
if (SFChat.events.messages) {
    throw new Error('Module with name SFChat.events.messages has already exist.');
}

/**
 * SFChat API Message Events
 * 
 * @type {Object}
 */
SFChat.events.messages =  {
    /**
     * Options
     * 
     * @property {Object}   options
     * @property {jQuery}   options.chatBodyDom
     * @property {jQuery}   options.chatTypeDom
     * @property {SFChat.api.client}    options.client
     */
    options: {
        chatBodyDom:    undefined,
        chatTypeDom:    undefined,
        client:         undefined
    },

    /**
     * Render Messages
     * 
     * @property {SFChat.api.renders.systemMessages}
     */
    _renderMessages: SFChat.api.renders.messages,
    
    /**
     * Render System Messages
     * 
     * @property {SFChat.api.renders.messages}
     */
    _renderSystemMessages: SFChat.api.renders.systemMessages,

    /**
     * Storage
     * 
     * @property {SFChat.api.storage}
     */ 
    _storage: SFChat.api.storage,
    
    /**
     * Key for Chat History in the storage
     * 
     * @property {String}
     */
    _chatHistoryKey: 'chatHistory',
        
    /**
     * Messages resource
     * 
     * @property {SFChat.api.resources.messages}
     */
    _messages: undefined,
    
    /**
     * Init
     * 
     * @param {Object} options
     */
    init: function(options) {
        var _this = SFChat.events.messages;
        
        _this.options   = $.extend(_this.options, options);
        _this._messages = new SFChat.api.resources.messages(_this.options.client);
    },
    
    /**
     * Post Message
     * 
     * @param {Event} e
     * @TODO catch exeptions
     */
    postMessage: function(e) {
        var _this = SFChat.events.messages;

        _this._messages.postMessage(_this.options.chatTypeDom.val(), {
            manager: _this.options.chatBodyDom,
            event:  'showPostedMessage'
        });
    },
    
    /**
     * Get Message, long-polling
     * It runs long-polling
     * 
     * @param {Event} e
     * @TODO catch exeptions
     */
    getMessage: function(e) {
        var _this = SFChat.events.messages;

        _this._messages.getMessage({
            manager: _this.options.chatBodyDom,
            event:   'showReceivedMessage'
        });
    },
    
    /**
     * Delete message
     * 
     * @paran {Event}   e
     * @param {Array}   data
     * @param {String}  data[0]._id
     * @param {String}  data[0].msg
     * @param {String}  data[0].created
     * @param {Boolean} data[0].system
     * @throws {Error}
     * @TODO catch exceptions
     */
    deleteMessage: function(e, data) {
        var _this = SFChat.events.messages,
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
     * @param {Integer} response.results.code
     * @param {String}  response.results.msg
     * @throws {Error}
     * @TODO catch exceptions
     */
    showPostedMessage: function(e, request, response) {
        var _this   = SFChat.events.messages,
            created = new Date(),
            msgDom;
                
        if (response.results.code !== 200) {
            throw new Error(response.results.msg);
        }
        
        created = created.toGMTString();
        $.each(request.data.messages, function(key, item){
            item.created    = created;
            msgDom          = _this._renderMessage(item, 'you');
            _this._appendMessage(msgDom);
        });
        
        // clear
        _this.options.chatTypeDom.val('');  
    },
    
    /**
     * Show received messages
     * 
     * @param {Event}       e
     * @param {Undefined}   request
     * @param {Object}      response
     * @param {Object}      response.results
     * @param {Integer}     response.results.code
     * @param {String}      response.results.msg
     * @param {Integer}     response.results.count
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
        var _this   = SFChat.events.messages,
            results = response.results,    
            msgDom;

        if (results.code !== 200 || results.messages.length === 0) {
            // run long-polling
            _this.options.chatBodyDom.trigger('getMessage');
            return;
        }
        
        // display messages
        $.each(results.messages, function(key, item) {
            msgDom = _this._renderMessage(item, 'talker');
            _this._appendMessage(msgDom);   
        });

        // delete messages and run long-polling
        if (results.status !== 'closed') {
            _this.options.chatBodyDom.trigger('deleteMessage', [results.messages]);
        }

        // chat status
        _this.options.chatBodyDom.trigger('setChatStatus', [results.status]);   
    },
    
   /**
    * Show deleted messages
    * 
    * @paran {Event}   e
    * @paran {Object}  request
    * @paran {Object}  request.data
    * @paran {Array}   request.data.messages
    * @paran {Object}  request.data.messages[0]
    * @paran {String}  request.data.messages[0]._id
    * @param {Object}  response
    * @param {Object}  response.results
    * @param {Integer} response.results.code
    * @param {String}  response.results.msg
    * @throws {Error}
    */
    showDeletedMessage: function(e, request, response) {
        var _this = SFChat.events.messages;

        if (response.results.code !== 200) {
            throw new Error(response.results.msg);
        }

        // restart long-polling
        _this.options.chatBodyDom.trigger('getMessage');
    },
    
    /**
     * Show message history
     * 
     * @param {Event} e
     */
    showHistoryMessage: function(e) {
        var _this  = SFChat.events.messages,
        msgHistory = _this._storage.getData(_this._chatHistoryKey);
    
        if (msgHistory === null) {
            return;
        }
        
        _this._appendMessage(msgHistory);
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
        var _this = SFChat.events.messages,
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
        var _this = SFChat.events.messages,
            scrollHeight;

        _this.options.chatBodyDom.append(msgDom);   
        // autoscroll
        scrollHeight = _this.options.chatBodyDom[0].scrollHeight;
        _this.options.chatBodyDom.scrollTop(scrollHeight);
    }
};
