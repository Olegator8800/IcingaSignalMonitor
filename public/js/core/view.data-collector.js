define(function() {

    return {

        collectData: function() {
            return this.dataCollector_collect();
        },

        dataCollector_collect: function() {
            var data = {}
                ,_this = this;

            if(typeof this.dataCollector == 'undefined') return data;
            _(this.dataCollector).each(function(selector, key) {
                var elem = this.$el.find(selector);
                data[key] = elem.map(function(i,el) {
                    var $el = $(el);
                    if(el.nodeName == 'SELECT') {
                        if($el.prop('multiple')) {
                            return $el.find('option:selected').map(function(j,option){ return $(option).val();}).toArray();
                        }else{
                            return $el.val();
                        }
                    }
                    switch($el.attr('type')){
                        case 'checkbox':
                            return $el.prop('checked');
                            break;

                        default:
                            return $el.val();
                            break;
                    }
                }).toArray();
                if(elem.length == 1 && !(elem.get(0).nodeName == 'SELECT' && elem.prop('multiple'))){
                    data[key] = data[key][0];
                }
            }, this);

            return data;
        }

    }
});
