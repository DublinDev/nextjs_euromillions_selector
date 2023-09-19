import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import HomePage from './homepage';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Euromillions Number Selector</title>
      </Head>
      <HomePage />

      {/* <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section> */}
    </Layout>
  );
}
