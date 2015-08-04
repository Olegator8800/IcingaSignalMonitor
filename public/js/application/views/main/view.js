define(['core', 'text!./template.html'], function(Core, template) {
    return Core.View.extend({

        template: template,

        areas: {
            'content': '.j-content'
        }
    });
})
