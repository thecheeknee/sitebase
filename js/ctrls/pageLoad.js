angular
	.module('app')
	.controller('pageLoad',[ '$scope', 'Datamap', function($scope, Datamap){
		$scope.title = "thecheeknee";
		//$scope.$storage = $localStorage;
		//$scope.$storage.counter = $scope.$storage.counter+1 || 0;
		Datamap.getData().then(function(response){

      $scope.datamap = response.data;
			$scope.welcomemessage = $scope.datamap[0].message;
			if (typeof(Storage) !== "undefined") {
				if(localStorage.visited){//user has been here before
					$scope.welcomemessage = $scope.datamap[0].returnmessage;
				}else{
					localStorage.setItem("visited","yo");
				}
			}
			$scope.categories = $scope.datamap[1].persona;
			$scope.character = $scope.datamap[2].info;
			$scope.contact = $scope.datamap[3];
			$scope.message = '';
			$scope.contactname = 'Your Name here';
			$scope.contactemail = 'yourname@here.now';
			$scope.mailtext = "Hi Cheeknee,\n\nWe need your help/advice in the following:\n";
			$scope.tagslist = {};
			$scope.addTag = function(tagname,tagtype){
				if(!$scope.tagslist[tagtype]){//tag does not exist
					$scope.tagslist[tagtype]=[];//initialise
				}
				//debugger;
				if( $scope.tagslist[tagtype].lastIndexOf(tagname) == -1){
					$scope.tagslist[tagtype].push(tagname);
				}else{
					var i = $scope.tagslist[tagtype].lastIndexOf(tagname);
					$scope.tagslist[tagtype].splice(i, 1);
				}
				var sentenceStrings = {};
				var message = '';

				angular.forEach($scope.tagslist, function(key, value){
					if(!sentenceStrings[value]){
						sentenceStrings[value] = "\n" + value + " projects : \n";
					}
					angular.forEach(key,function(k, v){
						sentenceStrings[value] = sentenceStrings[value] + " -- " + k + "\n";
					})
				});
				angular.forEach(sentenceStrings, function(key, value){
					message = message + key;
				});
				$scope.message = $scope.mailtext + message + '\nRegards\n' + $scope.contactname + '\n';
			}
    });
		//['code','cuisine','cartoons','clicked','cussing','creativity'];
		$scope.main = ['cheeknee','categories','character','contact'];
		$scope.$on('$viewContentLoaded', function(event){
			window.setTimeout(function(){
				checkPage();
			},400);
		});
	}]);
