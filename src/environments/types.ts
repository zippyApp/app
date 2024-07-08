

 export type UserDocumentType = {
    id: number;
  };
  
 export type UserDocument = {
    number: string;
    type: UserDocumentType;
    frontImage: string;
    backImage: string;
  };
  
  export type Reference = {
    firstNames: string;
    lastNames: string;
    phone: string;
    email: string;
    document: UserDocument;
  };
  
  export type Person = {
    firstNames: string;
    lastNames: string;
    occupation: string;
    email: string;
    document: UserDocument;
    phone: string;
    birthDate: string;
    reference: Reference;
  };