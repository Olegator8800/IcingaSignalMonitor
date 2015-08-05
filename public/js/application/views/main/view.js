define(['core', 'text!./template.html'], function(Core, template) {
    return Core.View.extend({

        template: template,

        areas: {
            'menu': '.j-menu'
            ,'content': '.j-content'
        }
    });
})
