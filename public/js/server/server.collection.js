define(
    [
        'core'
        ,'./server.model'
        ,'./views/serverList/view'
    ],
    function(
        Core
        ,model
        ,serverListView
    )
{
    return Core.Collection.extend({

        model: model,

        __init: function() {
            var _this = this;

            this.registerView('serverList', function() {
                return new serverListView({model: _this});
            });
        },

        sync: function() {
            var _this = this,
                apiUrl = this.app().getConfig().api_url;

            $.ajax({
                url: apiUrl,
                dataType: 'json'
            }).done(function(data) {
                _this.reset();

                data = _.toArray(data);
                _this.add({name: 'all group', hosts: data});
            });

        }
    });
});
