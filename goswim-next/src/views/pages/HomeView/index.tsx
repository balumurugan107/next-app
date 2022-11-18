import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Page from 'src/components/Page';
import Hero from 'src/views/pages/HomeView/Hero';
import Features from 'src/views/pages/HomeView/Features';
import Testimonials from 'src/views/pages/HomeView/Testimonials';
import CTA from 'src/views/pages/HomeView/CTA';
import FAQS from 'src/views/pages/HomeView/FAQS';
import Footer from 'src/layouts/MainLayout/Footer';

const HomeView = () => {
  let [videos, setVideos] = useState([]);

  useEffect(() => {
    let videoEle: any = document.querySelectorAll('video');
    setVideos(videoEle);
    return () => {
      setVideos([]);
    };
  }, []);

  const onPlay = (id: any) => {
    videos.forEach((video: any, i: number) => i !== id && video.pause());
  };
  
  return (
    <Page title="GoSwim | Videos to Inspire, Educate and Make You a Better Swimmer">
      <Hero />
      <Features onPlay={onPlay} />
      <Testimonials onPlay={onPlay} />
      <CTA onPlay={onPlay} />
      <FAQS />
      <Box mt={5}>
        <Footer />
      </Box>
    </Page>
  );
};

export default HomeView;
