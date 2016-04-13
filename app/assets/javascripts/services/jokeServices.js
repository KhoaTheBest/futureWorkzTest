'use strict';
var GET_NEXT_JOKES = '/api/v1/jokes/nextJoke';
var UPDATE_JOKE = '/api/v1/jokes/:id';

mainModule.service('JokeServices', [
    '$http',
    '$q',
    function($http, $q) {
        this.getNextJoke = function() {
            var deferred = $q.defer();

            $http.get(GET_NEXT_JOKES).then(function(success) {
                deferred.resolve(success.data);
            }, function(error) {
                deferred.reject(error.data);
            });

            return deferred.promise;
        };

        this.updateJoke = function(id, action) {
          var deferred = $q.defer();

          $http.put(UPDATE_JOKE.replace(':id', id),{
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
