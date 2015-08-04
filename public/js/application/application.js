define(
    [
        'backbone'
        ,'core'
        ,'./controller'
        ,'./views/main/view'
        ,'./config'
    ],
    function(
        Backbone
        ,Core
        ,controller
        ,mainView
        ,config
    ) {

    var App = {

        __init: function() {
            var _this = this;

            this.registerView('main', function() {
                return new mainView({
                                model: _this,
                                container: '.j-wrapper'
                            });
            });
        },

        _controllers: function() {
            return new controller;
        },

        getConfig: function() {
            return config;
        },

        servers: function() {
            return this.collection('Server');
        }
    }

    return Core.Application.extend(App);
})
