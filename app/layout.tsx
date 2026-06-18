import type { Metadata } from 'next';
import {
  Oswald,
  Playfair_Display,
  Dancing_Script,
  Anton,
  Teko,
  Bebas_Neue,
  Great_Vibes,
  Raleway,
} from 'next/font/google';
import './globals.css';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});
const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dancing',
  display: 'swap',
});
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
  display: 'swap',
});
const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anton',
  display: 'swap',
});
const teko = Teko({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-teko',
  display: 'swap',
});
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
});
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Golf Scorecard Graphic Builder',
  description: 'Build professional golf scorecard graphics for social media',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={[
          oswald.variable,
          playfair.variable,
          dancing.variable,
          greatVibes.variable,
          anton.variable,
          teko.variable,
          bebas.variable,
          raleway.variable,
          'bg-gray-950 text-white antialiased',
        ].join(' ')}
      >
        {children}
      </body>
    </html>
  );
}
