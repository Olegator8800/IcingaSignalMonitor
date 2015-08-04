define(['backbone', './view.helper'], function(Backbone, viewHelper) {

    var Collection = {

        initialize: function(args, opts) {
            this.__init(args, opts)
        },

        createEntity: function(args) {
            return new (this.model)(args);
        },

        __init: function() {},

        app: function() {
            return require('app-loader');
        },

        mediator: function() {
            return require('app-loader').mediator();
        },

        render: function(view, opts) {
            return this.view(view).render(opts).ready();
        },

        getLink: function(type) {
            return '';
        }
    };

    _.extend(Collection, viewHelper);

    return Backbone.Collection.extend(Collection);
})
