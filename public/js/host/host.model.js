define(
    [
        'core'
        ,'./views/hostElement/view'
        ,'service'
    ],
    function(
        Core
        ,hostElementView
        ,Service
) {
    return Core.Model.extend({

        __init: function(attrs) {
            var _this = this;

            this._services = new (Service).Collection(attrs.service);

            this.registerView('hostElement', function() {
                return new hostElementView({model: _this});
            });
        },

        defaults: {
            'name': ''
            ,'display_name': ''
            ,'sort': 0
        },

        getDisplayName: function() {
            return !_.isEmpty(this.get('display_name'))?this.get('display_name'):this.get('name');
        },

        services: function() {
            return this._services;
        },

        toJSON: function() {
            return {
                name: this.get('name'),
                sort: this.get('sort')
            };
        }
    });
});
