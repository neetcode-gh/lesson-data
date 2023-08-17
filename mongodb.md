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

### Indexes

```javascript
db.coll.getIndexes()   // list indexes
db.coll.getIndexKeys() // list index keys

db.coll.createIndex({"name": 1}) // create index
db.coll.createIndex({"name": 1, "date": 1})     // create a compound index

db.coll.dropIndex("name_1") // drop index
```

### Complex Operators

#### **Query and Projection Operators**

- **`$eq`**: Matches values that are equal to a specified value.
- **`$gt`**: Matches values that are greater than a specified value.
- **`$gte`**: Matches values that are greater than or equal to a specified value.
- **`$lt`**: Matches values that are less than a specified value.
- **`$lte`**: Matches values that are less than or equal to a specified value.
- **`$ne`**: Matches all values that are not equal to a specified value.
- **`$in`**: Matches any value in the specified array.
- **`$nin`**: Matches none of the values specified in an array.

#### **Logical Operators**

- **`$or`**: Joins query clauses with a logical OR, returns all documents that match the conditions of either clause.
- **`$and`**: Joins query clauses with a logical AND, returns all documents that match the conditions of both clauses.
- **`$not`**: Inverts the effect of a query expression and returns documents that do not match the query expression.
- **`$nor`**: Joins query clauses with a logical NOR, returns all documents that fail to match both clauses.

#### **Array Operators**

- **`$all`**: Matches arrays that contain all elements specified in the query.
- **`$elemMatch`**: Selects documents if element in the array field matches all the specified $elemMatch conditions.
- **`$size`**: Selects documents if the array field is a specified size.

#### **Update Operators**

- **`$set`**: Sets the value of a field in a document.
- **`$unset`**: Removes the specified field from a document.
- **`$inc`**: Increments the value of the field by the specified amount.
- **`$mul`**: Multiplies the value of the field by the specified amount.
- **`$push`**: Appends a specified value to an array.
- **`$pop`**: Removes the first or last element of an array.
- **`$pull`**: Removes all array elements that match a specified query.

#### **Aggregation Operators**

- **`$match`**: Filters the documents to pass only documents that match the specified condition(s) to the next pipeline stage.
- **`$group`**: Groups input documents by a specified identifier expression and applies the accumulator expression(s), if specified, to each group.
- **`$project`**: Passes along the documents with only the specified fields to the next stage in the pipeline.
- **`$sort`**: Sorts all input documents and outputs them to the next stage in the specified sort order.
- **`$limit`**: Passes the first n documents unmodified to the pipeline where n is the specified limit.

### ACID Compliance

| ACID Property | MongoDB Implementation |
| --- | --- |
| Atomicity | MongoDB ensures atomicity at the single-document level, meaning changes to a single document are always atomic. Starting with version 4.0, MongoDB provides multi-document transactions and guarantees the atomicity of the transactions. |
| Consistency |	MongoDB uses schema validation, a feature that allows you to define the specific structure of documents in each MongoDB collection. If the document structure deviates from the defined schema, MongoDB will return an error. This is how MongoDB enforces its version of consistency, however, it's optional and less rigid than in traditional SQL databases. |
| Isolation | MongoDB isolates write operations on a per-document level. By default, clients do not wait for acknowledgement of write operations. However, users can configure write concern to guarantee a desired level of isolation. Multi-document transactions in MongoDB are isolated across participating nodes for the duration of each transaction. |
| Durability | MongoDB allows you to specify the level of durability when writing documents. You can choose to wait until the data is written to a certain number of servers, or even to the disk. This is configurable by setting the write concern when writing data. |

## References
- https://www.mongodb.com/developer/products/mongodb/cheat-sheet/
