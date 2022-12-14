import type { NextPage } from 'next';
import { wrapper } from 'src/store';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const StatisticsView = dynamic(() => import('src/views/goswim/admin/Statistics'), {ssr: false });

const Statistics: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Admin | Statistics</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <StatisticsView />
      </main>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (context) => {
  
      return {
        props: {}, // will be passed to the page component as props
      }
    }
);

export default Statistics;
