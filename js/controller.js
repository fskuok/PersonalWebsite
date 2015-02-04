(function (window, angFsk) {

    angFsk
        .controller('header_mainController', ['$scope',  'domService', '$rootScope',
            function($scope, $dom, $rootScope){

                $scope.projectInName = '';
                $scope.preloadImages = [];

                $scope.toggleConnect = function(){
                    $dom('div.contact').toggleClass('on')
                };

                //add class on header for style purpose
                $rootScope.$on('$stateChangeStart',
                    function(event, toState, toParams, fromState, fromParams){

                        //if goes in a project
                        if(toState.name.match('project.'))
                            $scope.projectInName = toState.name.replace('project.', '');
                        else
                            $scope.projectInName = '';
                    }
                );

                //only load after the view DOM is rendered, to not block the loading of view;
                $rootScope.$on('$viewContentLoaded', function($event){
                    $scope.preloadImages = siteModel.preloadImages;
                });
            }]
        )


        .controller('home_mainController', ['$scope', 'timeService',
            function($scope, timeService){
                $scope.greeting = timeService.greeting();
            }
        ])




        .controller('about_mainController', ['$scope', '$rootScope', 'domService',
            function($scope, $rootScope, $dom){
                $scope.disciplines = siteModel.pages.home.disciplines;
                $rootScope.$on('scrollPointReachCenter', function(event, $scrollPoint, scrollPointName){
                    $dom('svg#logo').attr("class", scrollPointName);
                });

            }]
        )




        .controller('project_mainController', ['$scope', 'domService', '$window', '$state', '$filter',
            function($scope, $dom, $window, $state, $filter){

                $scope.project = siteModel.pages.project;

                $scope.changeBackground = function(name, opacity){

                    //if it's in a project detail, set background to the cover of that project
                    if($dom('header').hasClass('in')) {
                        $scope.backgroundCSS = {
                            "opacity": 1,
                            "background-image": $state.current.name ?
                                "url('img/project/" + $filter('underscoreSpace')($state.current.name.replace('project.', '')) + "_cover.jpg')"
                                : "none"
                        };

                    //set background according the arguments
                    }else{
                        $scope.backgroundCSS = {
                            "opacity": opacity || 0,
                            "background-image":  name ?
                                            "url('img/project/" + $filter('underscoreSpace')(name) + "_cover.jpg')"
                                            : "none"
                        };
                    }
                };

                $scope.changeBackground();
            }]
        )

        .controller('projectIn_mainController', ['$scope', function($scope){

        }])

}(window, angFsk));
