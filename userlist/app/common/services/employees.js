angular.module('employees.service',[])
       .service('employeesService',['$filter' , '$rootScope' , '$http', 'DEFAULT_VAL' ,  employeesService]);



function employeesService($filter, $rootScope , $http , DEFAULT_VAL) {

  var service = {};
  var employees = {};
  service.get = get;
  service.employees = service.get;
  service.getUser = getUser;
  service.getUserById = getUserById;
  service.updateUser = updateUser;
  service.deleteUser = deleteUser;
  service.deleteBulkUser = deleteBulkUser;
  service.saveUser = saveUser;
  
  return service;


  function get(callback) {
//    return [
//        {'id' : 1 , 'fullName' : 'Pranay' , 'email' : 'pranay@gmail.com' , 'address' : 'Pranay Address', age: 28, gender: 'M', education: 'M.COM'},
//        {'id' : 2 , 'fullName' : 'Shamsher' , 'email' : 'shamsher@gmail.com' , 'address' : 'Shamsher Address', age: 25, gender: 'M', education: 'M.Tech'},
//        {'id' : 3 , 'fullName' : 'Amrutha' , 'email' : 'amrutha@gmail.com' , 'address' : 'Amrutha Address', age: 26, gender: 'M', education: 'MCA'},
//        {'id' : 4 , 'fullName' : 'Mukul' , 'email' : 'mukul@gmail.com' , 'address' : 'Mukul Address', age: 24, gender: 'M', education: 'B.Tech'}];
        var req = {}; 
         
        req.cmd = 'get_all_users';    
        req.token = true;
        var url = DEFAULT_VAL.SERVER_URL;
        $http({
            method: 'get',
            url: url,
            params: { 'data' : req },
        }).
        then(function(data) {
            if(data.data.status == 'ok')
            {
                callback(data.data);
            }
        }, function(status) {
            alert('error');
        });   
        
  }
  function updateUser(user , callback) {
      
//      angular.forEach(service.employees, function(value, key) {
//        if(value.id == user.id)  {
//            service.employees[key] = user;
//        };
//      });
      
      
      var req = {
            'cmd' : 'update_user',
//            'cmd' : '',
            'user_id' : user.id,
            'user' : user
        };
        console.log(req);
        var url = DEFAULT_VAL.SERVER_URL;
        $http({
            method: 'PUT',
            url: url,
            data: { 'data' : req },
        }).
        then(function(data) {
            
            callback(data.data);
            
        }, function(status) {
            alert('error');
        }); 
        
  }
  
  function saveUser(user , callback ) {
//      console.log(user);
//      user.id = service.employees.length + 1;
//      service.employees.push(user);
//      console.log(service.employees);
//console.log(DEFAULT_VAL);
//console.log(DEFAULT_VAL.SERVER_URL);
        user.cmd = 'add_user';    
        user.token = true;
//        user.name = user.fullName;
        var url = DEFAULT_VAL.SERVER_URL;
        $http({
            method: 'POST',
            url: url,
            params: { 'data' : user },
        }).
        then(function(data) {
            if(data.data.status == 'ok')
            {
                callback();
            }
            else
            {
                alert(data.data.msg);
            }
        }, function(status) {
            alert('error');
        });       

  }
  function deleteUser(id , callback) {
//      console.log(employees);
//      angular.forEach(employees, function(value, key) {
////          console.log(value);
////          console.log(value.id);console.log(id);
////          if(employees.hasOwnProperty(value.id)) {
//              
//            if(value.id == id) {
//                
//                employees.splice(key , 1);
//            }
////          }
//      });
//      return employees;
//      console.log(employees);
      
      
      
       var req = {
            'cmd' : 'delete_user',
            'user_id' : id,
        };
        var url = DEFAULT_VAL.SERVER_URL;
        $http({
            method: 'DELETE',
            url: url,
            params: { 'data' : req },
        }).
        then(function(data) {
            callback(data.data);
        }, function(status) {
            alert('error');
        }); 
      
  }
  function deleteBulkUser(ids , callback) {
       var req = {
            'cmd' : 'delete_bulk_user',
            'user_ids' : ids,
        };
        var url = DEFAULT_VAL.SERVER_URL;
        $http({
            method: 'DELETE',
            url: url,
            params: { 'data' : req },
        }).
        then(function(data) {
            callback(data.data);
        }, function(status) {
            alert('error');
        }); 
      
  }
  
  function getUser(email , callback) {
//    return $filter('filter')(get(), {email: email })[0];
        var req = {
            'cmd' : 'getUser',
            'email' : email,
        };
        var url = DEFAULT_VAL.SERVER_URL;
        $http({
            method: 'GET',
            url: url,
            params: { 'data' : req },
        }).
        then(function(data) {
            callback(data.data);
        }, function(status) {
            alert('error');
        }); 
  }
  function getUserById(id , callback) {
//      console.log(service.employees);
//      if(runtime) return $filter('filter')(service.employees, {id: id })[0];
//    return $filter('filter')(get(), {id: id })[0];
        var req = {
            'cmd' : 'getUser',
//            'cmd' : '',
            'user_id' : id,
        };
        var url = DEFAULT_VAL.SERVER_URL;
        $http({
            method: 'GET',
            url: url,
            params: { 'data' : req },
        }).
        then(function(data) {
            
            callback(data.data);
            
        }, function(status) {
            alert('error');
        }); 
        

  }
};
