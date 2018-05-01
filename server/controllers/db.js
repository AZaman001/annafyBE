const oracledb = require('oracledb');
// output format: JSON
oracledb.outFormat = oracledb.OBJECT;

var connAttrs = {
	user : "AUSER",
	password : "annafy",
	// test on local host and get everything working first
	connectString: "129.213.48.211:1521/PDB1.sub02051425090.mcsvcn.oraclevcn.com"
	//connectString: "Health.sub02051425090.mcsvcn.oraclevcn.com:1521/PDB1.sub02051425090.mcsvcn.oraclevcn.com"
}

module.exports = {

	// landing page
	index: function(req, res){
     	res.send('Hello, welcome to Annafy Web Service!')
   	},

   	// get a list of all the items
	getItems: function(req, res){
		oracledb.getConnection(connAttrs, function(err, connection){
			if (err) {
				console.error("error in making the original connection!!", err);
				throw err;
			}


			var sql = "SELECT i.NAME AS ITEM_NAME, i.PRICE AS ITEM_PRICE, c.NAME AS CATEGORY_NAME, t.NAME AS TYPE_NAME " + 
			"FROM ITEMS i " +
			"JOIN CATEGORY c ON i.CATEGORYID = c.ID " +
			"JOIN TYPE t ON i.TYPEID = t.ID ";

			connection.execute(sql, function(err, result){
				if(err){
					res.contentType('application/json').status('200');
					res.end("SQL statement might not be right. Or db? Or connection? Figure this part out, the rest should be a breeze.")
					console.log(err);
				}else {
					res.contentType('application/json').status('200');
					res.send(JSON.stringify(result.rows));
				}
				doRelease(connection);
			});
		});
	},

	// get entries in Order_Info table
	getOrderInfos: function(req, res){
		oracledb.getConnection(connAttrs, function(err, connection){
			if (err) {
				console.error("error in making the original connection!!", err);
				throw err;
			}
			// "SELECT ID,NAME,PRICE FROM ITEMS WHERE CATEGORYID = 1"
			connection.execute("SELECT * FROM ORDER_INFO", function(err, result){
				if(err){
					res.contentType('application/json').status('200');
					console.error("ran into the following error", err);
					res.end("SQL statement might not be inserted here correctly.")
				}else {
					res.contentType('application/json').status('200');
					res.send(JSON.stringify(result.rows));
				}
				doRelease(connection);
			});
		});
	},

	// get entries in Order_Item table:
	getOrderItems: function(req, res){
		oracledb.getConnection(connAttrs, function(err, connection){
			if (err) {
				console.error("error in making the original connection!!", err);
				throw err;
			}
			// "SELECT ID,NAME,PRICE FROM ITEMS WHERE CATEGORYID = 1"
			connection.execute("SELECT * FROM ORDER_ITEM", function(err, result){
				if(err){
					res.contentType('application/json').status('200');
					console.error("ran into the following error", err);
					res.end("SQL statement might not be inserted here correctly.")
				}else {
					res.contentType('application/json').status('200');
					res.send(JSON.stringify(result.rows));
				}
				doRelease(connection);
			});
		});
	},

	// get a list of all the perosnal items:
	getPersonalItems: function(req, res){
		oracledb.getConnection(connAttrs, function(err, connection){
			if (err) {
				console.error("error in making the original connection!!", err);
				throw err;
			}

			var sql = "SELECT i.NAME AS ITEM_NAME, i.PRICE AS ITEM_PRICE, c.NAME AS CATEGORY_NAME, t.NAME AS TYPE_NAME " + 
			"FROM ITEMS i " +
			"JOIN CATEGORY c ON i.CATEGORYID = c.ID " +
			"JOIN TYPE t ON i.TYPEID = t.ID WHERE CATEGORYID  = 1";

			// "SELECT ID,NAME,PRICE FROM ITEMS WHERE CATEGORYID = 1"
			connection.execute(sql, function(err, result){
				if(err){
					res.contentType('application/json').status('200');
					console.error("ran into the following error", err);
					res.end("SQL statement might not be inserted here correctly.")
				}else {
					res.contentType('application/json').status('200');
					res.send(JSON.stringify(result.rows));
				}
				doRelease(connection);
			});
		});
	},

	// get a list of all the work related items:
	getWorkItems: function(req, res){
		oracledb.getConnection(connAttrs, function(err, connection){
			if (err) {
				console.error("error in making the original connection!!", err);
				throw err;
			}

			var sql = "SELECT i.NAME AS ITEM_NAME, i.PRICE AS ITEM_PRICE, c.NAME AS CATEGORY_NAME, t.NAME AS TYPE_NAME " + 
			"FROM ITEMS i " +
			"JOIN CATEGORY c ON i.CATEGORYID = c.ID " +
			"JOIN TYPE t ON i.TYPEID = t.ID WHERE CATEGORYID  = 2";

			// "SELECT ID,NAME,PRICE FROM ITEMS WHERE CATEGORYID = 2"
			connection.execute(sql, function(err, result){
				if(err){
					res.contentType('application/json').status('200');
					console.error("ran into the following error", err);
					res.end("SQL statement might not be inserted here correctly.")
				}else {
					res.contentType('application/json').status('200');
					res.send(JSON.stringify(result.rows));
				}
				doRelease(connection);
			});
		});
	},

	// get exclusively Anna- things:
	getExclusiveItems: function(req, res){
		oracledb.getConnection(connAttrs, function(err, connection){
			if (err) {
				console.error("error in making the original connection!!", err);
				throw err;
			}

			var sql = "SELECT i.NAME AS ITEM_NAME, i.PRICE AS ITEM_PRICE, c.NAME AS CATEGORY_NAME, t.NAME AS TYPE_NAME " + 
			"FROM ITEMS i " +
			"JOIN CATEGORY c ON i.CATEGORYID = c.ID " +
			"JOIN TYPE t ON i.TYPEID = t.ID WHERE TYPEID  = 1";

			// "SELECT ID,NAME,PRICE FROM ITEMS WHERE TYPEID = 1"

			connection.execute(sql, function(err, result){
				if(err){
					res.contentType('application/json').status('200');
					console.error("ran into the following error", err);
					res.end("SQL statement might not be inserted here correctly.")
				}else {
					res.contentType('application/json').status('200');
					res.send(JSON.stringify(result.rows));
				}
				doRelease(connection);
			});
		});
	},

	// get discounted items:
	getDiscountedItems: function(req, res){
		oracledb.getConnection(connAttrs, function(err, connection){
			if (err) {
				console.error("error in making the original connection!!", err);
				throw err;
			}

			var sql = "SELECT i.NAME AS ITEM_NAME, i.PRICE AS ITEM_PRICE, c.NAME AS CATEGORY_NAME, t.NAME AS TYPE_NAME " + 
			"FROM ITEMS i " +
			"JOIN CATEGORY c ON i.CATEGORYID = c.ID " +
			"JOIN TYPE t ON i.TYPEID = t.ID WHERE TYPEID  = 2";

			// "SELECT ID,NAME,PRICE FROM ITEMS WHERE TYPEID = 2"

			connection.execute(sql, function(err, result){
				if(err){
					res.contentType('application/json').status('200');
					console.error("ran into the following error", err);
					res.end("SQL statement might not be inserted here correctly.")
				}else {
					res.contentType('application/json').status('200');
					res.send(JSON.stringify(result.rows));
				}
				doRelease(connection);
			});
		});
	},

	// add pagination, get only certain sets of the items at any one time:
	getSet: function(req, res){

		var offset = req.params.pageNum * 4;
	     var myMaxRows = 5; 

	     var bindVariables = {
	     	offset: offset,
	     	maxRows: myMaxRows
	     }
	      
	     oracledb.getConnection(connAttrs, function(err, connection){
	         if (err) {
	            console.error("error in connection", err);
	            throw err;
	     }

	     var sql = "SELECT i.NAME AS ITEM_NAME, i.PRICE AS ITEM_PRICE, c.NAME AS CATEGORY_NAME, t.NAME AS TYPE_NAME " + 
			"FROM ITEMS i " +
			"JOIN CATEGORY c ON i.CATEGORYID = c.ID " +
			"JOIN TYPE t ON i.TYPEID = t.ID " +
			"OFFSET :offset ROWS FETCH NEXT :maxRows ROWS ONLY ";

	     //var sql = "SELECT NAME,PRICE FROM ITEMS OFFSET :offset ROWS FETCH NEXT :maxRows ROWS ONLY";

	     connection.execute(sql, bindVariables, function(err, result){
	            if (err) {
	               res.contentType('application/json').status('200');
	               res.end("Something wrong with SQL statement? \n"+err)
	               console.log(err);
	            } else{
	               res.contentType('application/json').status('200');
	               res.send(JSON.stringify(result.rows));
	            }
	            doRelease(connection);
	         });

	      });  
	 },

	
	 // search item by name, category, or type
	searchItem: function(req, res){

		var searchString = req.query.searchString;
		var typeId = req.query.typeId;
		var catId = req.query.catId;

		// w/ oracledb, cannot bind all variables at once if some may be null
	     var bindVariables = {	}
	      
	     oracledb.getConnection(connAttrs, function(err, connection){
	         if (err) {
	            console.error("error in connection", err);
	            throw err;
	     }

	     var whereStatement="";
	     
	     if(searchString != null || typeId != null || catId != null){

	     	whereStatement += "WHERE";
	     	if(searchString != null)
	     	{
	     		whereStatement += " INSTR(UPPER(i.NAME),UPPER(:searchString))>0";
	     		bindVariables.searchString = searchString;
	     	}
	     	if(typeId != null)
	     	{
	     		if(whereStatement.length != 5)
	     			whereStatement += " AND ";
	     		whereStatement +=" TYPEID = :typeID";
	     		bindVariables.typeID = typeId;
	     	}
	     	if(catId != null)
	     	{
	     		if(whereStatement.length != 5)
	     			whereStatement += " AND ";
	     		whereStatement +=" CATEGORYID = :catID ";
	     		bindVariables.catID = catId;
	     	}
	     }

	     //console.log(whereStatement);
	      
	      var sql = "SELECT i.NAME AS ITEM_NAME, i.PRICE AS ITEM_PRICE, c.NAME AS CATEGORY_NAME, t.NAME AS TYPE_NAME " + 
			"FROM ITEMS i " +
			"JOIN CATEGORY c ON i.CATEGORYID = c.ID " +
			"JOIN TYPE t ON i.TYPEID = t.ID " + whereStatement;

	    //var sql = "SELECT NAME, PRICE FROM ITEMS WHERE INSTR(UPPER(NAME), UPPER(:searchString))>0";
	    //var sql = "SELECT NAME,PRICE FROM ITEMS WHERE CATEGORYID = :catID OR TYPEID = :typeID OR INSTR(UPPER(NAME),UPPER(:searchString))>0";
	    //console.log(sql);
	     connection.execute(sql, bindVariables, function(err, result){
	            if (err) {
	               res.contentType('application/json').status('200');
	               res.end("Something wrong with SQL statement? \n"+err)
	               console.log(err);
	            } else{
	               res.contentType('application/json').status('200');
	               res.send(JSON.stringify(result.rows));
	            }
	            doRelease(connection);
	         });

	      });  
	 },

	// add an order, this is for checkout
	addOrder: function(req,res){
		oracledb.getConnection(connAttrs, function(err,connection){

			// get request body from http request
			var requestBody = req.body;

			// bind variables:
			var bindVariables = {
				tax: {dir: oracledb.BIND_IN, val: requestBody.Tax, type: oracledb.NUMBER},
				item_id: {dir: oracledb.BIND_IN, val: requestBody.ItemID, type: oracledb.NUMBER}
			};
			
			if(err){
				console.error("error in connection", err);
				throw err;
			}

			// sql statement: 

		    var sql = 
		    	  "DECLARE OrderInfoIdInserted NUMBER;" +
			  "BEGIN" +
			  "	INSERT INTO ORDER_INFO (ORDER_DATETIME, TAX) VALUES (CURRENT_TIMESTAMP, :tax)  RETURNING ID INTO OrderInfoIdInserted; " +
			  "	INSERT INTO ORDER_ITEM (ORDERINFO_ID, ITEM_ID) VALUES (OrderInfoIdInserted, :item_id);  " +
			  "END; " ;
			// execute SQL statement
			connection.execute(sql, bindVariables,  { autoCommit: true }, function(err,result){
				if(err){
					res.contentType('application/json').status('200');
					console.error("ran into BULK INSERT ERROR the following error", err);
					res.end("SQL statement might not have used the bind variables correctly.")
				}else {
					res.contentType('application/json').status('200');
					res.send(JSON.stringify(result));
				}
				doRelease(connection);
			});

		});
	},
	
		// add to order info table as a simple POST/INSERT test
	addOrderInfo: function(req,res){
		oracledb.getConnection(connAttrs, function(err,connection){

			// get request body from http request
			var requestBody = req.body;

			// bind variables:
			var bindVariables = {
				tax: {dir: oracledb.BIND_IN, val: requestBody.Tax, type: oracledb.NUMBER},
			};
			
			if(err){
				console.error("error in connection", err);
				throw err;
			}

			// sql statement: 
			var sql = "INSERT INTO ORDER_INFO (ORDER_DATETIME, TAX) VALUES (CURRENT_TIMESTAMP, :tax)";
			// execute SQL statement, make sure to COMMIT the changes
			connection.execute(sql, bindVariables, { autoCommit: true }, function(err,result){
				if(err){
					res.contentType('application/json').status('200');
					console.error("ran into INSERT ERROR the following error", err);
					res.end("SQL statement might not have used the bind variables correctly.")
				}else {
					res.contentType('application/json').status('200');
					res.send(JSON.stringify(result));
				}
				doRelease(connection);
			});

		});
	}
}

//closes out connection
function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}