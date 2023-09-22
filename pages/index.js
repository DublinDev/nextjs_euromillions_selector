import Head from 'next/head';
import Layout from '../components/layout';
import HomePage from './homepage';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Euromillions Number Selector</title>
      </Head>
      <HomePage />
    </Layout>
  );
}
