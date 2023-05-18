import style from './index.module.scss'

export interface AboutAppWrapperProps {
  className?: string
}

export function AboutAppWrapper({ className }: AboutAppWrapperProps) {
  return (
    <div className={`${className || ''} ${style.container}`}>
      <h1>FilePad</h1>
      <div className={style.badges}>
        <img src='https://img.shields.io/github/license/jhasuraj01/filepad?color=blue' alt='license' />
        <img src='https://img.shields.io/github/stars/jhasuraj01/filepad' alt='stars' />
        <img src='https://img.shields.io/github/last-commit/jhasuraj01/filepad?color=blue' alt='last-commit' />
        <img src='https://img.shields.io/github/languages/top/jhasuraj01/filepad' alt='languages' />
        <img src='https://img.shields.io/github/repo-size/jhasuraj01/filepad' alt='repo-size' />
        <img src='https://img.shields.io/tokei/lines/github/jhasuraj01/filepad' alt='repo-size' />
      </div>
      <p>Github Repo: <a href="https://github.com/jhasuraj01/filepad" target="_blank" rel="noopener noreferrer">github.com/jhasuraj01/filepad</a></p>
      <p>File Explorer & Editor built with React, following the principles of clean architecture.</p>
      <h3>Features:</h3>
      <ul style={{ listStyle: 'none' }}>
        <li><span style={{ userSelect: 'none' }}>☑️ </span>Create New Folder and File</li>
        <li><span style={{ userSelect: 'none' }}>☑️ </span>Monaco Editor Supported</li>
        <li><span style={{ userSelect: 'none' }}>☑️ </span>Download File</li>
        <li><span style={{ userSelect: 'none' }}>⬛ </span>Lexical Editor Supported</li>
        <li><span style={{ userSelect: 'none' }}>⬛ </span>Excalidraw Whiteboard Supported</li>
        <li><span style={{ userSelect: 'none' }}>⬛ </span>Download Folder</li>
        <li><span style={{ userSelect: 'none' }}>⬛ </span>Export File to PDF</li>
        <li><span style={{ userSelect: 'none' }}>⬛ </span>Export Folder to PDF</li>
        <li><span style={{ userSelect: 'none' }}>⬛ </span>Open Local File</li>
        <li><span style={{ userSelect: 'none' }}>⬛ </span>Open Local Folder</li>
      </ul>
      <h3>Authors:</h3>
      <ul style={{ listStyle: 'none' }}>
        <li><a href='https://github.jhasuraj.com/' target='_blank' rel='noopener noreferrer'>@jhasuraj01</a></li>
      </ul>
    </div>
  )
}
