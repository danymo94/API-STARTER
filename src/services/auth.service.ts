import { Users } from '../models/auth.model';
import { IUser } from '../interfaces/auth.interface';

class UserService {
  public getAllPartners = async (): Promise<IUser[]> => {
    const snapshot = await Users.where('role', '==', 'partner').get(); // Correggi l'uso di where
    const partners: IUser[] = [];
    snapshot.forEach(doc => {
      partners.push({ id: doc.id, ...doc.data() } as IUser);
    });
    return partners;
  };

  public newUser = async (body: IUser): Promise<IUser> => {
    const docRef = await Users.add(body);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as IUser;
  };

  public updateUser = async (_id: string, body: IUser): Promise<IUser> => {
    const docRef = Users.doc(_id);
    await docRef.update(body);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as IUser;
  };

  public deletePartner = async (_id: string): Promise<void> => {
    const docRef = Users.doc(_id);
    await docRef.delete();
  };

  public getUserById = async (_id: string): Promise<IUser> => {
    const doc = await Users.doc(_id).get();
    if (!doc.exists) {
      throw new Error('User not found');
    }
    return { id: doc.id, ...doc.data() } as IUser;
  };

  public getUserByEmail = async (email: string): Promise<IUser | null> => {
    console.log(Users)
    const snapshot = await Users.where('email', '==', email).get();
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as IUser;
  };
}

export default UserService;