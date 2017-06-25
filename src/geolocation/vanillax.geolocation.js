'use strict';

 var getCurrentLocation = function (window,userCallbackSuccess,userCallbackError) {
     var handleExceptions = function (e) {
         console.error(e);
     };

     var checkSecureConnection = function () {
         try {
             if(typeof window.location !== 'undefined'){
                 var myLocation = window.location;
                 if(myLocation.protocol){
                     var myProtocol = myLocation.protocol;
                     if(myProtocol.match(/^https\:$/i) !== null){
                         //on secure connection
                     }
                     else{
                         throw 'You are not on a secure connection';
                     }
                 }
                 else if(myLocation.href){
                     if(myLocation.href.match(/^https\:/i) !== null){
                         //on secure connection
                     }
                     else{
                         throw 'You are not on a secure connection';
                     }
                 }
             }
         }
         catch (e) {
             handleExceptions(e);
         }
     };
     var successLocation = function (position) {
         try{
             if(userCallbackSuccess && userCallbackSuccess.constructor === 'function'){
                 userCallbackSuccess(position);
             }
             else{
                 throw 'Parameter 1 should be of type function provided ' + (typeof userCallbackSuccess);
             }
         }
         catch (e){
             handleExceptions(e);
         }
     };
     var errorLocation = function (err) {
         try{
             if(userCallbackError){
                 userCallbackError(err.message);
             }
             else{
                 throw err.message;
             }
         }
         catch (e){
             handleExceptions(e);
         }
     };
    var myLocationObject = {};
     try{
         if(typeof window.navigator !== 'undefined'){
             /*checkSecureConnection();*/
             var myNavigator = window.navigator;
             if(typeof myNavigator.geolocation !== 'undefined'){
                 myNavigator.geolocation.getCurrentPosition(successLocation,errorLocation);
             }
             else{
                 //geolocation not supported in this browser
                 throw 'Geolocation is not supported by this browser';
             }
         }
     }
     catch (e){
         handleExceptions(e);
     }
};