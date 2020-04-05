import { Schema, Model, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import IUser from '../interfaces/user.interface';


// Validation callbacks
const uniqueEmail = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ email });
  return !user;
};

const validEmail = (email: string): boolean => {
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

const uniqueUsername = async (username: string): Promise<boolean> => {
  const user = await User.findOne({ username });
  return !user;
};

// Setter
const encryptPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const passwordDigest = bcrypt.hashSync(password, salt);
  return passwordDigest;
}

// Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: '{PATH} is required',
    unique: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: '{PATH} is required is required',
    minlength: [8, '{PATH} required a minimum of 8 characters'],
    set: encryptPassword
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
});

// Model
const User: Model<IUser> = model<IUser>('User', userSchema);

// Model methods
User.schema.method('isValidPassword', async function(thisUser: IUser, password: string): Promise<boolean>{
  try{
    return await bcrypt.compare(password, thisUser.password);
  } catch(err){
    throw new Error(err);
  }
});

// Model Validations
// User.schema.path('email').validate(uniqueEmail, 'This {PATH} address is already registered');
// User.schema.path('email').validate(validEmail, 'The {PATH} field most be type of email.');
User.schema.path('username').validate(uniqueUsername, 'This {PATH} is already registered');



export default User;
