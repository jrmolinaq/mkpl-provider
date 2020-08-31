import { DataPaginator } from './paginator.interface';
export interface Provider {
  id: number;
  name: string;
  city: string;
  address: string;
  active: boolean;
}

export interface ProviderGeneralData {
  name: string;
  nit: string;
  country: string;
  city: string;
  address: string;
}

export interface ProviderContactData {
  name: string;
  phone: string;
  email: string;
  adminEmail: string;
}

export interface ProviderDetails extends Provider {
  nit: string;
  phone: string;
  email: string;
  contactName: string;
  location: {
    id: number;
    address: string;
    city: {
      id: number;
      name: string;
      state: string;
      iso_code: string;
      region: {
        id: number;
        name: string;
        country: {
          id: number;
          name: string;
        };
      };
    };
  };
  adminUser: {
    id: number;
    email: string;
    subsidiaryExternalId: number;
    providerExternalId: number;
  };
}

export interface ListProviderResponse extends DataPaginator {
  content: Provider[];
}

export interface ProviderPaginator extends DataPaginator {
  content: Provider[];
}

export interface ListResponse extends DataPaginator {
  content: Provider[];
}

export interface Paginator extends DataPaginator{
  data: Provider[];
}
