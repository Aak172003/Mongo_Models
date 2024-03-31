// show dbs -> used to show databases
// use database_name -> swich to database
// db.dropDatabase_Name();

// Note -> If that db is not exist then it craete why i execute use db_name query
// If i move to any database via using use db_name command , 
// then db represnts to that that particular database

// ---------------------------------------------------------------------------------------------------------

// show collections -> -> this is used to see the collections exist in that db
// db.createCollection('<collection-name>’); -> -> This is used to create collection by manually

// db.<collection-name>.drop(); -> this is used to drop collection

// ------------------------------------------------------------------------------------------------------------

// Insert Command
// --------------
db.collection_name.insertOne({})
db.collection_name.insertMany([{}, {}, {}, {}])

// ------------------------------------------------------------------------------------------------------------

// Order Insert -> When executing bulk write operations, "ordered" and "unordered" determine the batch behavior.
// ------------

//  Ordered Inserts
//  Default behavior is ordered means order true , where MongoDB stops on the first error.
//  db.<collection-name>.insertMany([ doc1, doc2, ... ])
db.selfCreatedCollection.insertMany([
    { 'name': 'Aakash', 'age': 27 },
    { 'name': 'Ajay', 'age': 28 },
    { 'name': 'Ajay', 'age': 28 },
    { 'name': 'Ajay', 'age': 28 },
    { '_id': ObjectId("65f67faf21160fbcc4a69cd3"), 'name': 'Ajay', 'age': 28 },
    { 'name': 'Ajay', 'age': 28 },
    { 'name': 'Ajay', 'age': 28 },
    { 'name': 'Ajay', 'age': 28 },
    { 'name': 'Ajay', 'age': 28 }
])


// Unordered Inserts
// When executing bulk write operations with unordered flag, MongoDB continues processing after encountering an error.
// db.<collection_name>.insertMany([doc1, doc2, ... ], { ordered: false });

db.selfCreatedCollection.insertMany([
    { 'name': 'Aakash', 'age': 27 },
    { 'name': 'Ajay', 'age': 28 },
    { 'name': 'Ajay', 'age': 28 },
    { 'name': 'Ajay', 'age': 28 },
    { '_id': ObjectId("65f67faf21160fbcc4a69cd3"), 'name': 'Ajay', 'age': 28 },
    { 'name': 'Ajay', 'age': 28 },
    { 'name': 'Ajay', 'age': 28 },
    { 'name': 'Ajay', 'age': 28 },
    { 'name': 'Ajay', 'age': 28 }
], { ordered: false })

// ------------------------------------------------------------------------------------------------------------

// Inserting Documents in MongoDB
// ----------------------------

// find() -> find all documents

// without condition
db.collection_name.find()

// with condition
db.collection_name.find({ key: value })
db.collection_name.find({ 'name': 'Ajay' })

// findOne() -> find only one

db.collection_name.findOne({ key: value })
db.collection_name.findOne({ 'name': 'Ajay' })

// --------------------------------------------------------------------------------------

// Comparison Operators
// --------------------

// 1. equal to -> $eq
db.products.find({ 'price': { $eq: 129 } })

// 2. not equal to -> $ne
db.products.find({ 'price': { $ne: 129 } }).count()

// 3. greater than -> $gt
db.products.find({ 'price': { $gt: 1200 } })

// 4. Greater than equal to -> $gte
db.products.find({ 'price': { $gte: 1299 } })

// 5. less than -> $lt
db.products.find({ 'price': { $lt: 1200 } })

// 6. less than equal to -> $lte
db.products.find({ 'price': { $lte: 1299 } })

// 7. in operator -> return those elements who has price equal to which is mention in array 
// { 'price': { $in: [1299, 299, 799, 149] } }

db.products.find({ 'price': { $in: [1299, 299, 799, 149] } }).count()

// 8. not in Operator
db.products.find({ 'price': { $nin: [1299, 299, 799, 149] } }).count()

// --------------------------------------------------------------------------------------

// Logical Operators
// ------------------
// 1. And -> $and

// syntx -
// { $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }

