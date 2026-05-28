export interface FooterData {
  phone1?: string;
  phone2?: string;
  email1?: string;
  email2?: string;
  address?: string;
}

export interface CollaborationData {
  usaAddress?: string;
  usaPhone?: string;
}

export interface SectionsData {
  footer?: FooterData;
  collaboration?: CollaborationData;
}
