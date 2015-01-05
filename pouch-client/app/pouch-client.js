(function() {
    console.log("go");

    var log = function(topic) { return function(x) { console.log(topic, arguments); }; };


    var PouchCtrls = {
        pouchCtrl : function($scope, TodoDB) {

            var logger = log("PouchCtrl");

            logger("init");

            var data  = {
                todoDB: TodoDB
            };

            var addTodo = function(todoText) {
                TodoDB.addTodo(todoText).then(function(m) {
                   logger("added");
                });
            };

            var deleteTodo = function(todo) {
                logger("Delete requested ", todo);
                TodoDB.deleteTodo(todo);
            }

            $scope.data = data;
            $scope.addTodo = addTodo;
            $scope.deleteTodo = deleteTodo;
        }
    };

    angular.module("PouchApp", [])
        .service("TodoDB" , function($q, $rootScope) {

            var todos = [];

            var todoMap = {};

            var logger = log("TodoDB");

            var db = new PouchDB('todos');

            var handleUpdate = function(doc) {
                log("handle-update")(doc);
            };

            var handleInsert = function(doc) {
                todos.push(doc);
            };

            var handleDeletion = function(change) {
                log("handle-deletion")(change);
            };

            var handleUpsert = function(change) {
                var docExists = todoMap[change.id];
                var callback = docExists ? handleUpdate : handleInsert;
                db.get(change.id).then(callback);
            };

            var handleChange = function(change) {
                if (change.deleted) {
                    handleDeletion(change);
                } else {
                    handleUpsert(change);
                }
                notify();
            };

            var notifyNow  = function() { $rootScope.$apply(); };

            var notify = _.debounce(notifyNow, 100);

            logger("starting change listener");

            db.changes({
                //since: "now",
                live: true
            }).on('change', handleChange);


            logger("starting sync task");

            db.sync("http://localhost:5984/todos", { live: true });
            //    .on('change', log("sync-change"))
            //    .on('complete', log("sync-complete"))
            //    .on("uptodate", log("sync-uptodate"))
            //    .on('error', log('sync-error'));

            return {
                todos : todos,
                addTodo: function(text) {
                    var todo = {
                        _id: new Date().toISOString(),
                        title: text,
                        completed: false
                    };
                    return db.put(todo);
                },
                deleteTodo: function(todo) {
                    return db.remove(todo);
                }
           };
        })
        .controller("PouchCtrl", PouchCtrls.pouchCtrl);





})();

