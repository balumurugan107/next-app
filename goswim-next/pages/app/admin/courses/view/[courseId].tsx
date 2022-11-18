import type { NextPage } from 'next';
import CreateViewCourses from 'pages/app/admin/courses/create/index';
import { getTokenFromCookie } from 'src/_constant';
import { wrapper } from 'src/store';
import { ACCESS_TOKEN_SUCCESS } from 'src/store/account';
import Head from 'next/head';


const Edit: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Admin | Courses</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <h1>Edit</h1> */}
        <CreateViewCourses />
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

export default Edit;
