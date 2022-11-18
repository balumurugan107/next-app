import type { NextPage } from 'next';
import Head from 'next/head';
import { wrapper } from 'src/store';
import TermsOfServiceView from 'src/views/goswim/static/tos';

const TermsOfService: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Terms Of Service | GoSwim</title>
         <meta name='description' content="This Privacy Policy applies to Go Swim Offerings, which are provided to you via our website" />
        <meta property="fb:app_id" content="533543026731451" />
        <meta property="og:site_name" content="GoSwim" />
        <meta property="og:title" content="GoSwim Terms of service" />
        <meta property="og:description" content="This Privacy Policy applies to Go Swim Offerings, which are provided to you via our website" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://dnzytfrulzzkg.cloudfront.net/public/promo.png" />
        <meta property="og:image:secure_url" content="https://dnzytfrulzzkg.cloudfront.net/public/promo.png" />
        <meta property="og:url" content="https://www.goswim.tv/" />
      </Head>

      <main >
      <TermsOfServiceView />
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
export default TermsOfService
