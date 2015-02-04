(function(window) {
    'use strict';

    window.angFsk = angular.module( "fsk", ["ui.router"] );



    //********************************** CONFIG  **********************************

    angFsk
        .config(function( $stateProvider, $urlRouterProvider ) {
            var page;

            $urlRouterProvider.otherwise('/home');

            for(page in siteModel.pages){
                if(siteModel.pages.hasOwnProperty(page))
                $stateProvider.state(
                    page,
                    {
                        url: '/' + page,
                        templateUrl:  'partial/' + page + '.html',
                        controller: page + '_mainController'
                    }
                );
            }


            siteModel.pages.project.forEach(function(category){
                category.project.forEach(function(project){
                    page = underscoreSpace(project.name);

                    $stateProvider.state(
                        'project.' + page,
                        {
                            url:
                            '/project.' + page,
                            templateUrl:
                            'partial/project.' + page + '.html'
                        }
                    );

                    siteModel.preloadImages.push('img/project/' + page + '_cover.jpg');
                })
            });

        });





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
        });


    //********************************** DIRECTIVES **********************************

    angFsk
        .directive('fkScrollPoint', ['$rootScope', '$window', 'domService',
            function($rootScope, $window, $dom){
                var where;

                return function(scope, elem, attr){
                    angular.element($window).on('scroll', function(){

                        where = $dom.elementAtWhere(elem[0]);


                        //if the scrollPoint was on top and now not
                        if($rootScope.onTopScrollPoint === elem && !where.match('top')){
                            $rootScope.$broadcast('scrollPointLeaveTop', elem, attr["fkScrollPoint"]);
                        }

                        //if the scrollPoint was on center and now not
                        if($rootScope.onCenterScrollPoint === elem && !where.match('center')){
                            $rootScope.$broadcast('scrollPointLeaveCenter', elem, attr["fkScrollPoint"]);
                        }

                        //if the scrollPoint was on center and now not
                        if($rootScope.onBottomScrollPoint === elem && !where.match('bottom')){
                            $rootScope.$broadcast('scrollPointLeaveBottom', elem, attr["fkScrollPoint"]);
                        }

                        //check if the scrollPoint's scrollPointReachTop event has not been emitted
                        if($rootScope.onTopScrollPoint !== elem && where.match('top')){
                            $rootScope.onTopScrollPoint = elem;
                            $rootScope.$broadcast('scrollPointReachTop', elem, attr["fkScrollPoint"]);
                        }

                        //check if the scrollPoint's scrollPointReachCenter event has not been emitted
                        if($rootScope.onCenterScrollPoint !== elem && where.match('center')){
                            $rootScope.onCenterScrollPoint = elem;
                            $rootScope.$broadcast('scrollPointReachCenter', elem, attr["fkScrollPoint"]);
                        }

                        //check if the scrollPoint's scrollPointReachBottom event has not been emitted
                        if($rootScope.onBottomScrollPoint !== elem && where.match('bottom')){
                            $rootScope.onBottomScrollPoint = elem;
                            $rootScope.$broadcast('scrollPointReachBottom', elem, attr["fkScrollPoint"]);
                        }

                    });
                }
            }
        ]);

})(window);



