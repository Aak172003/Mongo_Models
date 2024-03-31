// Talk About Indexes

// Indexes are specialized data structures that optimize data retrieval speed in MongoDB.

// Indexes store a fraction of data in a more searchable format.

// They enable MongoDB to locate data faster during queries.

// Indexes are separate from collections and multiple indexes can exist per collection.

// -------------------------------------------------------------------------------

// This explain commands is used to check details of this query like how much time to get executed , is this a COLSPAN , and INSCAN
db.products.find({ price: { $gt: 100 } }).explain()

// This return executionStats
db.products.find({ price: { $gt: 100 } }).explain('executionStats')

// How Create Index
// ----------------

db.products.createIndex({ price: 1 })

// By default when i create document so _id is became index 
db.products.getIndexes()
[
    { v: 2, key: { _id: 1 }, name: '_id_' },
    { v: 2, key: { price: 1 }, name: 'price_1' }
]

// This is How Drop The Index 

db.collection.dropIndex({ field: 1 });
db.collection.dropIndex("index_name");
