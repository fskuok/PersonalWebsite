(function(window) {
    'use strict';

    window.angFsk = angular.module( "fsk", ["ui.router"] );

    var i,l;


    //Site Configs
    var siteConfigs = {
        route :
            [{
                state: 'home',
                controller: 'home_mainController'
            },{
                state: 'about',
                controller: 'about_mainController'
            },{
                state: 'project',
                controller: 'project_mainController'
            },{
                state: 'page_not_found'
            }]
        };


    //********************************** CONFIG  **********************************

    angFsk
        .config(function( $stateProvider, $urlRouterProvider ) {

            $urlRouterProvider.otherwise('/home');

            for( i=0, l = siteConfigs.route.length; i<l; i++ ){

                $stateProvider.state(
                    siteConfigs.route[i].state,
                    {
                        url:
                            '/' + siteConfigs.route[i].state,
                        templateUrl:
                            'partial/' + siteConfigs.route[i].state + '.html',
                        controller:
                            siteConfigs.route[i].controller
                    }
                );

            }

            for(var category in siteModel.pages.project){
                if(siteModel.pages.project.hasOwnProperty(category)){
                    siteModel.pages.project[category].forEach(function(v){
                        var _name = underscoreSpace(v.name)

                        $stateProvider.state(
                            'project.' + _name,
                            {
                                url:
                                    '/project.' + _name,
                                templateUrl:
                                    'partial/project.' + _name + '.html'
                            }
                        );

                        siteModel.preloadImages.push('img/project/' + _name + '_cover.jpg');
                    })
                }
            }


        });


    //********************************** SERVICES **********************************
    angFsk
        .factory('timeService', function() {

            //arguments
            //return:String
            var getTimePeriod = function() {
                var time = (new Date()).getHours();

                if( time < 13 && time >= 3){
                    return "morning"
                }else if( time >= 13 && time < 18 ){
                    return "afternoon"
                }else if( time >= 18 || time < 3){
                    return "evening"
                }

            };

            //timeService factory return
            return {
                getTimePeriod : getTimePeriod
            };
        })


        .factory('domService', ['$state', '$rootScope', '$window', '$document',
            function ( $state, $rootScope, $window, $document ) {
                var $body = $('body');

                //while changing pages
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams){

                        document.querySelector('header').setAttribute('class', parseUrl(toState.url));

                        function parseUrl(url){
                            url = url.slice(1).split('.');

                            //add class 'in' for CSS
                            if(url.length > 1 && url[0] === 'project') url.push('in');

                            return url.join(' ');
                        }
                    }

                );


                //Dom ready actions
                $document.ready(function(){
                    angular.element($window).on('scroll',
                        (function(){
                            //use to prevent the shake caused by trigger the event in a short time;
                            var headerFoldable = true;

                            //Events handler - folding navigation bar
                            return function(){
                                if(headerFoldable){
                                    if( ($body[0].scrollTop < 60 && $('header').hasClass("folded")) ||
                                        ($body[0].scrollTop >= 60 && !$('header').hasClass("folded")) ){
                                        $('header').toggleClass("folded");
                                        headerFoldable = false;
                                        setTimeout(function(){ headerFoldable = true; }, 800);
                                    }
                                }
                            }
                        })()
                    );

                });


                //alias for jQuery like selector
                function $(selector){
                    return angular.element(document.querySelector(selector))
                }


                return {
                    $ : $
                };
            }
        ]);


    //********************************** FILTERS **********************************



    function titleCase(input){
        return typeof input === "string" ? input.split(' ').map(function(v){
            return v.charAt(0).toUpperCase() + v.slice(1);
        }).join(' ') : input;
    }

    function underscoreSpace(input){
        return typeof input === "string" ? input.split(' ').join('_') : input;
    }

    function spaceUnderscore(input){
        return typeof input === "string" ? input.split('_').join(' ') : input;
    }

    angFsk
        .filter('titleCase', function(){
            return titleCase;
        })
        .filter('underscoreSpace', function(){
            return underscoreSpace;
        })
        .filter('spaceUnderscore', function(){
            return spaceUnderscore;
        })




})(window);



