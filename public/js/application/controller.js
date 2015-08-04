define(['backbone'], function(Backbone) {

    return Backbone.Router.extend({
        routes: {
            '': 'mainAction'
        },

        mainAction: function() {
            this.app()
                .view('main')
                .content(this.app().collection('Server').view('serverList'))
                .render();
        }
    })
})
