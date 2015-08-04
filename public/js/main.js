require.config({
    paths: {
        'jquery': 'vendor/jquery/jquery'
        ,'jquery-dropdown': 'vendor/jquery-dropdown/jquery.dropdown'
        ,'text': 'vendor/requirejs-text/text'
        ,'underscore': 'vendor/underscore-amd/underscore'
        ,'backbone': 'vendor/backbone-amd/backbone'
        ,'bootstrap': 'vendor/bootstrap/dist/js/bootstrap.min'
    },
    shim: {
        'bootstrap': { deps: ['jquery'] }
    },
    deps: [
        'bootstrap'
    ],
    packages: [
        'core'
        ,'application'
        ,'server'
        ,'host'
        ,'service'
    ]
});

require(['app-loader', 'module-loader', 'jquery', 'underscore'], function(app, modules, $, _) {
    app.start();
    window.app = app;
});
