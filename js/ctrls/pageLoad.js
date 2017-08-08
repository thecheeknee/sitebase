angular
	.module('app')
	.controller('pageLoad',[ '$scope', 'Datamap', function($scope, Datamap){
		$scope.title = "thecheeknee";
		Datamap.getData().then(function(response){

      $scope.datamap = response.data;
			$scope.categories = $scope.datamap[1].persona;
			$scope.character = $scope.datamap[2].info;
    });
		//['code','cuisine','cartoons','clicked','cussing','creativity'];
		$scope.main = ['cheeknee','categories','character','contact'];
		$scope.$on('$viewContentLoaded', function(event){
			window.setTimeout(function(){
				checkPage();
			},400);
		});
	}]);
