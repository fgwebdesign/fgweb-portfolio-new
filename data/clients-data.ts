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
    category: 'Interior Design',
  },
  {
    id: 'casa-brava',
    name: 'Casa Brava',
    logo: '/clients/casabravaproduct.png',
    website: 'https://casabrava.com.uy/',
    category: 'E-commerce · Furniture',
  },
  {
    id: 'schweizer-psychology',
    name: 'Schweizer Psychology',
    logo: '/clients/scheizclient.png',
    website: 'https://www.schweizerpsychology.com/en',
    category: 'Psychology · Healthcare',
  },
  {
    id: 'suen',
    name: 'SUEN',
    logo: '/clients/suenclient.png',
    website: 'https://suen.uy/',
    category: 'Science · Healthcare',
  },
  {
    id: 'castelier',
    name: 'Castelier Bienes Raíces',
    logo: '/clients/castelierclient.png',
    website: 'https://castelier.com.uy/',
    category: 'Real Estate',
  },
  {
    id: 'luzuy',
    name: 'Luz Uy Importaciones',
    logo: '/clients/luzuyclient.png',
    website: 'https://luzuyimportaciones.com/',
    category: 'E-commerce · Retail',
  },
  {
    id: 'byk',
    name: 'B&K Arquitectos',
    logo: '/clients/bykclient.png',
    website: 'https://bykarquitectos.com/',
    category: 'Architecture · Construction',
  },
  {
    id: 'jeydi',
    name: 'JEYDI Studio',
    logo: '/clients/jeydiclient.png',
    website: 'https://jeydi.com.uy/',
    category: 'Audiovisual · Creative',
  },
  {
    id: 'drones-orientales',
    name: 'Drones Orientales',
    logo: '/clients/dronesclient.png',
    website: 'https://www.dronesorientales.com/',
    category: 'Agriculture · AgTech',
  },
  {
    id: 'rs-investments',
    name: 'RS Investments',
    logo: '/clients/rsclient.png',
    website: 'https://rsinvestmentsuy.com/es',
    category: 'Real Estate',
  },
];
