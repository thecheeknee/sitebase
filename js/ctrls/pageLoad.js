angular
	.module('app')
	.controller('pageLoad',[ '$scope', function($scope){
		$scope.title = "thecheeknee";
		$scope.categories = ['code','cuisine','cartoons','clicked','cussing','creativity'];
		$scope.main = ['cheeknee','categories','character','contact'];
		$scope.$on('$viewContentLoaded', function(event){
			window.setTimeout(function(){
				checkPage();
			},400);
		});
	}]);