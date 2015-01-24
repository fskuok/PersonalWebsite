(function (window, angFsk) {

    angFsk
        .controller('header_mainController', ['$scope',  'domService', '$rootScope',
            function($scope, dom, $rootScope){

                $scope.projectInName = '';
                $scope.preloadImages = [];

                $scope.toggleConnect = function(){
                    dom.$('div.contact').toggleClass('on')
                };

                $rootScope.$on('$stateChangeStart',
                    function(event, toState, toParams, fromState, fromParams){

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
                $scope.timePeriod = timeService.getTimePeriod();
            }
        ])

        .controller('about_mainController', ['$scope',
            function($scope){
                $scope.disciplines = siteModel.pages.home.disciplines;
            }]
        )


        .controller('project_mainController', ['$scope', 'domService', '$window', '$state', '$filter',
            function($scope, dom, $window, $state, $filter){

                $scope.project = siteModel.pages.project;

                $scope.changeBackground = function(name, opacity){

                    //if it's in a project detail, set background to the cover of that project
                    if(dom.$('header').hasClass('in')) {
                        $scope.backgroundCSS = {
                            "opacity": 1,
                            "background-image":  "url('img/project/" + $filter('underscoreSpace')($state.current.name.replace('project.', '')) + "_cover.jpg')"
                        };

                    //set background according the arguments
                    }else{
                        $scope.backgroundCSS = {
                            "opacity": opacity || 0,
                            "background-image":  "url('img/project/" + $filter('underscoreSpace')(name || '') + "_cover.jpg')"
                        };
                    }
                };

                $scope.changeBackground();
            }]
        )

        .controller('projectIn_mainController', ['$scope', function($scope){

        }])

}(window, angFsk));
