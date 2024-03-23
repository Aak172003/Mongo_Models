import mongoose from 'mongoose';

const categoryScehma = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Singular by our side
// But in db "store as plular and lowercase"
export const Category = mongoose.model('Category', categoryScehma);
