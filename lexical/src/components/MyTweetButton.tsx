import React from 'react';

import { Button } from '@mui/material';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { INSERT_TWEET_COMMAND } from './plugins/TwitterPlugin';

function MyTweetButton() {
  const [editor] = useLexicalComposerContext();

  const onClick = () => {
    editor.dispatchCommand(INSERT_TWEET_COMMAND, '1762485371441463538');
  };
  return <Button onClick={onClick}>TWITTER</Button>;
}

export default MyTweetButton;
