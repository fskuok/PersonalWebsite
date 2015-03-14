(function(win) {

    var SM = win.siteModel = {
        pages: {
            "home": {},
            "project":{}
        },
        preloadImages : [
            'img/icons/icons_scroll_indicator.png'
        ],
        links : {
            "Vishal Pallikandi": "http://vishalpallikandi.wix.com/portfolio",
            "Stamp Siripanich": "http://www.stampsiripanich.com",
            "Hanyue Hu": "http://hanyue.me",
            "Behnam Heydari": "http://behnamheydari.com",
            "Wei-Hsun Chen": "http://www.weihsunchen.com"
        }
    };



    SM.pages.project.categories = [
        {
            "name": "digital",
            "projects":[
                {
                    "name": "triends",
                    "description": "How Location-based Social Service Be More Personalized ?",
                    "year": "2014",
                    "duration": "3 Months",
                    "type": "Mobile App Design",
                    "process": ["Interviews", "Questionnaires", "Wireframing", "Prototyping", "UI Design", "HTML App Developing", "Market Analysis"]
                },{
                    "name": "responsive mobile ui",
                    "description": "How Big Screen Mobile Phone Interface Caters Ergonomics ?",
                    "year": "2013",
                    "duration": "2 Months",
                    "type": "UI Study & Design",
                    "process": ["Ergonomics Research", "UI Design"]
                },{
                    "name": "river sunvelop",
                    "description": "A Website for Architecture",
                    "year": "2012",
                    "duration": "6 Months",
                    "type": "Website Design & Development",
                    "process": ["UI Design", "Front End Development", "Website Management"]
                }
            ]
        },{
            "name": "connected",
            "projects":[
                {
                    "name": "hicool",
                    "description": "Re-imagine the First-aid-kit for Hikers",
                    "year": "2014",
                    "duration": "3 Weeks",
                    "type": "Product & App Design",
                    "process": ["Research", "Concept Generation", "Prototyping", "Interface Design"],
                    "team": ["Behnam Heydari", "Wei-Hsun Chen"],
                    "role": "Shared work in research, concept generation; Fully designed graphics, mobile app interfaces, built 3D Models;"
                },{
                    "name": "meeting room",
                    "description": "Envision the Smart Meeting Room",
                    "year": "2014",
                    "duration": "2 Months",
                    "type": "Internet of Things Design",
                    "process": ["Research", "Concept Generation", "Prototyping", "IoT System Developing", "Web Developing"],
                    "team": ["Behnam Heydari", "Hanyue Hu", "Stamp Siripanich", "Vishal Pallikandi"],
                    "role": "Shared work in research, concept generation; Fully designed and developed Agenda Board; Presentable illustrations"
                }/*,{
                 "name": "sit down and talk",
                 "description": "connection devices",
                 "year": "2015",
                 "team": "Teamwork"
                 }*/
            ]
        },{
            "name": "physical",
            "projects": [
                {
                    "name": "birdhouse",
                    "description": "What Will Birdhouse for Apartment Residents Be Like ?",
                    "year": "2014",
                    "duration": "2 weeks",
                    "type": "Product Design",
                    "process": ["User Research", "Market Research", "Concept Developing", "Prototyping", "Detail Design", "Design Illustration"]

                },{
                    "name": "laser level",
                    "description": "Building The New Generation Laser Level",
                    "type": "Product Design",
                    "year": "2013",
                    "duration": "2 weeks",
                    "team": ["Supported by two Industrial Designers"],
                    "role": "Individually worked on prototyping, ergonomics study, and 3D model building; Shared works in concept generation and form design.",
                    "process": ["User Research", "Prototyping", "Ergonomics Study", "Form Design", "Design Illustration"]
                },{
                    "name": "creek on bridge",
                    "description": "A Table Design Inspired by Nature",
                    "type": "Furniture Design",
                    "year": "2013",
                    "duration": "1 Month",
                    "process": ["Form Design", "Model Making"]
                },{
                    "name": "structure",
                    "description": "Creating A Structure That Supports Weight That Is 300x of Its Own Weight",
                    "year": "2011",
                    "duration": "2 Month",
                    "type": "Structure Design",
                    "team": ["Dong Peng", "Hailin Wang"]
                }
            ]
        }
    ];

})(window);





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


                        // if the scrollPoint was on top and now not
                        if($rootScope.onTopScrollPoint === elem && where.indexOf('top') === -1)
                            $rootScope.$broadcast('scrollPointLeaveTop', elem, attr["fkScrollPoint"]);

                        // if the scrollPoint was on center and now not
                        if($rootScope.onCenterScrollPoint === elem && where.indexOf('center') === -1)
                            $rootScope.$broadcast('scrollPointLeaveCenter', elem, attr["fkScrollPoint"]);

                        //if the scrollPoint was on center and now not
                        if($rootScope.onBottomScrollPoint === elem && where.indexOf('bottom') === -1)
                            $rootScope.$broadcast('scrollPointLeaveBottom', elem, attr["fkScrollPoint"]);

                        //check if the scrollPoint's scrollPointReachTop event has not been emitted
                        if($rootScope.onTopScrollPoint !== elem && where.indexOf('top') !== -1){
                            $rootScope.onTopScrollPoint = elem;
                            $rootScope.$broadcast('scrollPointReachTop', elem, attr["fkScrollPoint"]);
                        }

                        //check if the scrollPoint's scrollPointReachCenter event has not been emitted
                        if($rootScope.onCenterScrollPoint !== elem && where.indexOf('center') !== -1){
                            $rootScope.onCenterScrollPoint = elem;
                            $rootScope.$broadcast('scrollPointReachCenter', elem, attr["fkScrollPoint"]);
                        }

                        //check if the scrollPoint's scrollPointReachBottom event has not been emitted
                        if($rootScope.onBottomScrollPoint !== elem && where.indexOf('bottom') !== -1){
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


        .factory('domService', ['$state', '$rootScope', '$window', '$filter', '$document', 'compatibilityService',
            function ( $state, $rootScope, $window, $filter, $document, compatibilityService ) {
                var $ = function (selector){
                        if(typeof selector === 'string')
                            return angular.element(document.querySelectorAll(selector))
                        else
                            return angular.element(selector);
                    },
                    qs = function (selector){
                        return document.querySelector(selector);
                    },
                    qsa = function(selector){
                        return document.querySelectorAll(selector);
                    },
                    body = qs('body'),

                    findProjectDetail = function(){
                        var projectName, foundProject;

                        // if goes in a project
                        if ($state.current.name.match('project.')) {

                            projectName = $state.current.name.replace('project.', '');

                            siteModel.pages.project.categories.forEach(function(category){
                                category.projects.forEach(function(project){
                                    if($filter('underscoreSpace')(project.name) === projectName){
                                        foundProject =  project;
                                    }
                                })
                            });
                        }

                        // if is in projects list
                        return foundProject;
                    },

                    elementAtWhere = function(elem){
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
                    },

                    whichElementAt = function(where){
                        for(var i=0; i<$.scrollPointStack.length; i++){
                            if(elementAtWhere($.scrollPointStack[i]).indexOf(where) > -1) return $.scrollPointStack[i]
                        }
                    };

                $.qs = qs;
                $.qsa = qsa;
                $.elementAtWhere = elementAtWhere;
                $.whichElementAt = whichElementAt;
                $.scrollPointStack = [];
                $.nowInProject = findProjectDetail();

                //while changing pages
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams){

                        $.nowInProject = findProjectDetail();

                        //scroll to top of the page
                        $window.scrollTo(0, 0);
                    }
                );

                $rootScope.$on('$viewContentLoaded',
                    function(){
                        $.scrollPointStack = $('[fk-scroll-point]');
                    }
                );


                return $;
            }
        ]);



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
                    $scope.showHeader = siteModel.showheader;


                    /********* Event Register *********/
                    // add class on header for style purpose
                    $rootScope.$on('$stateChangeStart',
                        function(event, toState){

                            // if goes in a project, change the scope variable projectInName to the project's name
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
        [ '$scope', 'timeService', '$rootScope', 'domService', '$interval', '$document',
            function($scope, timeService, $rootScope, $dom, $interval, $document){

                /********* Scope data *********/
                $scope.greeting = timeService.greeting();
                $scope.showLoadingCover = true;

                $document.ready(function(){
                    $scope.$apply(function(){
                        $scope.showLoadingCover = false;
                        $dom('svg#logo').attr("class", 'introduce');
                        siteModel.showheader = true;
                    });
                });


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


        .controller('project_introductionController', ['$scope', '$rootScope', 'domService',
            function($scope, $rootScope, $dom){


                /********* Scope data *********/
                $scope.links = siteModel.links;


                /********* Event Register *********/
                $rootScope.$on('$stateChangeSuccess',function(){
                    $scope.projectDetail = $dom.nowInProject;
                });


                /********* Initializing *********/
                $scope.projectDetail = $dom.nowInProject;
            }]
        )


        .controller('project_footerController', ['$scope', '$rootScope', 'domService', '$window',
            function($scope, $rootScope, $dom, $window){

                $scope.goToTop = function(){
                    $window.scrollTo(0);
                };

                /********* Event Register *********/
                $rootScope.$on('$stateChangeSuccess',function(){
                    $scope.projectDetail = $dom.nowInProject;
                });


                /********* Initializing *********/
                $scope.projectDetail = $dom.nowInProject;
            }]
    )

})(window);



