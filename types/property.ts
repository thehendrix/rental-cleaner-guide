export interface Space {
  name?: string;
  imagePath?: string;
}

export interface Address {
  street?: string;
  unitNumber?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface Property {
  id?: string;
  name?: string;
  address?: Address;
  spaces?: Space[];
  contacts?: {
    owner?: {
      name?: string;
      number?: number;
    },
    handyman?: {
      name?: string;
      phone?: number;
    },
    maid?: {
      name?: string;
      phone?: number;
    },
    tenant?: {
      name?: string;
      phone?: number;
    }
  },
  notes?: string;
}
