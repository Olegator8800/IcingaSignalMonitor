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
            var $serviceList = this.$el.html('');

            this.model.each(function(model) {
                $serviceList.append(model.view('serviceElement').render().$el.children());
            });
        }
    });
})
