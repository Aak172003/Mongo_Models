import mongoose from 'mongoose';

// mini-models ( for OrderItems)
const orderItemSchema = new mongoose.Schema({

  // Here i am refer some other database schema , which means this product details get from Product model
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  }
});

const orderScehma = new mongoose.Schema(
  {
    OrderPrice: {
      type: Number,
      required: true,
    },
    Customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    // OrderItems: {
    //   type: [orderItemSchema],
    // },

    // Or 

    OrderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
      }
    ],
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'PENDING',
      // Enumeration
      enum: ['PENDING', 'CANCELLED', 'DELIVERED'],
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderScehma);
