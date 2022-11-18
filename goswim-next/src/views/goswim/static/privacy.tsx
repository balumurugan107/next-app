import React from 'react';
import PRIVACY from '../static/parts/_privacy.md';
import MarkDownComponent from './MarkDownComponent';

const CreateAccount = () => {
  let markDown = PRIVACY.toString();
  return <MarkDownComponent title="PRIVACY NOTICE" markDown={markDown} />;
};

export default CreateAccount;
