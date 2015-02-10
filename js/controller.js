(function (window, angFsk) {

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

}(window, angFsk));
