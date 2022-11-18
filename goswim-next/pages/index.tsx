import type { NextPage } from 'next'
import Head from 'next/head'
import { useSelector } from 'react-redux';
import HomeView from 'src/views/pages/HomeView';
import { store, wrapper } from 'src/store';

const Home: NextPage = () => {


  return (
    <div >
      <Head>
        <title>GoSwim</title>
         <meta name='description' content="Videos to inspire, educate and make you a better swimmer." />
        <meta property="fb:app_id" content="533543026731451" />
        <meta property="og:site_name" content="GoSwim" />
        <meta property="og:title" content="GoSwim" />
        <meta property="og:description" content="Videos to inspire, educate and make you a better swimmer." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://dnzytfrulzzkg.cloudfront.net/public/promo.png" />
        <meta property="og:image:secure_url" content="https://dnzytfrulzzkg.cloudfront.net/public/promo.png" />
        <meta property="og:url" content="https://www.goswim.tv/" />
        <meta name="author" content="GoSwim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
      <HomeView />  
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

export default Home
