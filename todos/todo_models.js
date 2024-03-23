import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    // Make relational with some other model
    createdBy: {
      // Which means here i am definig some kinds of refernce
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // Make relational with some other model
    // Array of Sub-Todo
    // Here we can also define sub-todos as mini-model in this todos_model.js ,
    // here in todos schema we consider this sub-todos as seperate schema
    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTodo',
      },
    ],
  },
  { timestamps: true }
);

export const Todo = mongoose.model('Todo', todoSchema);
