/**
 * Created by daniel.irwin on 6/20/16.
 */

describe('model-detect', function(){

    var assert = require('assert-diff').deepEqual;

    var modelRules = {
        v1 : { properties : [ 'name.userName', 'name.lastName' ] },
        v2 : { properties : [ 'name.user_name', 'name.last_name' ] }
    };

    var ModelDetector = require('../index');
    var detector = new ModelDetector(modelRules);

    it('vNull', function(){
        assert(detector({
            name : {
                'user-name' : 'dirwin517',
                'last-name' : 'irwin'
            }
        }), 'vNull');
    });


    it('v1', function(){
        assert(detector({
            name : {
                'userName': 'dirwin517',
                'lastName': 'irwin'
            }
        }), 'v1');
    });


    it('v2', function(){
        assert(detector({
            name : {
                'user_name': 'dirwin517',
                'last_name': 'irwin'
            }
        }), 'v2');
    });


    it('v2 even though v1 passes', function(){
        assert(detector({
            name : {
                'userName': 'dirwin517',
                'lastName': 'irwin',
                'user_name': 'dirwin517',
                'last_name': 'irwin'
            }
        }), 'v2');
    });


    it('real use', function(){

        var impls = {
            vNull : function(obj){
                return 'no user-name';
            },
            v1 : function(obj){
                return obj.name.userName;
            } ,
            v2 : function(obj){
                return obj.name.user_name;
            }
        };

        function doSomething(obj){
            return impls[detector(obj)](obj);
        }

        var userNames = [];

        var objects = [
            {
                name : {
                    'user-name' : 'vNull User',
                    'last-name' : 'vNull'
                }
            },
            {
                name : {
                    'userName': 'v1 user',
                    'lastName': 'v1 user'
                }
            },
            {
                name : {
                    'user_name': 'v2 user',
                    'last_name': 'v2 user'
                }
            }
        ];


        objects.forEach(function(obj){
            userNames.push(doSomething(obj));
        });

        assert(userNames, [
            'no user-name',
            'v1 user',
            'v2 user'
        ]);

    });

});