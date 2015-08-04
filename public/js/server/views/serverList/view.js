define(['core', 'text!./template.html'], function(Core, template) {
    return Core.View.extend({

        template: template,

        __init: function() {
            this.model.bind('add remove reset replace', this.serversListRender, this);
        },

        postRender: function() {
            this.serversListRender();
        },

        serversListRender: function() {
            var $serversList = this.$el.find('.j-server-list').html('');

            this.model.each(function(model) {
                $serversList.append(model.view('serverElement').render().$el.children());
            });
        }
    });
})
