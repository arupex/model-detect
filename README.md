# model-detect
Detect Model Version

[![npm version](https://badge.fury.io/js/model-detect.svg)](https://badge.fury.io/js/model-detect) [![dependencies](https://david-dm.org/arupex/model-detect.svg)](http://github.com/arupex/model-detect) ![Build Status](https://api.travis-ci.org/arupex/model-detect.svg?branch=master) <a href='https://pledgie.com/campaigns/31873'><img alt='Pledge To Arupex!' src='https://pledgie.com/campaigns/31873.png?skin_name=chrome' border='0' ></a>


#Install

    npm install model-detect --save

#Usage

        var modelRules = {
            v1 : { properties : [ 'name.userName', 'name.lastName' ] },
            v2 : { properties : [ 'name.user_name', 'name.last_name' ] }
        };

        var ModelDetector = require('model-detect');
        var detector = new ModelDetector(modelRules);

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


Result :

        userNames = [
            'no user-name',
            'v1 user',
            'v2 user'
        ];