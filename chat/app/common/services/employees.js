angular.module('employees.service',[])
       .service('employeesService',['$filter' , '$rootScope' , '$http', 'DEFAULT_VAL' ,  employeesService]);



function employeesService($filter, $rootScope , $http , DEFAULT_VAL) {

  var service = {};
  var employees = {};
  service.get = get;
  service.employees = service.get;
  service.getChatList = getChatList;
  service.getUser = getUser;
  service.getUserById = getUserById;
  service.updateUser = updateUser;
  service.deleteUser = deleteUser;
  service.deleteBulkUser = deleteBulkUser;
//  service.saveUser = saveUser;
  
  return service;


  function get(callback) {
      
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
                callback(data.data.data);
            }
        }, function(status) {
            alert('error');
        });   
        
  }
  
  function getChatList(callback) {
      
      var req = {}; 
         
        req.cmd = 'get_chat_list';    
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
                callback(data.data.data);
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
            'cmd' : 'get_user',
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
