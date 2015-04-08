angular.module("MyApp", ["ngNewRouter"])
    .controller("AppController", AppController);


var AppController = function($router) {
    console.log("c")
    console.log($router);
}