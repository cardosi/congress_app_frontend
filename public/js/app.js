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

congressApp.controller('senatebillsController', ['$rootScope', '$http', function($rootScope, $http){
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

  this.setBillQ = function(uri){
    $rootScope.billQ = uri;
    console.log($rootScope.billQ);
  }

  this.updateBills = function(){
    console.log(this.congNum);
    console.log(this.congType);
    $http({
      method: 'GET',
      url: root + this.congNum + '/senate/bills/' + this.congType + '.json',
      headers: {'X-API-Key': apiKey}
    }).then(
      function(response){
        console.log(response);
        this.sBills = response.data.results[0].bills;
        this.congress = this.congNum;
        console.log(this.sBills);
      }.bind(this)
    );
  }

}]);

congressApp.controller('housebillsController', ['$rootScope', '$http', function($rootScope, $http){
  this.ordinal = ordinal;
  this.congress = 115;

  this.setBillQ = function(uri){
    $rootScope.billQ = uri;
    console.log($rootScope.billQ);
  }


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

  this.updateBills = function(){
    console.log(this.congNum);
    console.log(this.congType);
    $http({
      method: 'GET',
      url: root + this.congNum + '/house/bills/' + this.congType + '.json',
      headers: {'X-API-Key': apiKey}
    }).then(
      function(response){
        console.log(response);
        this.hBills = response.data.results[0].bills;
        this.congress = this.congNum;
        console.log(this.hBills);
      }.bind(this)
    );
  }


}]);

congressApp.controller('senatecommitteesController', ['$http', function($http){
  $http({
    method: 'GET',
    url: root + '115/senate/committees.json',
    headers: {'X-API-Key': apiKey}
  }).then(
    function(response){
      console.log(response);
      this.committees = response.data.results[0].committees;
      console.log(this.committees);
    }.bind(this)
  );

  this.party = function(party){
      if(party === "D"){
        return "Democrat"
      }else if(party === "R"){
        return "Republican"
      }else{
        return "Independent"
      }
  }

}]);

congressApp.controller('housecommitteesController', ['$http', function($http){
  $http({
    method: 'GET',
    url: root + '115/house/committees.json',
    headers: {'X-API-Key': apiKey}
  }).then(
    function(response){
      console.log(response);
      this.committees = response.data.results[0].committees;
      console.log(this.committees);
    }.bind(this)
  );

  this.party = function(party){
      if(party === "D"){
        return "Democrat"
      }else if(party === "R"){
        return "Republican"
      }else{
        return "Independent"
      }
  }

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

  this.congress = 115
  this.ordinal = ordinal;

  this.updateSen = function(congNum){
    console.log(congNum);
    $http({
      method: 'GET',
      url: root + congNum + '/senate/members.json',
      headers: {'X-API-Key': apiKey}
    }).then(
      function(response){
        console.log(response);
        this.members = response.data.results[0].members;
        this.congress = congNum;
        console.log(this.members);
        console.log(this.congress);
      }.bind(this)
    );
  }

  this.party = function(party){
      if(party === "D"){
        return "Democrat"
      }else if(party === "R"){
        return "Republican"
      }else{
        return "Independent"
      }
  }

  this.alphaSort = function(){
    console.log("sorting alphabetically");
    this.members.sort(function(a, b){
      return a.state.localeCompare(b.state);
    })
    console.log(this.members);
  }

  this.alphaSortRev = function(){
    console.log("sorting alphabetically");
    this.members.sort(function(a, b){
      return b.state.localeCompare(a.state);
    })
    console.log(this.members);
  }

  this.senioritySort = function(){
    console.log("sorting by seniority");
    this.members.sort(function(a, b){
      return parseFloat(a.seniority) - parseFloat(b.seniority);
    })
  }

  this.senioritySortRev = function(){
    console.log("sorting by seniority");
    this.members.sort(function(a, b){
      return parseFloat(b.seniority) - parseFloat(a.seniority);
    })
  }

  this.partyVoteSort = function(){
    console.log("sorting by party vote");
    this.members.sort(function(a, b){
      return parseFloat(a.votes_with_party_pct) - parseFloat(b.votes_with_party_pct);
    })
  }

  this.partyVoteSortRev = function(){
    console.log("sorting by party vote - reverse");
    this.members.sort(function(a, b){
      return parseFloat(b.votes_with_party_pct) - parseFloat(a.votes_with_party_pct);
    })
  }

  this.missedVoteSort = function(){
    console.log("sorting by missed votes");
    this.members.sort(function(a, b){
      return parseFloat(a.missed_votes) - parseFloat(b.missed_votes);
    })
  }

  this.missedVoteSortRev = function(){
    console.log("sorting by missed votes - reverse");
    this.members.sort(function(a, b){
      return parseFloat(b.missed_votes) - parseFloat(a.missed_votes);
    })
  }

  this.hideAll = false;
  this.hideParty = ['D', 'R', 'I'];

  this.showParty = function(party){
    this.hideAll = true;
    var index = this.hideParty.indexOf(party);
    if(index > -1){
      this.hideParty.splice(index, 1);
    }else{
      this.hideParty.push(party);
    }
  }

  this.hideAllState = false;
  this.hideState = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

  this.showState = function(state){
    console.log('show', state);
    this.hideAllState = true;
    var index = this.hideState.indexOf(state);
    if(index > -1){
      this.hideState.splice(index, 1);
    }else{
      this.hideState.push(state);
    }
  }


}]);

