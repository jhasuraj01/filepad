import style from './index.module.scss'
import { ReactComponent as FilePadIcon } from '../../assets/filepad.svg'
import Poster from '../../assets/og-image.webp'

export interface AboutAppWrapperProps {
  className?: string
}

export function AboutAppWrapper({ className }: AboutAppWrapperProps) {
  return (
    <div className={`${className || ''} ${style.container}`}>
      <img src={Poster} width={2048} height={1151} alt="" style={{ maxWidth: 'min(600px, 95%)' }} />
      <div className={style.badges}>
        <img src='https://img.shields.io/github/license/jhasuraj01/filepad?color=blue' alt='license' />
        <img src='https://img.shields.io/github/stars/jhasuraj01/filepad' alt='stars' />
        <img src='https://img.shields.io/github/last-commit/jhasuraj01/filepad?color=blue' alt='last-commit' />
        <img src='https://img.shields.io/github/languages/top/jhasuraj01/filepad' alt='languages' />
        <img src='https://img.shields.io/github/repo-size/jhasuraj01/filepad' alt='repo-size' />
      </div>
      <p>Github Repo: <a href="https://github.com/jhasuraj01/filepad" target="_blank" rel="noopener noreferrer">github.com/jhasuraj01/filepad</a></p>
      <h1>
        <FilePadIcon width={44} height={44} style={{ float: 'left', marginRight: '8px' }} />
        <span>FilePad: File Explorer & Editor</span>
      </h1>
      <p style={{ maxWidth: 'min(600px, 95%)' }}>
        This project showcases a File Explorer & Editor developed using React, adhering to
        the principles of clean architecture. By employing a layered code structure, the
        application becomes more manageable and facilitates effective testing. Leveraging
        Redux Toolkit for state management enhances performance and simplifies implementation.
        This example serves as a valuable reference for structuring React applications in
        accordance with Clean Architecture principles, empowering developers to build robust
        and scalable software solutions.
      </p>
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
      {/* <h3>References:</h3>
      <ul>
        <li>
          <a href="https://openai.com/blog/chatgpt" target="_blank" rel="noopener noreferrer">
            OpenAI ChatGPT
          </a>
        </li>
        <li>
          <a href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html" target="_blank" rel="noopener noreferrer">
            Clean architecture
          </a>
        </li>
        <li>
          <a href="https://youtu.be/VmY22KuRDbk" target="_blank" rel="noopener noreferrer">
            {'How to implement Clean Architecture in Node.js (and why it\'s important)'}
          </a>
        </li>
        <li>
          <a href="https://youtu.be/CnailTcJV_U" target="_blank" rel="noopener noreferrer">
            Using Clean Architecture for Microservice APIs in Node.js with MongoDB and Express
          </a>
        </li>
        <li>
          <a href="https://github.com/rmanguinho/clean-react" target="_blank" rel="noopener noreferrer">
            4Dev React - Enquetes para Programadores
          </a>
        </li>
        <li>
          <a href="https://dev.to/rubemfsv/clean-architecture-applying-with-react-40h6" target="_blank" rel="noopener noreferrer">
            Clean Architecture: Applying with React
          </a>
        </li>
      </ul> */}
    </div>
  )
}
