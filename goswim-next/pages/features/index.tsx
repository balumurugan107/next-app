import type { NextPage } from 'next';
import Head from 'next/head';
import { wrapper } from 'src/store';
import FeaturesView from 'src/views/Features';

const FeaturesPage: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Features</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturesView />
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

export default FeaturesPage;
