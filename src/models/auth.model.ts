import { firestore } from './../configs/firebase';

const Users = firestore.collection('users');
const Customers = firestore.collection('customers');

export { Users, Customers };