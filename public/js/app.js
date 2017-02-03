var congressApp = angular.module('congressApp', ['ngRoute']);
var root = 'https://api.propublica.org/congress/v1/'
var apiKey = 'wqHoVKtM5J2EL6Nmf45mO4A42eFOXIWDFYkxdaI1';

congressApp.controller('mainController', function(){

});

congressApp.controller('aboutController', function(){

});

congressApp.controller('billsController', ['$http', function($http){
  $http({
    method: 'GET',
    url: root + '115/senate/bills/introduced.json',
    headers: {'X-API-Key': apiKey}
  }).then(
    function(response){
      console.log(response);
      this.sBills = response.data.results[0].bills;
      console.log(this.sBills);
    }.bind(this)
  );

  $http({
    method: 'GET',
    url: root + '115/house/bills/introduced.json',
    headers: {'X-API-Key': apiKey}
  }).then(
    function(response){
      console.log(response);
      this.hBills = response.data.results[0].bills;
      console.log(this.hBills);
    }.bind(this)
  );

}]);

congressApp.controller('senateController', ['$http', function($http){
  $http({
    method: 'GET',
    url: root + '115/senate/members.json',
    headers: {'X-API-Key': apiKey}
  }).then(
    function(response){
      console.log(response);
      this.members = response.data.results[0].members;
      console.log(this.members);
    }.bind(this)
  );
}]);

congressApp.controller('senatorController', ['$routeParams', '$http', function($routeParams, $http){
  this.id = $routeParams.id
  $http({
    method: 'GET',
    url: root + 'members/' + this.id + '.json',
    headers: {'X-API-Key': apiKey}
  }).then(
    function(response){
      console.log(response);
      this.senator = response.data.results[0]
      console.log(this.senator);
    }.bind(this)).then(
      function(){
        if(this.senator.current_party = "D"){
          this.party = "Democrat"
        }else if(this.senator.current_party = "R"){
          this.party = "Republican"
        }else{
          this.party = "Independent"
        }
      }.bind(this)
    );

    $http({
      method: 'Get',
      url: root + 'members/' + this.id + '/votes.json',
      headers: {'X-API-Key': apiKey}
    }).then(
      function(response){
        this.senVotes = response.data.results[0].votes;
        console.log(this.senVotes);
      }.bind(this)
    );


}]);

congressApp.controller('houseController', function(){

});

congressApp.controller('myCongressController', function(){

});

congressApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $locationProvider.html5Mode({enabled: true});

  $routeProvider.otherwise({
    redirectTo: '/'
  });

  $routeProvider.when('/', {
    templateUrl: 'partials/home.html',
    controller: 'mainController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/about', {
    templateUrl: 'partials/about.html',
    controller: 'aboutController',
    controllerAs: 'aCtrl'
  });

  $routeProvider.when('/bills', {
    templateUrl: 'partials/bills.html',
    controller: 'billsController',
    controllerAs: 'bCtrl'
  });

  $routeProvider.when('/senate', {
    templateUrl: 'partials/senate.html',
    controller: 'senateController',
    controllerAs: 'sCtrl'
  });

  $routeProvider.when('/senate/:id', {
    templateUrl: 'partials/senator.html',
    controller: 'senatorController',
    controllerAs: 'senCtrl'
  });

  $routeProvider.when('/house', {
    templateUrl: 'partials/house.html',
    controller: 'houseController',
    controllerAs: 'hCtrl'
  });

  $routeProvider.when('/mycongress', {
    templateUrl: 'partials/my_congress.html',
    controller: 'myCongressController',
    controllerAs: 'mCtrl'
  });

}]);
