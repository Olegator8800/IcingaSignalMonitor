define(
    [
        'core'
        ,'./host.model'
        ,'./views/hostList/view'
    ],
    function(
        Core
        ,model
        ,hostListView
    )
{
    return Core.Collection.extend({

        model: model,

        __init: function() {
            var _this = this;

            this.registerView('hostList', function() {
                return new hostListView({model: _this});
            });
        },
    });
});
