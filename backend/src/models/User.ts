import mongoose from 'mongoose';
import bcrypt from 'bcryptjs' ;

export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

//defines the str of documents
const UserSchema = new mongoose.Schema({
    email: {type : String , required : true , unique : true},
    password: {type : String , required : true},
    firstName: {type : String , required : true},
    lastName: {type : String , required : true},
});

//pre- middleware that runs before a document is saved
UserSchema.pre('save' , async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 8) 
    }
    next();
})

//mongoose.model is used to create a model named 'User' based on the schema. This model can be used to perform CRUD (Create, Read, Update, Delete) operations on the 'users' collection in the MongoDB database.
// arguments - model name (required) , schema - optional
const User = mongoose.model<UserType>('User' , UserSchema)

export default User;