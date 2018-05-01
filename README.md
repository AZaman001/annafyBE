# annafyBE

## To run the web service locally:
1. npm install
2. node server.js
3. Browse to localhost:8000

## When deploying to Heroku:
1. Remove oracledb folder from node_modules since ACCS does npm install as well
2. Ensure Node & npm are all the way up to date
3. Follow instructions here to install buildpacks: https://github.com/pupostd/heroku-buildpack-nodejs-oracledb
4. Add a Procfile (not .txt or anything) that specifies your server/index.js
5. Once you've created the Heroku App and deployed, ensure at least one instance of the app running: 
	    heroku ps:scale web=1
6. After deploy, put oracledb back in node_modules to run locally

## Sample API Calls Available:
###	GET: /getItems
	Gets all available items.
###	GET: /getOrderInfos
	Gets all entries in Order Info table
###	GET: /searchItem
	Allows search item by name {searchString}, category {catId}, or type {typeId}. 
####	Example: /searchItem?searchString="iPhone"
	Searches anything with the work iPhone in it.

	Sample response: 
	[
		{
			"ITEM_NAME": "iPhone Charger",
			"ITEM_PRICE": 6.99,
			"CATEGORY_NAME": "Work Related",
			"TYPE_NAME": "Discounted"
		}
	]

	Example: /searchItem?catId=1 // for all "personal" items
	Example: /searchItem?typeId=2 // for all "discounted" items
	Example: /searchItem?catId=2&typeId=1 //for all "work related and exclusive" items
###	POST: /addOrder
	Add an order, keeping this in place for "check out" part 
	Example request body:
	{
		"Tax": 4.95,
		"ItemID" : 9
	}