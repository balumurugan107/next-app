import React from 'react';
import TOU from '../static/parts/_tou.md';
import MarkDownComponent from './MarkDownComponent';

const CreateAccount = () => {
  let markDown = TOU.toString();
  return <MarkDownComponent title="TERMS OF USE" markDown={markDown} />;
};

export default CreateAccount;
