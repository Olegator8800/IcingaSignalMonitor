define(
    [
        './application'
        ,'./model'
        ,'./view'
        ,'./collection'
    ],
    function(
        Application
        ,Model
        ,View
        ,Collection
    ) {

    var Core = {
        Application: Application,
        Model: Model,
        View: View,
        Collection: Collection
    };

    if (typeof window != 'undefined'){
        window.Core = Core;
    }

    return Core;
})
