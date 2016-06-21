/**
 * Created by daniel.irwin on 6/20/16.
 */

/**
 *
 * @type {Function}
 */
arupex_model_detect = (function(){

    if(typeof arupex_deep_value === 'undefined' && typeof require !== 'undefined') {
        arupex_deep_value = require('deep-value');
    }

    /**
     * Sets Up a Model Detector via properties you want to exist in each model version (truthy)
     * @param modelOpts
     * @returns {detector}
     * @constructor
     */
    function ModelDetector(modelOpts){

        if(!modelOpts){
            throw new Error('you must specify any model options, ie. { v1 : { properties : [ "name.user_name", "name.last_name" ] }, v2 : { properties : [ "name.userName", "name.lastName" ] } }');
        }

        /**
         * Returns the Key of which Model was detected as truthy
         * @param obj
         */
        function detector(obj){
            var model = 'vNull';

            Object.keys(modelOpts).forEach(function (modelVersion){
               var versionRequirements = modelOpts[modelVersion];

                var isThisModel = true;
                versionRequirements.properties.forEach(function property(key){
                    isThisModel = isThisModel && arupex_deep_value(obj, key);
                });

                if(isThisModel){
                    model = modelVersion;
                }

            });
            return model;
        }

        return detector;

    }

    return ModelDetector;

})();

if(typeof module !== 'undefined'){
    module.exports = arupex_model_detect;
}