define(
    [
        'backbone'
        ,'core'
        ,'./controller'
        ,'./views/main/view'
        ,'./views/menu/view'
        ,'./config'
    ],
    function(
        Backbone
        ,Core
        ,controller
        ,mainView
        ,menuView
        ,config
    ) {

    var App = {

        _timerId: 0,
        serversLoad: $.Deferred(),

        __init: function() {
            var _this = this;

            this.registerView('main', function() {
                return new mainView({
                                model: _this,
                                container: '.j-wrapper'
                            });
            });

            this.registerView('menu', function() {
                return new menuView({
                                model: _this
                            });
            });

            this.addInitializer(function() {
                $.extend($.gritter.options, {
                    position: 'bottom-right'
                    ,time: 1500
                    ,fade_in_speed: 'medium'
                    ,fade_out_speed: 800
                    ,class_name: 'gritter-light'
                });
            });
        },

        _controllers: function() {
            return new controller;
        },

        message: function(title, text, options) {
            options = options || {};
            options.title = title;
            options.text = text;
            $.gritter.add(options);
        },

        getConfig: function() {
            return config;
        },

        servers: function() {
            return this.collection('Server');
        },
    }

    return Core.Application.extend(App);
})
