import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { wrapper } from 'src/store';

const VideoView = dynamic(() => import('src/views/goswim/admin/Videos'), {ssr: false });

const Videos: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Admin | Videos</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <VideoView />
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
export default Videos;
