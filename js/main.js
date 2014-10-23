(function(window) {
    'use strict';

    window.angFsk = angular.module( "fsk", ["ui.router"] );

    var i,l;

    //Site Configs
    var siteConfigs = {
        route :
            [{
                state: 'home',
                url: '/home'
            },{
                state: 'bio',
                url: '/bio'
            },{
                state: 'projects',
                url: '/projects'
            },{
                state: 'blog',
                url: '/blog'
            }]
        };
    //Site Configs End


    //Angular Begins

    angFsk.config(function( $stateProvider, $urlRouterProvider ) {

        $urlRouterProvider.otherwise('/home');

        for( i=0, l=siteConfigs.route.length; i<l; i++ ){
            $stateProvider.state(
                siteConfigs.route[i].state,
                {
                    url:
                        siteConfigs.route[i].url,
                    templateUrl:
                        'partial' + siteConfigs.route[i].url + '.html',
                    controller:
                        siteConfigs.route[i].state + '_mainController'
                }
            )
        }
    });
    
    angFsk.factory('timeService', function() {

        //arguments
        //return:String
        var getTimePeriod = function() {
            var time = (new Date()).getHours();
            if( time < 12 ){
                return "morning"
            }else if( time >= 12 && time < 18 ){
                return "afternoon"
            }else if( time >= 18 ){
                return "evening"
            }
        };

        //timeService factory return
        return {
            getTimePeriod : getTimePeriod
        };
    })

})(window);






//Other DOM Manipulations
$(function(){

    var $body = $('body');

    //Events handler - folding navigation bar
    $(window).scroll(function(){
        if($body.scrollTop() < 20){
            $('header').removeClass("folded");
        }else{
            $('header').addClass("folded");
        }
    });

});