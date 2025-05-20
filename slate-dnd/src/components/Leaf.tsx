import React from 'react';

import { LinkItem } from './elements/LinkItem';

const Leaf = (props) => {
  if (props.leaf.type === 'linkItem') {
    return <LinkItem {...props} />;
  }

  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};

export const renderLeaf = (props) => {
  return <Leaf {...props} />;
};
