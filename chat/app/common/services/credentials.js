angular.module('credentials.service',[])
       
       
       .service('credentials',['$filter' , credentials]);



function credentials($filter) {
    var service = {};
    
    service.getAllUsers = getAllUsers;
    service.getAllByEmail = getAllByEmail;
    
    
    return service;
    
    
    function getAllUsers() {
        return [
        {id: 1, 'name' : 'Pranay' , 'email' : 'pranay@gmail.com' , 'password' : 'asd@123'},
        {id: 2, 'name' : 'Shamsher' , 'email' : 'shamsher@gmail.com' , 'password' : 'asd@123'},
        {id: 3, 'name' : 'Amrutha' , 'email' : 'amrutha@gmail.com' , 'password' : 'asd@123'},
        {id: 4, 'name' : 'Mukul' , 'email' : 'mukul@gmail.com' , 'password' : 'asd@123'}];
    }
    
    function getAllByEmail(email) {
        return $filter('filter')(getAllUsers(), {email: email })[0];
    }
    
    
  }