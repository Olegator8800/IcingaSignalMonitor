define(['core', 'text!./template.html'], function(Core, template) {
    return Core.View.extend({

        template: template,

        __init: function() {
        },

        postRender: function() {
            this.$el.find('[data-toggle="tooltip"]').tooltip();
        }
    });
})
