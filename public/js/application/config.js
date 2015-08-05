define(function() {
    var config = {

        api_url: '/icingaweb2/signalmonitor/api/list',

        update_time: 60, //sec

        defaultServerName: 'others',

        //see http://docs.icinga.org/latest/en/pluginapi.html#outputlengthrestrictions
        status_code: [
            {code: 0, state: 'OK'}
            ,{code: 1, state: 'WARNING'}
            ,{code: 2, state: 'CRITICAL'}
            ,{code: 3, state: 'UNKNOWN'}
        ]
    };


    return config;
});
