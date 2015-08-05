require.config({
    paths: {
        'jquery': 'vendor/jquery/jquery'
        ,'jquery-dropdown': 'vendor/jquery-dropdown/jquery.dropdown'
        ,'gritter': 'vendor/jquery-gritter/js/jquery.gritter'
        ,'text': 'vendor/requirejs-text/text'
        ,'underscore': 'vendor/underscore-amd/underscore'
        ,'backbone': 'vendor/backbone-amd/backbone'
        ,'bootstrap': 'vendor/bootstrap/dist/js/bootstrap.min'
    },
    shim: {
        'bootstrap': { deps: ['jquery'] }
        ,'gritter': {  deps: ['jquery'] }
    },
    deps: [
        'bootstrap'
        ,'gritter'
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
