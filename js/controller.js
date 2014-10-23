(function (window, angFsk) {
    angFsk

        .controller('home_mainController', ['$scope', 'timeService', function($scope, timeService){
            document.getElementsByTagName('body')[0].setAttribute('class', 'home');

            $scope.timePeriod = timeService.getTimePeriod();

            $('#frontPage').parallax({
                calibrateX: false,
                calibrateY: false,
                invertX: false,
                invertY: false,
                limitX: false,
                limitY: false,
                scalarX: 4,
                scalarY: 4,
                frictionX: 0.4,
                frictionY: 0.4,
                originX: 0.5,
                originY: 0.5
            });
        }])

        .controller('bio_mainController', ['$scope', function($scope){
            document.getElementsByTagName('body')[0].setAttribute('class', 'bio');
            $scope.disciplines = siteModel.home.disciplines;
        }])

        .controller('projects_mainController', ['$scope', function($scope){
            document.getElementsByTagName('body')[0].setAttribute('class', 'projects');
        }])

        .controller('blog_mainController', ['$scope', function($scope){
            document.getElementsByTagName('body')[0].setAttribute('class', 'blog');
        }]);
}(window, angFsk));
