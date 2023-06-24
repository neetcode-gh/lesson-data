# MongoDB Cheatsheet (Crashcourse)

## Setup

### Install MongoDB Community Edition
https://www.mongodb.com/docs/manual/installation/

### Register for MongoDB Atlas
https://www.mongodb.com/cloud/atlas/register

## MongoDB Shell

### Connect to MongoDB Shell
```javascript
mongosh // connects to mongodb://127.0.0.1:27017 by default
mongo "mongodb+srv://cluster-name.abcde.mongodb.net/<dbname>" --username <username> // MongoDB Atlas
```

### Basic Commands
```javascript
show dbs // show databases
use <dbname> // use or create database 
show collections // show collections
```

### Collections

```javascript
db.createCollection("coll") // creates the collection `coll`
db.coll.drop()    // removes the collection `coll`
```

Create a collection with a `$jsonschema` validator
```javascript
// Create collection with a $jsonschema
db.createCollection("hosts", {
    validator: {$jsonSchema: {
        bsonType: "object",
        required: ["email"], // required fields
        properties: {
            // All possible fields
            phone: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            email: {
                bsonType: "string",
                pattern: "@mongodb\.com$",
                description: "must be a string and match the regular expression pattern"
            },
        }
    }}
})
```

### CRUD

#### Create
```javascript
db.coll.insertOne({name: "Navi", age: 25}) // insert one document
db.coll.insertMany([{name: "Navi", age: 25}, {name: "Alice", age: 30}]) // insert many documents
```

#### Read
```javascript
db.coll.count() // count all documents in 'coll' collection
db.coll.count({name: "Navi"}) // count all documents with name "Navi"

db.coll.find() // list all documents
db.coll.find({name: "Navi"}) // list all documents with name "Navi"
db.coll.find({name: "Navi", age: 25}).limit(1) // list all documents with name "Navi" and age 25, and return only one document.

db.coll.find({name: "Navi"}).explain("executionStats") // find document and show execution stats
```

#### Update
```javascript
db.coll.update({name: "Navi"}, {$set: {age: 26}}) // update all documents with name "Navi" and set age to 26
db.coll.update({name: "Navi"}, {$inc: {age: 1}}) // update all documents with name "Navi" and increment age by 1

db.coll.update({name: "Navi"}, {$unset: {age: 1}}) // update all documents with name "Navi" and set age to null
db.coll.updateMany({age: {$exists: true}}, {$unset: {age: ""}}) // remove age field from all documents with age field

```

#### Delete
```javascript
db.coll.deleteMany({name: "Navi"}) // remove all documents with name "Navi"
db.coll.deleteOne({name: "Navi"}) // remove one document with name "Navi"
```


### Indexes

```javascript
db.coll.getIndexes()   // list indexes
db.coll.getIndexKeys() // list index keys

db.coll.createIndex({"name": 1}) // create index
db.coll.createIndex({"name": 1, "date": 1})     // create a compound index

db.coll.dropIndex("name_1") // drop index
```

### Aggregation

#### Aggregation Pipeline

```javascript
db.listingsAndReviews.aggregate([
    {
        $match: {
            number_of_reviews: { $gte: 100 } // Listings with more than 100 reviews
        } 
    },
    {
        $group : {
            _id : "$property_type",        // Group by property type
            count: { $sum : 1 },           // Total listings
            reviewCount: { $sum : "$number_of_reviews" },        // Total reviews
            avgPrice: { $avg : "$price" }, // Average price
        },
    },
    {
        $project: {
            _id: 1,
            count: 1,
            reviewCount: 1,
            avgPrice: { $ceil : "$avgPrice" } // Round up avgPrice
        }
    },
    {
        $match: {
            reviewCount: { $gte: 10000 } // Listings by property with more than 10000 total reviews
        } 
    },
    {
        $sort : { 
            count : -1, // Sort by count descending
            avgPrice: 1 // Sort by avgPrice ascending
        }
    }
])
```

#### $lookup (Join)

```javascript
db.accounts.aggregate([
   {
      $lookup:
        {
          from: "transactions",         // join with 'transactions' collection
          localField: "account_id",     // field from the 'accounts' collection
          foreignField: "account_id",   // field from the 'transactions' collection
          as: "customer_orders"         // output array field
        }
   },
   {
      $match: { $expr: { $lt: [ {$size: "$customer_orders"}, 5 ] } } // filter for documents where 'customer_orders' is < 5
   },
])
```

## References
- https://www.mongodb.com/developer/products/mongodb/cheat-sheet/