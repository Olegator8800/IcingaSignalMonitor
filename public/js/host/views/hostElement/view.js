define(['core', 'text!./template.html'], function(Core, template) {
    return Core.View.extend({

        template: template,

        __init: function() {
            this.model.bind('add remove reset replace', this.serviceListRender, this);
        },

        postRender: function() {
            this.serviceListRender();
        },

        serviceListRender: function() {
            var $servicesList = this.$el.find('.j-services-list');

            $servicesList.html(this.model.services().view('serviceList').render().$el.children());
        }
    });
})
