import type { NextPage } from 'next';
import Head from 'next/head';
import { apiGetCourseFilterData, apiGetCourses } from 'pages/api/courses';
import { getTokenFromCookie } from 'src/_constant';
import { wrapper } from 'src/store';
import { ACCESS_TOKEN_SUCCESS } from 'src/store/account';
import { CourseListReq } from 'src/store/management/courses';
import CoursePage from 'src/views/goswim/courses/MainView/index';

const Courses: NextPage<{ props: any }> = ({ props }) => {
  
  
  return (
    <div >
      <Head>
        <title>Courses | GoSwim</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <CoursePage />
      </main>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (context) => {
      const query = context.query
      const { stroke, expertise, search } = query;

      const courseReq: CourseListReq = {
        isAdmin: false,
        pageID: 1,
        limit: 12,
        stroke: stroke,
        expertise: expertise,
        search: search ? search : null,
        adminFilter: null
      }
       await apiGetCourseFilterData(store.dispatch, 'Course')
      await apiGetCourses(store.dispatch, courseReq)
      return {
        props: {}, // will be passed to the page component as props
      }
    }
);


export default Courses