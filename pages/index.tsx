
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/header/header';
import MainContent from '../components/main-content/main-content';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Produce8 - Mortgage Calculator</title>
      </Head>
      <Header />
      <MainContent />
    </>
  )
}

export default Home
