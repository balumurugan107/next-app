import type { NextPage } from 'next';
import Head from 'next/head';
import { getTokenFromCookie } from 'src/_constant';
import { wrapper } from 'src/store';
import { ACCESS_TOKEN_SUCCESS } from 'src/store/account';
import LessonDetailsView from 'src/views/goswim/lessons/details';
import { apiGetLessonDetails, apiGetRelatedLessons, apiRemoveLessonDetail } from '../api/lessonDetail';

const LessonDetails: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Lesson-Detail</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <LessonDetailsView />
      </main>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (context) => {
      const token = await getTokenFromCookie(context.req);
      await store.dispatch({
        type: ACCESS_TOKEN_SUCCESS,
        payload: { token }
      });
      const { lessonId } = context.query
      if (lessonId && typeof lessonId === 'string') {
        await apiRemoveLessonDetail(store.dispatch)
        await apiGetLessonDetails(store.dispatch, lessonId)
        await apiGetRelatedLessons(store.dispatch, lessonId, 1, 15)
      }
      return {
        props: {},
      }
    }
);

export default LessonDetails;
