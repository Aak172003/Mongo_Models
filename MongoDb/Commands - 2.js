// Projection -> cann't  exclude and include single field simultaneously at a time 

db.collection_name.find()
// or
db.collection_name.find({})

// Both give all fields which is present in documents
// but if i want to send only some fields , so prefer projecion

db.products.find({}, { name: 1, price: 1, colors: 1, image: 1, category: 1 })
// those field i want, just put 1 and rest is 0, means not show in our document

db.comments.find({ comments: { $size: 4 } }, { comments: 1 })
// Note:
// either we go for 1 1 1 or 0 0 0 not consider  1 0 1 0 1 0 1
[
    {
        _id: 1,
        title: 'Introduction to MongoDB',
        content: 'MongoDB is a popular NoSQL database...',
        author: 'John Doe',
        comments: [
            { user: 'Alice', text: 'Great article!' },
            { user: 'Bob', text: 'Thanks for sharing.' },
            { user: 'Eva', text: 'Its beatifull!' },
            { user: 'jessy' }
        ],
        metadata: { views: 1000, likes: 50 }
    }
]

db.comments.find({ comments: { $size: 4 } }, { comments: 1, content: 1 })
[
    {
        _id: 1,
        content: 'MongoDB is a popular NoSQL database...',
        comments: [
            { user: 'Alice', text: 'Great article!' },
            { user: 'Bob', text: 'Thanks for sharing.' },
            { user: 'Eva', text: 'Its beatifull!' },
            { user: 'jessy' }
        ]
    }
]

// -------------------------------------------------------------------------------

// Embedded Documents  -> Query documents inside embedded documents using dot notation.
// db.collection.find({ “parent.child.grandson”: value })


db.comments.find({ 'comments.user': 'Lily' })

// Find the documents where the views in metadata fields > 700 
db.comments.find({ 'metadata.views': { $gt: 700 } }).count()

// We Need to find out the documents where the user in comments  ,
// is Henry and also in the metadata views should be greater than > 50
db.comments.find({
    $and: [
        { 'comments.user': { $eq: 'Henry' } },
        { 'metadata.views': { $gt: 50 } }
    ]
}).count()

// or

db.comments.find(
    {
        'comments.user': 'Henry',
        'metadata.likes': { $gt: 50 }
    }
)

// We Need to find out the documents where the user in comments  ,
// is Alice and Vinod

// $all -> We need $all where order , where the order does/t matter 

db.comments.find({ 'comments.user': { $all: ['Alice', 'Vinod'] } })

[
    {
        _id: 7,
        title: 'Introduction to MongoDB',
        content: 'MongoDB is a popular NoSQL database...',
        author: 'Vinod Thapa',
        comments: [
            { user: 'Alice', text: 'Awesome article!' },
            { user: 'Vinod', text: 'Thanks for sharing.' }
        ],
        metadata: { views: 1000, likes: 70 }
    }
]


// $elematch 

// Q - we need to find user is Vinod and text is Thanks for sharing 
// For this we need to traver in both user as well as text

db.comments.find({ 'comments': { $elemMatch: { 'user': 'Vinod', 'text': 'Thanks for sharing.' } } })
[
    {
        _id: 7,
        title: 'Introduction to MongoDB',
        content: 'MongoDB is a popular NoSQL database...',
        author: 'Vinod Thapa',
        comments: [
            { user: 'Alice', text: 'Awesome article!' },
            { user: 'Vinod', text: 'Thanks for sharing.' }
        ],
        metadata: { views: 1000, likes: 70 }
    }
]

// -------------------------------------------------------------------------------

// Update Operations in MongoDB

// 1. updateOne() and updateMany()
// -------------------------------

// Update teh price value = 45 in a products collections, where id = ObjectId('64c2363be32f4a51b19b9275')

// Find that document which i have to update
db.products.find({ '_id': ObjectId('64c2363be32f4a51b19b9275') })

// Update that document
db.products.updateOne({ '_id': ObjectId('64c2363be32f4a51b19b9275') }, {
    $set: {
        'price': 200
    }
})

// Update the isFeature value = true in a products collections, where name = Designer Handbag

// Find that document which i have to update
db.products.find({ 'name': { $eq: 'Designer Handbag' } })

// or

db.products.find({ 'name': 'Designer Handbag' })

// Update that document

db.products.updateOne({ 'name': { $eq: 'Designer Handbag' } },
    {
        $set: {
            'isFeatured': false
        }
    }
)

// -------------------------------------------------------------------------------

// Update all the feature value = true in a products collections , where the price = 120

// Find All documents of price 120
db.products.find({ 'price': 120 })

// Update
db.products.updateMany({ 'price': { $eq: 120 } }, {
    $set: {
        'isFeatured': false
    }
})

// -------------------------------------------------------------------------------

// 2. Removing and renaming fields
// -------------------------------

// syntax - For Removing the field
db.collection_name.updateOne({ filter }, { $unset: { fieldName: 1 } })

// Ex -

db.products.updateMany({ price: 123 }, { $unset: { category: 1, modified: 1 } })
// or 

db.products.updateMany({ price: 123 }, { $unset: { name: "", colors: "" } })

// Syntx - For Rename the fields
// db.collection_name.updateOne({ filter }, { $rename: { 'oldfileName': 'newFileName' } })

// Ex - 
db.products.updateMany({ price: { $eq: 123 } }, { $rename: { 'isFeatured': 'modified' } })

// To see the changes 
db.products.find({ price: { $eq: 123 } })


// -------------------------------------------------------------------------------

// 3. Adding a new Field
// ---------------------

// Ex - 
db.products.updateOne({ price: 123 }, { $set: { Aakash: 'My Name is Aakash' } })

// -------------------------------------------------------------------------------

// 4 Delete Operation In MongoDB
// -----------------------------

// db.collection_name.deleteOne({ filter })

// db.collection_name.deleteMany({ filter })

























