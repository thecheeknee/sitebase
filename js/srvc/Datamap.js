angular
  .module('app')
  .factory('Datamap', function($http) {
    //debugger;
    return{
      getData: function(){
        return $http.get('data/data.json',{ cache: true});
      }
    }
  });
