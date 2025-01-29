interface ICustomer {
  id?: string;
  uid: string;
  fullName: string;
  phoneNumber?: string;
  email: string;
  subscription?: {
    id: string;
    type: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
  };
  invoiceData?: {
    vatNumber: string;
    companyName: string;
    businessAddress: string;
    businessEmail: string;
    businessPhone: string;
    sdi: string;
  };
  addresses?: Array<{
    id: string;
    label: string;
    address: string;
    doorName: string;
    city: string;
    postalCode: string;
    geoLocation: {
      latitude: number;
      longitude: number;
    };
    default: boolean;
    notes?: string;
  }>;
  idCassaInCloud?: string;
  idTilby?: string;
  additionalData?: T;
  createdAt?: string;
  updatedAt?: string;
}

interface IUser {
    id?: string;
    fullName: string;
    businessName: string;
    email: string;
    password: string;
    phone: string;
    businessAddress: string;
    vatNumber: string;
    fiscalCode: string;
    sdiCode: string;
    pecAddress: string;
    website?: string;
    feeType?: 'percentage' | 'fixed';
    feeValue?: number;
    role: 'partner' | 'admin';
    createdAt?: string;
    updatedAt?: string;
  }

  export { ICustomer, IUser };