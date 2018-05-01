const db = require('../controllers/db.js');

module.exports = function(app){
   app.get('/', function(req,res){
      db.index(req,res);
   });
   app.get('/getItems', function(req,res){
   	db.getItems(req,res);
   });
   app.get('/getItems', function(req,res){
      db.getItems(req,res);
   });
   app.get('/getOrderInfos', function(req,res){
      db.getOrderInfos(req,res);
   });
   app.get('/getPersonalItems', function(req,res){
   	db.getPersonalItems(req,res);
   });
   app.get('/getWorkItems', function(req,res){
   	db.getWorkItems(req,res);
   });
   app.get('/getExclusiveItems', function(req,res){
   	db.getExclusiveItems(req,res);
   });
   app.get('/getDiscountedItems', function(req,res){
   	db.getDiscountedItems(req,res);
   });
   app.get('/getSet/:pageNum', function(req,res){
   db.getSet(req,res);
   });
   app.get('/searchItem', function(req,res){
   db.searchItem(req,res);
   });
   app.post('/addOrder', function(req,res){
   	db.addOrder(req,res);
   });
   app.post('/addOrderInfo', function(req,res){
   db.addOrderInfo(req,res);
   });
}