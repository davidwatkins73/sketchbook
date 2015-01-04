(function() {
    console.log("go");

    var PouchCtrls = {
        pouchCtrl : function($scope, TodoDB) {
            console.log("PouchCtrl init");

            var data  = {
                todoDB: TodoDB
            };

            //TodoDB.getAll().then(function(todos) {
            //    console.log("todos", todos);
            //    data.todos = todos.rows;
            //    $scope.$digest();
            //});

            var addTodo = function(todoText) {
                TodoDB.addTodo(todoText).then(function(m) {
                    console.log("OK", m);
                });
            };

            $scope.data = data;
            $scope.addTodo = addTodo;

            $scope.$watchCollection("data.todoDB.todos.length", function() {
                console.log("watchCollectionA", arguments);
            });

        }
    };

    angular.module("PouchApp", [])
        .service("TodoDB" , function($q, $rootScope) {

            var todos = [];

            var todoMap = {};

            var log = function(topic) { return function(x) { console.log(topic, x); }; };

            var db = new PouchDB('todos');

            var handleUpdate = function(doc) {
                log("handle-update")(doc);
            };

            var handleInsert = function(doc) {
                //log("handle-insert")(doc);
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


            db.changes({
                //since: "now",
                live: true
            }).on('change', handleChange);

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
                }
           };
        })
        .controller("PouchCtrl", PouchCtrls.pouchCtrl);





})();

