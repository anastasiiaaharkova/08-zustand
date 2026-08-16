import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header"
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});



export const metadata: Metadata = {
  title: "NoteHub",
  description: "Easy-to-access home for your thoughts and tasks",
  openGraph: {
    title: 'NoteHub',
    description: 'Easy-to-access home for your thoughts and tasks',
    url: 'https://notehub.com/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub logo',
      },
    ],
  }
};

//: atctually important for me

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
        <Header />
          <main>
            {children} 
            {modal}
        </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
