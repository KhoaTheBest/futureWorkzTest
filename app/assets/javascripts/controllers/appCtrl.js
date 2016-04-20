'use strict';
mainModule.controller('AppCtrl', [
    '$scope',
    '$log',
    'JokeServices',
    function($scope, $log, jokeServices) {
        $scope.content = "";

        var loadJoke = function() {
            jokeServices.getNextJoke()
                .then(function(joke) {
                    $log.info(joke);
                    $scope.content = joke;
                }, function(error) {
                    $log.info(error);
                });
        };

        loadJoke();

        $scope.like = function(id) {
            jokeServices.updateJoke(id, 1)
                .then(function(success) {
                    $log.info(success);
                    loadJoke();
                }, function(error) {
                    $log.info(error);
                });
        };

        $scope.dislike = function(id) {
            jokeServices.updateJoke(id, 0)
                .then(function(success) {
                    $log.info(success);
                    loadJoke();
                }, function(error) {
                    $log.info(error);
                });
        };
    }
]);
