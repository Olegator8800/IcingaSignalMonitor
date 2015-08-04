define(
    [
        'app-loader'
        ,'./host.model'
        ,'./host.collection'
    ],
    function(
        app
        ,Model
        ,Collection
    )
{
    return app.module('Host', function() {
        return {
            Model: Model,
            Collection: Collection
        }
    });
})
