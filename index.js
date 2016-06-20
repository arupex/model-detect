/**
 * Created by daniel.irwin on 6/20/16.
 */

/**
 *
 * @type {Function}
 */
module.exports = (function(){

    var deepValue = require('deep-value');

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
                    isThisModel = isThisModel && deepValue(obj, key);
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