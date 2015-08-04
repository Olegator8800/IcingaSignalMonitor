define(['core', 'text!./template.html'], function(Core, template) {
    return Core.View.extend({

        template: template,

        __init: function() {
            this.model.bind('add remove reset replace', this.hostListazaRender, this);
        },

        postRender: function() {
            this.hostListRender();
        },

        hostListRender: function() {
            var $hostList_a = this.$el.find('.j-services-list-a').html(''),
                $hostList_b = this.$el.find('.j-services-list-b').html(''),
                middle = Math.ceil(this.model.length / 2),
                view;

            this.model.each(function(model, i) {
                view = model.view('hostElement').render().$el.children();

                if (i < middle) {
                    $hostList_a.append(view);
                } else {
                    $hostList_b.append(view);
                }
            });
        },

        hostListazaRender: function() {
            this.hostListRender();
            (this.app().view('main')).render();
        }
    });
})
