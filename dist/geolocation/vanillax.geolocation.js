'use strict';

 var x_getCurrentLocation = function (window,userCallbackSuccess,userCallbackError) {
     var handleExceptions = function (e) {
         console.error(e);
     };

     var checkBrowserSupport = function () {
         var rBrowser = /chrome\/5[0-9]/i;
         var userString = window.navigator.userAgent;
         if(typeof userString !== 'undefined'){
             if(userString.match(rBrowser) !== null){
                 checkSecureConnection(userString.match(rBrowser)[0]);
             }
         }
     };

     var checkSecureConnection = function (browserName) {
         try {
             if(typeof window.location !== 'undefined'){
                 var myLocation = window.location;
                 if(myLocation.href){
                     if(myLocation.href.match(/^https\:/i) !== null){
                         //on secure connection
                     }
                     else if(myLocation.href.match(/(localhost|file\:)/i) !== null){
                        //localhost
                         console.warn('Location API is not accessible on %s for non-secure domains as per Google Guidelines. However, you are on local please make sure that this API is used on secure domain.',browserName);
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
             if(userCallbackSuccess && userCallbackSuccess.constructor === Function){
                 var posObj = {
                     latitude: position.coords.latitude,
                     longitude: position.coords.longitude,
                     altitude: position.coords.altitude,
                     accuracy: position.coords.accuracy
                 };
                 userCallbackSuccess(posObj);
             }
             else{
                 throw 'Argument 1 should be of type function provided ' + (typeof userCallbackSuccess);
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
             checkBrowserSupport();
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