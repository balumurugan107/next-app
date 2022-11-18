import React from 'react';
import TOS from '../static/parts/_tos.md';
import MarkDownComponent from './MarkDownComponent';

const CreateAccount = () => {
  let markDown = TOS.toString();
  return <MarkDownComponent title="TERMS OF SERVICE" markDown={markDown} />;
};

export default CreateAccount;
