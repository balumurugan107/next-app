import type { NextPage,  } from 'next';
import Head from 'next/head';
import { getTokenFromCookie } from 'src/_constant';
import { useSelector } from 'react-redux';
import { wrapper } from 'src/store';
import { ACCESS_TOKEN_SUCCESS } from 'src/store/account';

const DashBoard: NextPage = () => {
  const lessonData = useSelector(state => {
    return state.dashboardNew.recentlyAddedData;
  });

  
  return (
    <div >
      <Head>
        <title>Dashboard | GoSwim</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
       
       <h1>dsjkhf</h1>
      </main>
    </div>
  )
}

export  const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
      async (context) => {
        const token = await getTokenFromCookie(context.req)
        await store.dispatch({
          type: ACCESS_TOKEN_SUCCESS,
          payload: {token}
        });
    
    return {
      props: {}, // will be passed to the page component as props
    } 
  }
  );
export default DashBoard



