import React from 'react';

import { Button } from '@mui/material';

import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export function MyLinkButton() {
  const [editor] = useLexicalComposerContext();

  const onClick = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
      url: 'https://graasp.org/',
      title: 'graasp',
    });
  };
  return <Button onClick={onClick}>SELECT TEXT AND ADD LINK</Button>;
}
