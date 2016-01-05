/**
 * Created by hareesh on 04/01/16.
 */
//http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
var app = angular.module('tasksApp', [
  'ngSanitize', 'ngAnimate', 'ui.router',
  'tasksApp.services', 'tasksApp.controllers']);

app.run(
  ['$rootScope', '$state', '$stateParams', 'Languages', '$loading',
    function ($rootScope, $state, $stateParams, Tasks) {

      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      $rootScope.tasks = [];
      $rootScope.tasks = Tasks.query();

      $rootScope.getTaskById = function (id) {
        return _.find($rootScope.tasks, function (obj) {
          if (obj.objectId === id)
            return obj;
        });
      };

    }
  ]
);
app.config(function ($stateProvider, $urlRouterProvider) {
  var loaderDefaults = {
    timeout: 5000,
    //delayHide: 1150,
    theme: 'info',
    showBar: false
  };

  $urlRouterProvider.otherwise("/");
  $stateProvider.state('home', { // state for showing all entries
    url: '/',
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
  })
    //Tasks
    .state('tasks', {
      abstract: true,
      url: '/tasks',
      templateUrl: 'partials/list_content_template.html',
      controller: 'TasksCtrl'
    }).state('tasks.list', {
      url: '',
      views: {
        "list": {templateUrl: "partials/tasks/list.html"},
        "content": {templateUrl: "partials/tasks/empty.html"}
      },
    }).state('tasks.new', {
      url: '/new',
      views: {
        "list": {templateUrl: "partials/tasks/list.html"},
        "content": {
          templateUrl: "partials/tasks/new.html",
          controller: ['$scope', '$stateParams',
            function ($scope, $stateParams) {
              $scope.initTask();
            }]
        }
      }
    }).state('tasks.detail', {
      url: '/{id}',
      views: {
        "list": {templateUrl: "partials/tasks/list.html"},
        "content": {
          templateUrl: "partials/tasks/detail.html",
          controller: ['$scope', '$stateParams',
            function ($scope, $stateParams) {
              $scope.loadTask($stateParams.id);
            }]
        }
      }
    }).state('tasks.edit', {
      url: '/:id/edit',
      views: {
        "list": {templateUrl: "partials/tasks/list.html"},
        "content": {
          templateUrl: "partials/tasks/edit.html",
          controller: ['$scope', '$stateParams',
            function ($scope, $stateParams) {
              $scope.loadTask($stateParams.id);
            }]
        }
      }
    })
})
  .run(function ($state) {
    $state.go('tasks.list'); //make a transition to tasks state when app starts
  });