(function(window) {
    'use strict';

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


})(window);


