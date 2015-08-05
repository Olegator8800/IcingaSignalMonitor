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

        timerId: null,
        timeUpdate: 10,
        layout: [],

        __init: function() {
            var _this = this;

            this.registerView('serverList', function() {
                return new serverListView({model: _this});
            });

            this.startAutoSync();
        },

        isAutoSyncEnabled: function() {
            return this.timerId != null;
        },

        startAutoSync: function() {
            var _this = this,
                time = this.timeUpdate;

            time = time * 1000;

            this.sync();
            this.timerId = setInterval(function() { 
                _this.sync(); 
            }, time);
        },

        updateLayout: function(layout) {
            this.stopAutoSync();
            this.layout = layout;
            this.startAutoSync();
        },

        stopAutoSync: function() {
            clearInterval(this.timerId);
            this.timerId = null;
        },

        sync: function() {
            var _this = this,
                apiUrl = this.app().getConfig().api_url;

            $.ajax({
                url: apiUrl,
                dataType: 'json'
            }).done(function(result) {

                var layout = _this.layout;

                _this.reset();

                result = _.toArray(result);

                _(layout).each(function(server) {
                    var data = {};
                        hostList = [];
                        hosts = [];

                    _(server.hosts).each(function(host) {
                        hostList.push(host.name);
                    });

                    _(result).each(function(host) {
                        host = host || {};

                        var index = hostList.indexOf(host.name);

                        if (index > -1) {
                            hosts.push(host);
                            //marked host to remove in result
                            result[index] = null;
                        }
                    });

                    data.name = server.name;
                    data.sort = server.sort;
                    data.hosts = hosts;

                    _this.add(data);
                });

                //remove marked hosts
                result = _.without(result, null);

                if (result.length > 0) {
                    _this.add({
                        name: _this.app().getConfig().defaultServerName, 
                        hosts: result
                    });
                }
            });
        },

        toJSON: function() {
            var data = [],
                defaultServerName = this.app().getConfig().defaultServerName;

            this.each(function(server) {
                //skip default server in result
                if (server.get('name') != defaultServerName) {
                    data.push(server);
                }
            });

            return data;
        }
    });
});
