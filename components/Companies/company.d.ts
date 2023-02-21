export interface Company {
  id: number;
  alias: string;
  name: string;
  taxId: string;
  legalName: string;
  addressLineOne: string;
  addressLineTwo: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  roles: string;
  block: boolean;
}
