
// Normal Command
db.products.find({ name: "Sleek Wooden Tuna" })

// Aggregation
db.products.aggregate([
    {
        $match: { name: "Sleek Wooden Tuna" }
    }
])

// Perform Chaining Operation
db.products.aggregate([
    {
        $match: { name: "Sleek Wooden Tuna" }
    },
    {
        $match: { price: 101 }
    }
])

// ---------------------------------------------------------------------------------------------------------------------------------------

// $group -> The $group stage groups the documents by specified fields and perform aggregate opertaion on group data
// This give only single result like reducer javascript function

db.products.find({ price: { $gt: 1200 } })


db.products.aggregate([
    // Find all document whose price > 1200
    {
        $match: {
            price: { $gt: 1200 }
        }
    },
    // make a group of those document whose company id was same and add its price 
    {
        $group: {
            _id: "$company",
            totalProducts: { $sum: "$price" }
        }
    }
])