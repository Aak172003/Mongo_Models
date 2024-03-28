
// Definition: Aggregation is the process of performing transformations on documents and combining them to produce computed results.

// Pipeline Stages: Aggregations consist of multiple pipeline stages, each performing a specific operation on the input data.

// Benefits -> chaining method (Like Javascript)

// 1. Aggregating Data: Complex calculations and operations are possible.
// 2. Advanced Transformations: Data can be combined, reshaped, and computed for insights.
// 3. Efficient Processing: Aggregation handles large datasets efficiently


// Aggregation Operations
// ----------------------

// $match -> The $match stafe filters documents based on specified conditions

db.products.aggregate([{ $match: { name: "Sleek Wooden Tuna" } }])

// Apply Chaining 
db.products.aggregate(
    [
        { $match: { name: "Sleek Wooden Tuna" } }, // Match documents with the specified name
        { $match: { price: 101 } } // Match documents with the specified price
    ]
)

// -------------------------------------------------------------------------------

// $group -> The $group stage groups the documents by specified firlds and perform aggregate opertaion on group data
// This give only single result like reducer javascript function

// Ex -

// Find same company in whole documents
db.products.aggregate([{
    $group: {
        _id: '$company',
        totalProducts: { $sum: 1 },
    }
}])

// Find same company in whole documents and sum price of same documents 
db.products.aggregate([{
    $group: {
        _id: '$company',
        totalProducts: { $sum: '$price' },
    }
}])


// If price greater than 900 , then perform addition of price of same company 
db.products.aggregate([
    {
        $match: {
            price: { $gt: 1200 }
        }
    },
    {
        $group: {
            _id: "$company",
            totalProducts: { $sum: "$price" }
        }
    }
])

// Find the quantity = 5 , group then with same quantity and find the sum and average price 

db.sales.aggregate([
    {
        // Find find those document who has quantity = 5
        $match: {
            quantity: 5
        }
    },
    {
        $group: {
            _id: '$quantity',
            // This find Sum of price
            priceSum: { $sum: '$price' },
            // this find Average of price
            priceAvg: { $avg: '$price' }
        }
    }
])

// -------------------------------------------------------------------------------

// $sort ->  sort the fields in Ascending or Descrnding Order

db.products.aggregate([
    {
        $match: {
            price: { $gt: 1200 }
        }
    },
    {
        $group: {
            _id: "$company",
            totalProducts: { $sum: "$price" }
        }
    },
    {
        // Apply sort only on given fields 
        $sort: {
            totalProducts: -1
        }
    }
])

// -------------------------------------------------------------------------------

// $Project
// Project is similar as Projection 

db.products.aggregate([
    {
        $project: {
            // This will show only price filed, but _id is bydefault
            price: 1,
        }
    }
])

// Project with filter 
db.products.aggregate([
    {
        $match: {
            price: { $gt: 1200 }
        }
    },
    {
        $project: {
            // This will show only price filed, but _id is bydefault
            price: 1,
            discountPrice: { $multiply: ['$price', 0.8] }
        }
    }
])


// $unwind - >

db.products.aggregate([
    {
        $unwind: '$colors'
    },
    {
        $match: {
            price: { $gt: 1200 }
        }
    },
    {
        $group: {
            _id: '$price',
            allcolors: { $push: '$colors' }
        }
    }
])

db.products.aggregate([
    {
        $unwind: '$colors'
    },
    {
        $match: {
            price: { $gt: 1200 }
        }
    },
    {
        $group: {
            _id: '$price',
            allcolors: { $addToSet: '$colors' }
        }
    }
])


// Ex - 

db.products.find({ price: { $gt: 1200 } })
[
    {
        _id: ObjectId("64c23601e32f4a51b19b9263"),
        name: 'Laptop Pro',
        company: '64c23350e32f4a51b19b9231',
        price: 1299,
        colors: ['#333333', '#cccccc', '#00ff00'],
        image: '/images/product-laptop.png',
        category: '64c2342de32f4a51b19b924e',
        isFeatured: true
    },

    // Below two documents have same price s
    {
        _id: ObjectId("64c236a2e32f4a51b19b9281"),
        name: 'Diamond Ring',
        company: '64c23350e32f4a51b19b923a',
        price: 1999,
        colors: ['#000000', '#cc6600', '#663300'],
        image: '/images/product-diamond-ring.png',
        category: '64c2342de32f4a51b19b9259',
        isFeatured: false
    },
    {
        _id: ObjectId("64c23707e32f4a51b19b9296"),
        name: 'Diamond Ring',
        company: '64c23350e32f4a51b19b923a',
        price: 1999,
        colors: ['#000000', '#cc6600', '#663300'],
        image: '/images/product-diamond-ring.png',
        category: '64c2342de32f4a51b19b9259',
        isFeatured: false
    }
]

// Here i get similar data 
db.products.aggregate([{ $unwind: '$colors' }, { $match: { price: { $gt: 1200 } } }, { $group: { _id: '$price', allcolors: { $push: '$colors' } } }])
[
    { _id: 1299, allcolors: ['#333333', '#cccccc', '#00ff00'] },
    {
        _id: 1999,
        allcolors: [
            '#000000',
            '#cc6600',
            '#663300',
            '#000000',
            '#cc6600',
            '#663300'
        ]
    }
]

// Here i get only unique colors from both same documets whose price is 1999
db.products.aggregate([{ $unwind: '$colors' }, { $match: { price: { $gt: 1200 } } }, { $group: { _id: '$price', allcolors: { $addToSet: '$colors' } } }])
[
    { _id: 1299, allcolors: ['#cccccc', '#333333', '#00ff00'] },
    { _id: 1999, allcolors: ['#663300', '#cc6600', '#000000'] }
]

// -------------------------------------------------------------------------------











