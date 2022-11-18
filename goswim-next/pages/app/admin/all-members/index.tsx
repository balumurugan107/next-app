import type { NextPage } from 'next';
import { getTokenFromCookie } from 'src/_constant';
import { wrapper } from 'src/store';
import { ACCESS_TOKEN_SUCCESS } from 'src/store/account';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const AllMembersView = dynamic(() => import('src/views/goswim/admin/AllMembers'), {ssr: false });

const AllMembers: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Admin | Users</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AllMembersView />
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

export default AllMembers;