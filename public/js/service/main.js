define(
    [
        'app-loader'
        ,'./service.model'
        ,'./service.collection'
    ],
    function(
        app
        ,Model
        ,Collection
    )
{
    return app.module('Service', function() {
        return {
            Model: Model,
            Collection: Collection
        }
    });
})
