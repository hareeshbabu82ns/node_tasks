/**
 * Created by hareesh on 04/01/16.
 */
var services = angular.module('tasksApp.services', ['ngResource']);

services.factory('Tasks', function ($resource) {
  return $resource('/api/tasks/:id', {id: '@objectId'}, {
    query: {method: 'GET', isArray: true},
    show: {method: 'GET'},
    create: {method: 'POST'},
    update: {method: 'PUT'}
  })
}).factory('Tasks', function ($resource) {
  var res = $resource('/api/tasks/:id', {id: '@objectId'}, {
    query: {method: 'GET', isArray: true},
    show: {method: 'GET'},
    create: {method: 'POST'},
    update: {method: 'PUT'}
  });
  res.prototype.save = function (done) {
    if (angular.isObject(this.languageId))
      this.languageId = this.languageId.objectId;
    if (angular.isDefined(this.objectId))
      return this.$update(done);
    else
      return this.$save(done);
  };
  return res;
})
  //.factory('TasksT', function ($resource) {
  //  var res = $resource('/api/tasks_t/:id', {id: '@objectId'}, {
  //    query: {method: 'GET', isArray: true},
  //    show: {method: 'GET'},
  //    create: {method: 'POST'},
  //    update: {method: 'PUT'}
  //  });
  //  res.prototype.save = function (done) {
  //    if (angular.isObject(this.languageId))
  //      this.languageId = this.languageId.objectId;
  //    if (angular.isDefined(this.objectId))
  //      return this.$update(done);
  //    else
  //      return this.$save(done);
  //  };
  //  return res;
  //})
;