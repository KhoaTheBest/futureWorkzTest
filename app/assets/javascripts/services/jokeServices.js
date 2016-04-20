'use strict';
var GET_NEXT_JOKES = '/api/v1/jokes/nextJoke';
var UPDATE_JOKE = '/api/v1/jokes/:id';

mainModule.service('JokeServices', [
    '$http',
    '$q',
    '$log',
    'localStorageService',
    function($http, $q, $log, localStorageService) {
        this.getNextJoke = function() {
            var deferred = $q.defer();
            var listOfReadJokes = "";

            if (localStorageService.cookie.get('readJokeIds')) {
                listOfReadJokes = localStorageService.cookie.get('readJokeIds');
            }

            $http.post(GET_NEXT_JOKES, {
                joke: {
                    read_jokes: listOfReadJokes
                }
            }).then(function(success) {
                deferred.resolve(success.data.joke);

                if(success.data.joke.id) {
                  listOfReadJokes += success.data.joke.id + ","
                  localStorageService.cookie.set("readJokeIds", listOfReadJokes);
                }
            }, function(error) {
                deferred.reject(error.data);
            });

            return deferred.promise;
        };

        this.updateJoke = function(id, action) {
            var deferred = $q.defer();

            $http.put(UPDATE_JOKE.replace(':id', id), {
                joke: {
                    doAction: action
                }
            }).then(function(success) {
                deferred.resolve(success.data);
            }, function(error) {
                deferred.reject(error.data);
            });

            return deferred.promise;
        };
    }
]);
