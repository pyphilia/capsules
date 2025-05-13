
import {  Editor, Element, Transforms} from "slate";

export const onKeyDown = editor=>(event) => {
                    if (!event.ctrlKey) {
                      return;
                    }
          
                    switch (event.key) {
                      case 'a': {
                        event.preventDefault();
                        const [match] = Editor.nodes(editor, {
                          match: (n) => n.type === 'code',
                        });
                        Transforms.setNodes(
                          editor,
                          { type: match ? null : 'code' },
                          {
                            match: (n) =>
                              Element.isElement(n) && Editor.isBlock(editor, n),
                          },
                        );
                        break;
                      }
          
                      case 'b': {
                        event.preventDefault();
                        Editor.addMark(editor, 'bold', true);
                        break;
                      }
                    }
                  }