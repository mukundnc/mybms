# Prerequisites before running the application

To run the application make sure you have local mongodb installed and create database name angular2.
If you want to use your custom database set the connection string in configuration file, config.js
```
module.exports.dbConnectionString = "localhost/angular2" 
```
here the connection string is set to localhost and db name is angular2
The collection which will be created in the database is "items"
We need to create index on geolocation attribute in the document for efficient GIS queries, for that we need to run the below query on mongodb
```
db.items.ensureIndex( { "geolocation" : "2dsphere" } );
```
Now we are set to run the application.

## To run the application run the below commands sequentially
```
npm install

npm start
```
Click [here](https://localhost:3001) to see the application running
## To run unit tests run the below command
```
npm test
```
Click [here](https://ec2-52-38-69-12.us-west-2.compute.amazonaws.com) to see the demo application
