import style from './index.module.scss'

import { $getRoot, $getSelection, EditorState } from 'lexical'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'

const theme = {
  // Theme styling goes here
}

export interface LexicalEditorWrapperProps {
  className?: string
}
export function LexicalEditorWrapper({ className }: LexicalEditorWrapperProps) {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError: console.error,
  }

  function onChange(editorState: EditorState): void {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot()
      const selection = $getSelection()

      console.log(root, selection)
    })
  }

  return (
    <div className={`${className ?? ''} ${style.container}`}>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className={style.editorInput}/>}
          placeholder={<div className={style.editorPlaceholder}>Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </LexicalComposer>
    </div>
  )
}