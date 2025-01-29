import { firestore } from './../configs/firebase';
import {firestore} from '../config/firebase';
import {ICustomer, IUser} from '../interfaces/auth.interface';

const userSchema = {
  id: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'partner']
  },
  fullName: String,
  phoneNumber: String,
  vatNumber: String,
  companyName: String,
  businessAddress: String,
  businessEmail: String,
  businessPhone: String,
  website: {
    type: String,
    optional: true
  },
  commissionRate: Number,
  fixedFee: Number,
  isActive: Boolean,
  createdAt: String,
  updatedAt: String
};



const Users = firestore.collection('users');
const Customers = firestore.collection('customers');