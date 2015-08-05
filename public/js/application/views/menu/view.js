define(['core', 'text!./template.html'], function(Core, template) {
    return Core.View.extend({

        template: template,

        events: {
            'click .j-menu_config-load': 'loadConfig'
            ,'click .j-menu_config-save': 'saveConfig'
            ,'click .j-menu_sync': 'syncData'
            ,'click .j-menu_sync-stop': 'syncStop'
        },

        postRender: function() {
            var _this = this;

            this.$el.find('.j-menu_config-file').on('change', function(e) {
                var file = e.target.files[0],
                    reader = new FileReader();

                reader.onload = (function(loadFile) {
                    var result = reader.result;

                    result = JSON.parse(result);

                    if (_.isArray(result)) {
                        _this.app().servers().updateLayout(result);
                        _this.app().message('Load succses', 'Load config file ' + file.name);
                    } else {
                        _this.app().message('Load error', 'Error readin loaded config file ' + file.name);
                    }
                });

                reader.readAsText(file);
            });
        },

        loadConfig: function() {
            this.$el.find('.j-menu_config-file').click();
        },

        saveConfig: function(e) {
            var configName = window.location.hostname + '.icng.' + Date.now(),
                data = this.app().servers().toJSON(),
                config = '',
                $link = $(e.target);

            data = encodeURIComponent(JSON.stringify(data));
            config = 'data:application/json;charset=utf-8,' + data;

            $link.attr({
                href: config, 
                download: configName
            });
        },

        syncData: function() {
            if (this.app().servers().isAutoSyncEnabled()) {
                this.app().servers().sync();
                this.app().message('Sync', 'Forced sync');
            } else {
                this.app().servers().startAutoSync();
                this.app().message('Auto sync', 'Auto sync enabled');
            }
        },

        syncStop: function() {
            this.app().servers().stopAutoSync();
            this.app().message('Auto sync', 'Auto sync disabled');
        }
    });
})
