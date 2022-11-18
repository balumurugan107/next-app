import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { wrapper } from 'src/store';
const AccountView = dynamic(import(`src/views/pages/AccountView`), {ssr: false})  

const Profile: NextPage = () => {


  return (
    <div >
      <Head>
        <title>Profile | GoSwim</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
      <AccountView />
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
export default Profile
