import React from 'react';
import FAQ from '../static/parts/_faq.md';
import MarkDownComponent from './MarkDownComponent';

const Faq = () => {
  let markDown = FAQ.toString();
  return <MarkDownComponent title="FREQUENTLY ASKED QUESTIONS" markDown={markDown} />;
};

export default Faq;
