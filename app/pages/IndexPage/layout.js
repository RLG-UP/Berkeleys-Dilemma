// app/layout.js (Server Component)
import { Bebas_Neue, Poppins, Source_Sans_3 } from 'next/font/google';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/css.module.css";

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'], // Add other weights if needed
  variable: '--font-bebas-neue',
});

 const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400'], // Add other weights if needed
  variable: '--font-source-sans-3',
});

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${poppins.variable} ${sourceSans3.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
