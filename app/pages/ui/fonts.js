import { Bebas_Neue, Poppins, Source_Sans_3 } from 'next/font/google';

// Define font instances
export const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'], // Add other weights if needed
  variable: '--font-bebas-neue',
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400'], // Add other weights if needed
  variable: '--font-source-sans-3',
});