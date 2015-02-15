(function(window) {
    'use strict';

    var angFsk = angular.module( "fsk", ["ui.router"] );


    /*********************************************************************
     *
     *
     *
     *                              CONFIG
     *
     *
     *
     *********************************************************************/

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


            siteModel.pages.project.categories.forEach(function(category){
                category.projects.forEach(function(project){
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





    /*********************************************************************
     *
     *
     *
     *                              FILTERS
     *
     *
     *
     *********************************************************************/



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


    /**********************************************************************
     *
     *
     *
     *                              DIRECTIVES
     *
     *
     *
     **********************************************************************/


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
        ])

        .directive('fkVerticalCenter', ['$window', '$document', '$rootScope',
            function($window, $document, $rootScope){

                return function(scope, elem, attr){

                    function setMarginToVerticalCenter(){

                        elem[0].style.marginTop = (parseInt($window.getComputedStyle(elem.parent()[0]).height)
                             - parseInt($window.getComputedStyle(elem[0]).height) ) / 2 + 'px';

                    }

                    $document.ready(setMarginToVerticalCenter);
                    $rootScope.$on('viewContentLoaded', setMarginToVerticalCenter);
                    angular.element($window).on('resize', setMarginToVerticalCenter);
                }
            }
        ]);




    /**********************************************************************
     *
     *
     *                              Services
     *
     *
     *
     **********************************************************************/

    angFsk

        //selected test codes from Modernizr @ http://modernizr.com
        .factory('compatibilityService', ['$window', '$document',
            function($window, $document){

                var ns = {'svg': 'http://www.w3.org/2000/svg'},
                    tests = {};

                tests['svg'] = function() {
                    return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
                };

                tests['inlinesvg'] = function() {
                    var div = document.createElement('div');
                    div.innerHTML = '<svg/>';
                    return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
                };

                tests['svgclippaths'] = function() {
                    return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
                };

                tests['video'] = function() {
                    var elem = document.createElement('video'),
                        bool = false;

                    try {
                        if ( bool = !!elem.canPlayType ) {
                            bool      = new Boolean(bool);
                            bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                            bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                            bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
                        }

                    } catch(e) { }

                    return bool;
                };

                $document.ready(function init(){
                    var test;

                    for( test in tests){
                        if(tests.hasOwnProperty(test))
                            tests[test] = tests[test]();
                    }

                });

                return tests;

            }])


        .factory('timeService', function() {

            //arguments
            //return:String
            var greeting = function() {
                var time = (new Date()).getHours();

                if( time < 4){
                    return "cheers for the night"
                }else if( time < 12){
                    return "good morning"
                }else if( time < 17){
                    return "good afternoon"
                }else{
                    return "good evening"
                }

            };

            //timeService factory return
            return {
                greeting : greeting
            };
        })


        .factory('domService', ['$state', '$rootScope', '$window', '$document', 'compatibilityService',
            function ( $state, $rootScope, $window, $document, compatibilityService ) {
                var $ = function (selector){
                        return angular.element(document.querySelectorAll(selector))
                    },
                    qs = function (selector){
                        return document.querySelector(selector);
                    },
                    qsa = function(selector){
                        return document.querySelectorAll(selector);
                    },
                    body = qs('body'),
                    scrollPointStack = [];

                //while changing pages
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams){
                        scrollPointStack = $('[fk-scroll-point]');

                        //scroll to top of the page
                        $window.scrollTo(0, 0);

                    }

                );



                //alias for jQuery like selector


                $.elementAtWhere = function elementAtWhere(elem){
                    var result = '',
                    //firefox place scrollTop at html tag, while others place it at body
                        bodyTop = body.scrollTop || qs('html').scrollTop,
                        elemTop = elem.offsetTop,
                        elemH = elem.offsetHeight,
                        winH  = window.innerHeight;


                    if(bodyTop > elemTop + elemH) return 'above';
                    if(bodyTop >= elemTop && bodyTop <  elemTop + elemH) result += 'top';
                    if(bodyTop + winH / 2 >= elemTop && bodyTop + winH / 2 <  elemTop + elemH) result += 'center';
                    if(bodyTop + winH >= elemTop && bodyTop + winH <  elemTop + elemH) result += 'bottom';
                    if(bodyTop + winH < elemTop) return 'below';

                    return result;
                };

                $.qs = qs;
                $.qsa = qsa;
                return $;
            }
        ])


        .factory('svgService',function(){

            function getDialogBoxPoints(width, height, side, pointerY, pointerR){
                var x0 = 0, x1 = pointerR, x2 = pointerR + width,
                    y0 = -pointerY, y1 = - pointerR, y2 = 0,
                    y3 = pointerR, y4 = height - pointerY;

                if(side === "left"){
                    x0 = -x0;
                    x1 = -x1;
                    x2 = -x2;
                }

                return "" + x1 + ',' + y0  + ' ' +
                    x2 + ',' + y0  + ' ' +
                    x2 + ',' + y4 + ' ' +
                    x1 + ',' + y4 + ' ' +
                    x1 + ',' + y3 + ' ' +
                    x0  + ',' + y2 + ' ' +
                    x1 + ',' + y1;


            }

            return {
                getDialogBoxPoints : getDialogBoxPoints
            }
        });



    /**********************************************************************
     *
     *
     *
     *                          Controllers
     *
     *
     *
     **********************************************************************/



    angFsk
        .controller('header_mainController',
        ['$scope',  'domService', '$rootScope', '$document', '$window',
            function($scope, $dom, $rootScope, $document, $window){
                var foldHeader = (function(){

                    //use to prevent the shake caused by trigger the event in a short time;
                    var headerFoldable = true,
                        bodyScrollTop;

                    //Events handler - folding navigation bar
                    return function(){

                        //firefox place scrollTop at html tag, while others place it at body
                        bodyScrollTop = $dom.qs('body').scrollTop ||  $dom.qs('html').scrollTop;

                        if(headerFoldable){
                            if( (bodyScrollTop < 60 && $dom('header').hasClass("folded")) ||
                                (bodyScrollTop >= 60 && !$dom('header').hasClass("folded")) ){
                                $dom('header').toggleClass("folded");
                                headerFoldable = false;

                                //prevent header fold/unfolded more than once in 300ms
                                setTimeout(function(){ headerFoldable = true; }, 300);
                            }
                        }
                    }
                })();


                /********* Scope data *********/
                $scope.projectInName = '';
                $scope.preloadImages = [];


                /********* Event Register *********/
                    // add class on header for style purpose
                $rootScope.$on('$stateChangeStart',
                    function(event, toState){

                        //if goes in a project, change the scope variable projectInName to the project's name
                        if(toState.name.match('project.'))
                            $scope.projectInName = toState.name.replace('project.', '');
                        else
                            $scope.projectInName = '';
                    }
                );

                // only load after the view DOM is rendered, to not block the loading of view;
                $rootScope.$on('$viewContentLoaded', function($event){
                    $scope.preloadImages = siteModel.preloadImages;
                });

                // while changing pages
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams){
                        $dom.qs('header').setAttribute('class', parseUrl(toState.url));

                        function parseUrl(url){
                            url = url.slice(1).split('.');

                            //add class 'in' for CSS
                            if(url.length > 1 && url[0] === 'project') url.push('in');

                            return url.join(' ');
                        }
                    }
                );

                // Dom ready actions
                $document.ready(function(){
                    foldHeader();
                    angular.element($window).on('scroll', foldHeader);
                });
            }
        ]// header: angularModule.controller() second argument ends
    )


        .controller('home_mainController',
        [ '$scope', 'timeService', '$rootScope', 'domService',
            function($scope, timeService, $rootScope, $dom){

                /********* Scope data *********/
                $scope.greeting = timeService.greeting();


                /********* Event Register *********/
                $rootScope.$on('scrollPointReachCenter',
                    function(event, $scrollPoint, scrollPointName){
                        $dom('svg#logo').attr("class", scrollPointName);
                    }
                );
            }
        ]// home: angularModule.controller() second argument ends
    )


        .controller('project_mainController',
        ['$scope', 'domService', '$window', '$state', '$filter',
            function($scope, $dom, $window, $state, $filter){

                var changeBackground = function(name, opacity){
                    // if it's in a project's detail, set background to the cover of that project
                    if ($dom('header').hasClass('in')) {
                        $scope.backgroundCSS = {
                            "opacity": 1,
                            "background-image":
                            "url('img/project/" + $filter('underscoreSpace')($state.current.name.replace('project.', '')) + "_cover.jpg')"
                        };

                        // set background according the arguments
                    } else {
                        $scope.backgroundCSS = {
                            "opacity": opacity || 0,
                            "background-image":  name ?
                            "url('img/project/" + $filter('underscoreSpace')(name) + "_cover.jpg')" :
                                "none"
                        };
                    }
                };

                /********* Scope data *********/
                $scope.categories = siteModel.pages.project.categories;
                $scope.changeBackground = changeBackground;


                /********* Initializing *********/
                changeBackground();
            }
        ]
    )


        .controller('project_introductionController', ['$scope', '$rootScope', '$state', '$filter',
            function($scope, $rootScope, $state, $filter){

                var findProjectDetail = function(){
                    var projectName;

                    // if goes in a project
                    if ($state.current.name.match('project.')) {

                        projectName = $state.current.name.replace('project.', '');

                        siteModel.pages.project.categories.forEach(function(category){
                            category.projects.forEach(function(project){
                                if($filter('underscoreSpace')(project.name) === projectName){
                                    $scope.projectDetail =  project;
                                }
                            })
                        });

                        // if is in projects list
                    } else {
                        $scope.projectDetail = undefined;
                    }
                };

                /********* Scope data *********/
                $scope.links = siteModel.links;
                $scope.projectDetail = undefined;


                /********* Event Register *********/
                $rootScope.$on('$stateChangeSuccess',findProjectDetail);


                /********* Initializing *********/
                findProjectDetail();
            }]
    )


        .controller('projectIn_mainController', ['$scope', function($scope){}])

})(window);



