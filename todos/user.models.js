import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // username:"String":,
    // email:"String",
    // password:"String"
    // isActive:Boolean

    // i can define schema like above as well , but if i define schema like this ,
    // so i can use mongoose super power , means define schema in detailing
    
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password must be greater than 6 character'],
    },
    isActive: Boolean,
  },
  { timestamps: true }
);

// Note : In Mongo DataBase , this User stored as lower case with pluralar words 
// Like User -> users (This is Automaticaaly created )

export const User = mongoose.model('User', userSchema);
