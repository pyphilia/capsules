import React from 'react';

import { Button } from '@mui/material';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { INSERT_LINK_ITEM_COMMAND } from './plugins/LinkItemPlugin';

export function LinkItemButton() {
  const [editor] = useLexicalComposerContext();

  const onClick = () => {
    editor.dispatchCommand(INSERT_LINK_ITEM_COMMAND, {
      url: 'https://graasp.org/',
      title: 'graasp',
      layout: 'iframe',
    });
  };
  return <Button onClick={onClick}>ADD LINK ITEM</Button>;
}
