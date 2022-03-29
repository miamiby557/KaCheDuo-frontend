import React from 'react';
import './Block.less';

const Block = ({ type, children }) => {
  return <span className={`block ${type}`}>{children}</span>;
};

export default Block;
