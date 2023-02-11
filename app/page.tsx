'use client';
import { Inter } from '@next/font/google';
// import styles from './page.module.css';
import { Container, Typography } from '@mui/material';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Container>
      <Link href={'/about'}>Hola Maincas!</Link>
    </Container>
  );
}
