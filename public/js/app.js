var congressApp = angular.module('congressApp', ['ngRoute']);
var root = 'https://api.propublica.org/congress/v1/'
var apiKey = 'wqHoVKtM5J2EL6Nmf45mO4A42eFOXIWDFYkxdaI1';
var ordinal = function(i){
  var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
}

congressApp.controller('mainController', function(){

});

congressApp.controller('aboutController', function(){

});

congressApp.controller('billsController', ['$http', function($http){
  this.ordinal = ordinal;
  this.congress = 115;
  $http({
    method: 'GET',
    url: root + this.congress + '/senate/bills/introduced.json',
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
      this.senator = response.data.results[0];
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
      method: 'GET',
      url: root + 'members/' + this.id + '/votes.json',
      headers: {'X-API-Key': apiKey}
    }).then(
      function(response){
        this.senVotes = response.data.results[0].votes;
        console.log(this.senVotes);
      }.bind(this)
    );


}]);

congressApp.controller('houseController', ['$http', function($http){
  $http({
    method: 'GET',
    url: root + '115/house/members.json',
    headers: {'X-API-Key': apiKey}
  }).then(
    function(response){
      console.log(response);
      this.members = response.data.results[0].members;
      console.log(this.members);
    }.bind(this)
  );

}]);

congressApp.controller('houseRepController', ['$routeParams', '$http', function($routeParams, $http){
  this.id = $routeParams.id
  $http({
    method: 'GET',
    url: root + 'members/' + this.id + '.json',
    headers: {'X-API-Key': apiKey}
  }).then(
    function(response){
      console.log(response);
      this.rep = response.data.results[0];
      console.log(this.rep);
    }.bind(this)).then(
      function(){
        if(this.rep.current_party = "D"){
          this.party = "Democrat"
        }else if(this.rep.current_party = "R"){
          this.party = "Republican"
        }else{
          this.party = "Independent"
        }
      }.bind(this)
    );

    $http({
      method: 'GET',
      url: root + 'members/' + this.id + '/votes.json',
      headers: {'X-API-Key': apiKey}
    }).then(
      function(response){
        this.repVotes = response.data.results[0].votes;
        console.log(this.repVotes);
      }.bind(this)
    );

}]);

congressApp.controller('myCongressController', ['$http', function($http){
  this.senLoad = false;
  this.houseLoad = false;

  this.getDis = function(){
    this.address = this.dis[0] + ' ' + this.dis[1] + ' ' + this.dis[2];
    $http({
      method: 'GET',
      url: '/mycongress/dis/' + this.address,
      params: {
        address: this.address
      }
    }).then(
      function(response){
        console.log(this.address);
        console.log(response);
        this.district = response.data.code;
        this.districtName = response.data.name;
        this.state = this.dis[2];
        this.disArr = this.district.split('');
        this.findNum = function(district){
          if(district[3] === '0'){
            num = district[4]
          }else{
            num = district.slice(3).join('');
          };
          return num
        }
        this.num = this.findNum(this.disArr);
        console.log(this.num);
        this.getSen(this.state);
        this.getHouse(this.state, this.num);

      }.bind(this)
    );
  }

  this.getSen = function(state){
    $http({
      method: 'GET',
      url: root + 'members/senate/' + state + '/current.json',
      headers: {'X-API-Key': apiKey}
    }).then(
      function(response){
        console.log(this.senators);
        this.senators = response.data.results;
        this.senLoad = true;
      }.bind(this)
    );
  }

  this.getHouse = function(state, district){
    $http({
      method: 'GET',
      url: root + 'members/house/' + state + '/' + district + '/current.json',
      headers: {'X-API-Key': apiKey}
    }).then(
      function(response){
        console.log(response);
        this.rep = response.data.results[0];
        this.houseLoad = true;
      }.bind(this)
    )
  }

}]);

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

  $routeProvider.when('/house/:id', {
    templateUrl: 'partials/houserep.html',
    controller: 'houseRepController',
    controllerAs: 'repCtrl'
  });

  $routeProvider.when('/mycongress', {
    templateUrl: 'partials/my_congress.html',
    controller: 'myCongressController',
    controllerAs: 'mCtrl'
  });

}]);
