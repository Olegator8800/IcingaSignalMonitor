define(
    [
        'app-loader'
        ,'./server.model'
        ,'./server.collection'
    ],
    function(
        app
        ,Model
        ,Collection
    )
{
    app.collection('Server', new Collection());

    return app.module('Server', function() {
        return {
            Model: Model,
            Collection: Collection
        }
    });
})
