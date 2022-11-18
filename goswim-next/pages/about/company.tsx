import type { NextPage } from 'next';
import Head from 'next/head';
import { wrapper } from 'src/store';
import CompanyView from 'src/views/goswim/static/company';

const Company: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Company | GoSwim</title>
        <meta name='description' content="To create content that helps people of all ages and backgrounds to swim better and reach their full potential in the sport." />
        <meta property="fb:app_id" content="533543026731451" />
        <meta property="og:site_name" content="GoSwim" />
        <meta property="og:title" content="GoSwim Company" />
        <meta property="og:description" content="To create content that helps people of all ages and backgrounds to swim better and reach their full potential in the sport." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://dnzytfrulzzkg.cloudfront.net/public/promo.png" />
        <meta property="og:image:secure_url" content="https://dnzytfrulzzkg.cloudfront.net/public/promo.png" />
        <meta property="og:url" content="https://www.goswim.tv/" />
      </Head>

      <main >
        <>
      <CompanyView />
      </>
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
export default Company
