var express = require('express');
var router = express.Router();
var parseSrc = require('parse/node').Parse;
var Parse = require('kaiseki');
var _ = require('underscore');

var API_ID = 'o50N3BBiGHYWCTFcBLHUf5AxOvKJvkD4iZ573Ur3';
var REST_API_KEY = 'TTC6eBbgU8acIFGBCuDUq57cq7rmIriPmGY5zTr1';

var CLASS = 'tasks'; //Parse Class (table name)
var CLASS_T = 'tasks_t'; //Parse Class (table name)

var idField = 'objectId'; //Parse Key field name
var idFieldTask = 'taskId'; //Parse Key field name

var parse = new Parse(API_ID, REST_API_KEY);

router.route('/tasks')
  //read all
  .get(function (req, res) {
    parse.getObjects(CLASS, function (err, resp, body, success) {
      if (err) {
        return res.send(err);
      }
      res.json(body);
    });
  })
  //create
  .post(function (req, res) {
    parse.createObject(CLASS, req.body,
      function (err, resp, body, success) {
        if (err)
          return res.send(err);
        res.json(body);
      });
  });
router.route('/tasks/:id')
  //read
  .get(function (req, res) {
    parse.getObject(CLASS, req.params.id,
      function (err, resp, body, success) {
        if (err) {
          return res.send(err);
        }
        res.json(body);
      });
  })
  //update
  .put(function (req, res) {
    parse.updateObject(CLASS, req.params.id, req.body,
      function (err, resp, body, success) {
        if (err) {
          return res.send(err);
        }
        var obj = {};
        obj[idField] = req.params.id;
        _.extend(body, obj);
        res.json(body);
      });
  })
  //delete
  .delete(function (req, res) {
    parse.deleteObject(CLASS, req.params.id,
      function (err, resp, body, success) {
        if (err) {
          return res.send(err);
        }
        res.json(body);
      });
  });
router.route('/tasks/:id/texts')
  //read all texts of given TaskID
  .get(function (req, res) {
    var params = {where: {taskId: req.params.id}};
    parse.getObjects(CLASS_T, params, function (err, resp, body, success) {
      if (err) {
        return res.send(err);
      }
      res.json(body);
    });
  })//create texts of task
  .post(function (req, res) {
    _.extend(req.body, {}[idFieldTask] = req.params.id);
    parse.createObject(CLASS_T, req.body,
      function (err, resp, body, success) {
        if (err)
          return res.send(err);
        res.json(body);
      });
  });
module.exports = router;