define(['core', 'text!./template.html'], function(Core, template) {
    return Core.View.extend({

        template: template,

        __init: function() {

        },

        postRender: function() {
            this.hostsListRender();
        },

        hostsListRender: function() {
            var $hostsList = this.$el.find('.j-hosts-list');

            $hostsList.html(this.model.hosts().view('hostList').render().$el.children());
        }
    });
})