// ex-
db.products.find({ $and: [{ 'price': { $gt: 100 } }, { 'name': 'Diamond Ring' }] }).count()

// 2. Or -> $or

// syntx -
// { $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }

// ex
db.products.find({ $or: [{ 'price': { $gt: 100 } }, { 'name': 'Diamond Ring' }] }).count()

// 3. Not -> $not

// syntx -
// { field: { $not: { <operator-expression> } } }

// ex - price = 100
db.products.find({ 'price': { $eq: 100 } }).count()

// price != 100
db.products.find({ 'price': { $not: { $eq: 100 } } }).count()


// 4. Nor -> $nor

// syntax -
// { $nor: [ { <expression1> }, { <expression2> }, ...  { <expressionN> } ] }

// ex -
db.products.find({ $or: [{ 'price': { $gt: 100 } }, { 'name': 'Diamond Ring' }] }).count()

// --------------------------------------------------------------------------------------

// Cursors in MongoD
// ------------------

// 1. count

// 2. limit


// 3. skip

db.products.find({ 'price': { $in: [1299, 299, 799, 149] } }).limit(10).skip(1)
// Here documents ka limit fixed , if i skip 5 data then this will ignore top 5 documents 
// and add next 5 down data

// 4. sort -> this is not work with in and notin operator

// Descending or Decreasing Order
db.products.find({ 'price': { $gt: 1250 } }).limit(10).sort({ 'price': 1 })

// Ascending or Increasing Order
db.products.find({ 'price': { $gt: 1250 } }).limit(10).sort({ 'price': -1 })

// --------------------------------------------------------------------------------------

// Complex Expressions
// ------------------

// The $expr operator allows using aggregation expressions within a query.

// Useful when you need to compare fields from the same document in a more complex manner.

// Syntax
{ $expr: { operator: [field, value] } }

// Example
db.products.find({ $expr: { $eq: ['$price', 899] } })

// -------------------------------------------------------------------------------

[
    { "_id": 2, "quantity": 5, "price": 25, "targetPrice": 100 },
    { "_id": 1, "quantity": 10, "price": 15, "targetPrice": 120 },
    { "_id": 3, "quantity": 6, "price": 35, "targetPrice": 100 },
    { "_id": 4, "quantity": 5, "price": 55, "targetPrice": 150 },
    { "_id": 5, "quantity": 5, "price": 55, "targetPrice": 150 }
]

// multiply between _id and price , if multiply data is greater than totalPrice then return that document
db.sales.find({ $expr: { $gt: [{ $multiply: ['$_id', '$price'] }, '$targetPrice'] } })
[
    { _id: 3, quantity: 6, price: 35, targetPrice: 100 },
    { _id: 4, quantity: 5, price: 55, targetPrice: 150 },
    { _id: 5, quantity: 5, price: 55, targetPrice: 150 }
]


db.sales.find({ $expr: { $lt: [{ $multiply: ['$_id', '$price'] }, '$targetPrice'] } })

[
    { _id: 2, quantity: 5, price: 25, targetPrice: 100 },
    { _id: 1, quantity: 10, price: 15, targetPrice: 120 }
]

// -------------------------------------------------------------------------------


// Elements Operator

// 1. exist -> matches documents that have a specific field, regardless of its value.

// get price exist documents
db.products.find({ price: { $exists: true } }).count()

// check and get price not exist document 
db.products.find({ price: { $exists: false } }).count()


// 2. type
// ex - check price data type is number or not 
db.products.find({ price: { $type: 'number' } }).count()

// 3. size

// i get only 4 size of documents of fields , here talk about embedded documents
// ex -
db.comments.find({ comments: { $size: 4 } }).count()

// -------------------------------------------------------------------------------

// How Import Files
// ----------------

// This used when we have objects
// mongoimport "Absolute_Path\jsonfile.json" - d database_name - c collection_name

// This used when we have array of Objects
// mongoimport "C:\Users\Aakash Prajapati\OneDrive\Desktop\MongoDb\sales.json" - d mongoshop - c sales--jsonArray

