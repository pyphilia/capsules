
import { CustomEditor } from "./CustomEditor";

export const onKeyDown = editor=>(event) => {
                    if (!event.ctrlKey) {
                      return;
                    }
          
                    switch (event.key) {
                        case '`': {
                          event.preventDefault()
                          CustomEditor.toggleCodeBlock(editor)
                          break
                        }
            
                        case 'b': {
                          event.preventDefault()
                          CustomEditor.toggleBoldMark(editor)
                          break
                        }
                      }
                  }