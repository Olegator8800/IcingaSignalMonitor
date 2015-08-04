define(
    [
        'core'
        ,'./views/serverElement/view'
        ,'host'
    ],
    function(
        Core
        ,serverElementView
        ,Host
) {
    return Core.Model.extend({

        __init: function(attrs) {
            var _this = this;
            this._hosts = new (Host).Collection(attrs.hosts);
            delete attrs.hosts;

            this.registerView('serverElement', function() {
                return new serverElementView({model: _this});
            });
        },

        defaults: {
            'name': ''
            ,'sort': 0
        },

        hosts: function() {
            return this._hosts;
        }
    });
});
