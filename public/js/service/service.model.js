define(
    [
        'core'
        ,'./views/serviceElement/view'
    ],
    function(
        Core
        ,serviceElementView
) {
    return Core.Model.extend({

        __init: function() {
            var _this = this;

            this.registerView('serviceElement', function() {
                return new serviceElementView({model: _this});
            });
        },

        defaults: {
            'name': ''
            ,'sort': 0
            ,'state': 0
            ,'output': ''
        },
    });
});
