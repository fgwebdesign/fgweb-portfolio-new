export interface Client {
  id: string;
  name: string;
  logo: string;
  website?: string;
  category?: string;
}

export const clientsData: Client[] = [
  {
    id: 'estudio-casa-brava',
    name: 'Estudio Casa Brava',
    logo: '/clients/estudiocasbrava.png',
    website: 'https://estudiocasabrava.com',
    category: 'Interior Design'
  },
  // Agrega más clientes aquí siguiendo el mismo formato
  // {
  //   id: 'cliente-ejemplo',
  //   name: 'Nombre del Cliente',
  //   logo: '/clients/logo-cliente.png',
  //   website: 'https://ejemplo.com',
  //   category: 'Categoría'
  // },
];
