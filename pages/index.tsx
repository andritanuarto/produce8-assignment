
import type { NextPage } from 'next';
import { useEffect } from 'react'; 
import Head from 'next/head';
import Header from '../components/header/header';
import MainContent from '../components/main-content/main-content';

const Home: NextPage = () => {
  // const submitPost = async () => {
  //   const response = await fetch('/api/mortgageCalculation?principal=250000&annualInterestRate=1&termOfLoan=30', {
  //     method: 'POST',
  //      headers: {
  //        'Content-Type': 'application/json'
  //      }
  //   });

  //   const data = await response.json();
  //   console.log(data);
  // }

  // useEffect(() => {
  //   submitPost();
  // }, [])

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
