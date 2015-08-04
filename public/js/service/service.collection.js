define(
    [
        'core'
        ,'./service.model'
        ,'./views/serviceList/view'
    ],
    function(
        Core
        ,model
        ,serviceListView
    )
{
    return Core.Collection.extend({

        model: model,

        __init: function() {
            var _this = this;

            this.registerView('serviceList', function() {
                return new serviceListView({model: _this});
            });
        },
    });
});
