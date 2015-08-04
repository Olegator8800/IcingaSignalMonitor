define(['backbone', './model'], function(Backbone, CoreModel) {

    var AppModel = {

        _initializers: undefined,
        _collections: undefined,
        _modules: undefined,

        initialize: function(args, opts) {
            this._ready = false;
            this.registerView('loader', {});//Must be redefined somewhere
            this.__init(args, opts);
        },

        _controllers: function() {
            return new Backbone.Router();
        },

        _router: _.once(function(app) {
            var router = this._controllers();
            router.app = function() {
                return app;
            };
            return router;
        }),

        router: function() {
            return this._router(this);
        },

        _mediator: _.once(function() {
            var mediator = {};
            _.extend(mediator, Backbone.Events);
            return mediator;
        }),

        mediator: function() {
            return this._mediator();
        },

        module: function(name, module) {
            this._modules = this._modules || {};

            var parts = name.split('.'),
                parent = this._modules,
                pl, i;

            pl = parts.length;

            for (i = 0; i < pl; i++) {
                //create a property if it doesnt exist
                if (typeof parent[parts[i]] === 'undefined') {
                    parent[parts[i]] = {};
                }
                parent = parent[parts[i]];
            }

            if (module){
                if( typeof module === 'function'){
                    module = module(
                        parent,
                        this
                    );
                }
                _.extend(parent, module);
            }

            return parent;
        },

        loader: function(description, deferred) {

        },

        addInitializer: function(initializer) {
            this._initializers = this._initializers || [];
            this._initializers.push(initializer);
        },

        collection: function(name, collection) {
            this._collections = this._collections || [];

            if (collection) {
                this._collections[name] = collection;
            }

            return this._collections[name];
        },

        onBeforeStart: function() {
            return true;
        },

        start: function() {
            if(this._ready !== false) return this.ready();
            var _this = this;
            this._ready = $.Deferred();

            this._ready.done(function(){
                _this.router();
                Backbone.history.start();
            });

            this._ready.fail(function(){
                alert('Error loading app!');
            });

            $.when(_this.onBeforeStart())
                .done(function() {
                    $.when.apply($,_(_this._initializers).map(function(initializer) {return initializer(_this);}))
                        .done(function(){
                            _this._ready.resolve();
                        })
                        .fail(function(){
                            _this._ready.reject();
                        })
                    ;
                })
                .fail(function(){
                    _this._ready.reject();
                });

            return _this.ready();
        }
    };

    return CoreModel.extend(AppModel);
})
