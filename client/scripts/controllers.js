/**
 * Created by hareesh on 04/01/16.
 */
angular.module('tasksApp.controllers', []);

angular.module('tasksApp.controllers')
  .controller('HomeCtrl', function ($scope, $window) {
    $scope.$root.appTitle = "Tasks - Manage your Work & Time";

    $scope.$root.sideMenu = [
      {'title': 'Dashboard', 'iconFaCls': 'dashboard', 'sref': 'dashboard'},
      {'title': 'Tasks', 'iconFaCls': 'compass', 'sref': 'tasks.list'},
    ];
    $scope.$root.sideMenuSelected = $scope.$root.sideMenu[0];

    $scope.stateMatches = function (state) {
      var currState = $scope.$root.$state.current.name.split('.')[0];
      var stateStart = state.split('.')[0];

      return (currState === stateStart);
    };

    $scope.$root.currTask = {};

  });