congressApp.controller('committeeController', ['$routeParams', '$http', function($routeParams, $http){
  this.congress = $routeParams.congress;
  this.chamber = $routeParams.chamber;
  this.id = $routeParams.id;
  $http({
    method: 'GET',
    url: root + this.congress + '/' + this.chamber + '/committees/' + this.id + '.json',
    headers: {'X-API-Key': apiKey}
  }).then(
    function(response){
      console.log(response);
    }.bind(this)
  )
}])

congressApp.controller('senatorController', ['$routeParams', '$http', function($routeParams, $http){
  this.id = $routeParams.id;
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

    this.voteData = {};

    this.rollCall = function(congress, session, rcNum, x){
      console.log(x);
      var y = x;
      $http({
        method: 'GET',
        url: root + congress + '/senate/sessions/' + session + '/votes/' + rcNum + '.json',
        headers: {'X-API-Key': apiKey}
      }).then(
        function(response){
          console.log(y);
          console.log(response);
          // this.voteData = {x: response.data.results.votes.vote};
          var key = x;
          // this.voteData = {};
          this.voteData[key] = response.data.results.votes.vote;
          console.log(this.voteData[key]);
          console.log(this.voteData);

        }.bind(this)
      )
    }

}]);

congressApp.controller('billController', ['$rootScope', '$routeParams', '$http', function($rootScope, $routeParams, $http){
  // this.id = $routeParams.id
  console.log($rootScope.billQ);
  $http({
    method: 'GET',
    url: $rootScope.billQ,
    headers: {'X-API-Key': apiKey}
  }).then(
    function(response){
      console.log(response);
      this.bill = response.data.results[0];
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

  this.congress = 115
  this.ordinal = ordinal;

  this.updateHouse = function(congNum){
    console.log(congNum);
    $http({
      method: 'GET',
      url: root + congNum + '/house/members.json',
      headers: {'X-API-Key': apiKey}
    }).then(
      function(response){
        console.log(response);
        this.members = response.data.results[0].members;
        this.congress = congNum;
        console.log(this.members);
        console.log(this.congress);
      }.bind(this)
    );
  }


  this.party = function(party){
      if(party === "D"){
        return "Democrat"
      }else if(party === "R"){
        return "Republican"
      }else{
        return "Independent"
      }
  }

  this.alphaSort = function(){
    console.log("sorting alphabetically");
    this.members.sort(function(a, b){
      return a.state.localeCompare(b.state);
    })
    console.log(this.members);
  }

  this.alphaSortRev = function(){
    console.log("sorting alphabetically");
    this.members.sort(function(a, b){
      return b.state.localeCompare(a.state);
    })
    console.log(this.members);
  }

  this.senioritySort = function(){
    console.log("sorting by seniority");
    this.members.sort(function(a, b){
      return parseFloat(a.seniority) - parseFloat(b.seniority);
    })
  }

  this.senioritySortRev = function(){
    console.log("sorting by seniority");
    this.members.sort(function(a, b){
      return parseFloat(b.seniority) - parseFloat(a.seniority);
    })
  }

  this.partyVoteSort = function(){
    console.log("sorting by party vote");
    this.members.sort(function(a, b){
      return parseFloat(a.votes_with_party_pct) - parseFloat(b.votes_with_party_pct);
    })
  }

  this.partyVoteSortRev = function(){
    console.log("sorting by party vote - reverse");
    this.members.sort(function(a, b){
      return parseFloat(b.votes_with_party_pct) - parseFloat(a.votes_with_party_pct);
    })
  }

  this.missedVoteSort = function(){
    console.log("sorting by missed votes");
    this.members.sort(function(a, b){
      return parseFloat(a.missed_votes) - parseFloat(b.missed_votes);
    })
  }

  this.missedVoteSortRev = function(){
    console.log("sorting by missed votes - reverse");
    this.members.sort(function(a, b){
      return parseFloat(b.missed_votes) - parseFloat(a.missed_votes);
    })
  }

  this.hideAll = false;
  this.hideParty = ['D', 'R', 'I'];

  this.showParty = function(party){
    this.hideAll = true;
    var index = this.hideParty.indexOf(party);
    if(index > -1){
      this.hideParty.splice(index, 1);
    }else{
      this.hideParty.push(party);
    }
  }

  this.hideAllState = false;
  this.hideState = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY', 'MP', 'AS', 'VI', 'GU'];

  this.showState = function(state){
    console.log('show', state);
    this.hideAllState = true;
    var index = this.hideState.indexOf(state);
    if(index > -1){
      this.hideState.splice(index, 1);
    }else{
      this.hideState.push(state);
    }
  }

}]);

congressApp.controller('houseRepController', ['$routeParams', '$http', function($routeParams, $http){
  this.voteData = {};
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

    this.rollCall = function(congress, session, rcNum, x){
      console.log(x);
      var y = x;
      $http({
        method: 'GET',
        url: root + congress + '/house/sessions/' + session + '/votes/' + rcNum + '.json',
        headers: {'X-API-Key': apiKey}
      }).then(
        function(response){
          console.log(y);
          console.log(response);
          // this.voteData = {x: response.data.results.votes.vote};
          var key = x;
          // this.voteData = {};
          this.voteData[key] = response.data.results.votes.vote;
          console.log(this.voteData[key]);
          console.log(this.voteData);

        }.bind(this)
      )
    }


}]);

congressApp.controller('myCongressController', ['$http', function($http){
  this.senLoad = false;
  this.houseLoad = false;

  this.getDis = function(){
    this.address = this.user.address + ' ' + this.user.city + ' ' + this.user.state;
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
        this.state = this.user.state;
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
        this.addUserDistrict(this.district);
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
        this.senators = response.data.results;
        this.senLoad = true;
        console.log(this.senators);
        this.addSenIds(this.senators[0].id, this.senators[1].id);
        // this.getSenPic(this.senators[0].id);
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
        this.addRepId(this.rep.id)
      }.bind(this)
    )
  }

  this.party = function(party){
      if(party === "D"){
        return "Democrat"
      }else if(party === "R"){
        return "Republican"
      }else{
        return "Independent"
      }
  }

  this.backend = 'https://congress-explore-backend.herokuapp.com';
  this.user = {};
  this.loggedIn = false;

  this.login = function(userPass){
    console.log(userPass);
    $http({
      method: 'POST',
      url: this.backend + '/users/login',
      data: {user: {username: userPass.username, password: userPass.password}}
    }).then(
      function(response){
        console.log(response);
        this.user = response.data.user;
        localStorage.setItem('token', JSON.stringify(response.data.token));
        this.getDis();
        this.loggedIn = true;
      }.bind(this)
    );
  }

  this.reg = function(userReg){
    console.log(userReg);
    $http({
      method: 'POST',
      url: this.backend + '/users',
      data: {user: {username: userReg.username, password: userReg.password, address: userReg.address, city: userReg.city, state: userReg.state}}
    }).then(
      function(response){
        console.log(response);
        this.user = response.data.user;
        localStorage.setItem('token', JSON.stringify(response.data.token));
        this.getDis();
        this.loggedIn = true;
      }.bind(this)
    );
  }

  this.addUserDistrict = function(dist){
    $http({
      method: 'PUT',
      url: this.backend + '/users/' + this.user.id,
      data: {user: {district: dist}}
    }).then(
      function(response){
        console.log(response);
      }
    )
  }

  this.addSenIds = function(senIdOne, senIdTwo){
    $http({
      method: 'PUT',
      url: this.backend + '/users/' + this.user.id,
      data: {user: {senOneId: senIdOne, senTwoId: senIdTwo}}
    }).then(
      function(response){
        console.log(response);
      }
    )
  }

  this.addRepId = function(repId){
    $http({
      method: 'PUT',
      url: this.backend + '/users/' + this.user.id,
      data: {user: {repId: repId}}
    }).then(
      function(response){
        console.log(response);
      }
    )
  }

  this.logOut = function(){
    localStorage.clear('token');
    this.loggedIn = false;
    this.user = {};
    this.senLoad = false;
    this.houseLoad = false;
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

  $routeProvider.when('/senatebills', {
    templateUrl: 'partials/senatebills.html',
    controller: 'senatebillsController',
    controllerAs: 'sbCtrl'
  });

  $routeProvider.when('/housebills', {
    templateUrl: 'partials/housebills.html',
    controller: 'housebillsController',
    controllerAs: 'hbCtrl'
  });

  $routeProvider.when('/senatecommittees', {
    templateUrl: 'partials/senatecommittees.html',
    controller: 'senatecommitteesController',
    controllerAs: 'scCtrl'
  });

  $routeProvider.when('/housecommittees', {
    templateUrl: 'partials/housecommittees.html',
    controller: 'housecommitteesController',
    controllerAs: 'hcCtrl'
  });

  $routeProvider.when('/committee/:congress/:chamber/:id', {
    templateUrl: 'partials/committee.html',
    controller: 'committeeController',
    controllerAs: 'cCtrl'
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

  $routeProvider.when('/bill/:id', {
    templateUrl: 'partials/bill.html',
    controller: 'billController',
    controllerAs: 'bCtrl'
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
