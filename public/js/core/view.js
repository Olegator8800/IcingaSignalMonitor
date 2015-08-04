define(['backbone', './view.data-collector'], function(Backbone, viewDataCollector) {

    var View = {

        template: '',
        areas: undefined,

        initialize: function(opts) {
            opts = opts || {}
            if (opts.template) this.template = opts.template;
            if (opts.container) this.container = opts.container;
            this.template = _.template(this.template);

            if (!_.isUndefined(this.areas)) {
                _(this.areas).each(function(areaSelector, area){
                    this.addArea(area, areaSelector);
                }, this);
            } else {
                this.areas = {};
            }

            this.__init(opts);
            this.opts = {};
        },

        addArea: function(area, selector) {
            this.areas[area] = selector;
            var name = '_'+area;
            this[area] = function(content, opts){
                this[name] = content;
                this[name+'_opts'] = opts || {};

                if (_.isObject(content)) {
                    content.layout = this;
                }

                return this;
            };
        },

        getAreaHolder: function(area) {
            if(!_.isUndefined(this['_'+area])) {
                return this['_'+area];
            }

            return false;
        },

        getArea: function(area) {
            if(!_.isUndefined(this['_'+area])) {
                return this.$el.find(this.areas[area]);
            }

            return false;
        },

        clearAreas: function() {
            _(this.areas).each(function(areaSelector, area) {
                this.removeArea(area);
            }, this);
        },

        renderArea: function(area) {
            if(!_.isUndefined(this['_'+area])) {
                if(_.isObject(this['_'+area])) {
                    _.extend(this['_'+area+'_opts'], {container: this.$el.find(this.areas[area])});
                    this['_'+area].render(this['_'+area+'_opts']);
                }else{
                    this.$el.find(this.areas[area]).html(this['_'+area]);
                }
            }

            return this;
        },

        removeArea: function(area) {
            delete this[area];
            delete this['_'+area];
            delete this['_'+area+'_opts'];
            delete this.areas[area];
        },

        __init: function(opts) {},

        app: function() {
            return require('app-loader');
        },

        mediator: function() {
            return require('app-loader').mediator();
        },

        ready: function() {
            return this._ready;
        },

        postRender: function(data) {},
        preRender: function(opts) {},

        render: function( opts ){
            var _this = this;

            opts = opts || this.opts;
            this.opts = _.clone(opts);

            this._ready = $.Deferred();
            this.trigger('render:before', opts);
            this.app().mediator().trigger('view:render:before', this, opts);
            $.when( this.preRender(opts) ).then(function(){
                _this._render(opts);
            });

            return this;
        },

        _render: function(opts) {
            var _this = this,
                opts = opts || {},
                data = {
                    model: this.model,
                    opts: this.opts,
                    view: this
                };

            var tpl = this.template( data );
            this.$el.empty().html(tpl);

            var container = opts.container || this.container;

            if (container) {
                this.container = container;
                $(container).empty().append(this.el);
            };

            _(this.areas).each(function(areaSelector, area){
                this.renderArea(area);
            }, this)

            this.postRender(data);
            this._ready.resolve();
            this.delegateEvents();
            this.trigger('render:after');
            this.app().mediator().trigger('view:render:after', this);

            return this;
        }
    };

    _.extend(View, viewDataCollector);

    return Backbone.View.extend(View);
})
