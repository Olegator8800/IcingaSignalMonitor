define(['backbone'], function(Backbone) {

    return Backbone.Router.extend({
        routes: {
            '': 'mainAction'
        },

        mainAction: function() {
            this.app()
                .view('main')
                .menu(this.app().view('menu'))
                .content(this.app().collection('Server').view('serverList'))
                .render();
        }
    })
})
