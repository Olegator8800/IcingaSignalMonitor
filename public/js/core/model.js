define(['backbone', './view.helper'], function(Backbone, viewHelper) {

    var Model = {

        initialize: function(args, opts) {
            this._ready = $.Deferred();
            this.__init(args, opts);

            this.event_saveCollection(opts);
            this.on('add', function(model, collection) {
                this.event_saveCollection(collection);
            });
        },

        __init: function(args, opts) {},

        app: function() {
            return require('app-loader');
        },

        mediator: function() {
            return require('app-loader').mediator();
        },

        ready: function() {
            return this._ready;
        },

        render: function(view, opts) {
            return this.view(view).render(opts).ready();
        },

        goTo: function(type) {
            this.app().router.navigate(this.getLink(type), true);
        },

        getLink: function(type) {
            return '';
        },

        event_saveCollection: function(options) {
            if (!_.isObject(options)) {
                return false;
            }
            var collection = null;

            if ('collection' in options) {
                collection = options.collection;
            }

            if (options instanceof Backbone.Collection) {
                 collection = options;
            }

            this._collection = collection;
        },

        getCollection : function() {
            if (!_.isUndefined(this.collection)) {
                return this.collection;
            }
            return this._collection;
        }
    };

    _.extend(Model, viewHelper);

    return Backbone.Model.extend(Model);
})
