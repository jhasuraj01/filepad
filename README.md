![bg-13](https://github.com/jhasuraj01/filepad/assets/44930179/c18f625e-5c26-496e-b7fa-5615d79ac96e)

# React FilePad: File Explorer & Editor built with Clean Architecture Principles

This project showcases a File Explorer & Editor developed using React, adhering to the principles of clean architecture. By employing a layered code structure, the application becomes more manageable and facilitates effective testing. Leveraging Redux Toolkit for state management enhances performance and simplifies implementation. This example serves as a valuable reference for structuring React applications in accordance with Clean Architecture principles, empowering developers to build robust and scalable software solutions.

## Features

- [x] Create New Folder and File
- [x] Monaco Editor Supported
- [x] Download File
- [ ] Lexical Editor Supported
- [ ] Excalidraw Whiteboard Supported
- [ ] Download Folder
- [ ] Export File to PDF
- [ ] Export Folder to PDF
- [ ] Open Local File
- [ ] Open Local Folder

## Authors

- [@jhasuraj01](https://www.github.com/jhasuraj01)


## Tech Stack

- ReactJS
- Redux Toolkit
- TypeScript
- Sass
- Ant Design

## Environment Setup
- Download and install [Git](https://git-scm.com/downloads)
- Download and install [Node.js](https://nodejs.org/en/download/)
## Run Locally

Clone the project

```bash
  git clone https://github.com/jhasuraj01/filepad.git
```

Go to the project directory

```bash
  cd filepad
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Folder Structure

The directory structure of the project is organized according to the principles of clean architecture. The project is divided into four main layers:

#### Presentation Layer
This layer is responsible for rendering the user interface and handling user interactions. It consists of the presentation directory and its subdirectories.

#### Domain Layer
This layer contains the business logic of the application. It consists of the domain directory and its subdirectories.

#### Infrastructure Layer
This layer provides the implementation details for the abstractions defined in the domain layer. It consists of the infrastructure directory and its subdirectories.

#### Adapters Layer
This layer provides the interfaces between the application and external systems. It consists of the adapters directory and its subdirectories.
## Screenshots

#### FilePad Editor
![FilePad Editor](https://github.com/jhasuraj01/filepad/assets/44930179/057aff72-56b8-4a8b-92dd-116480940797)

#### FilePad File Explorer
![FilePad Explorer](https://github.com/jhasuraj01/filepad/assets/44930179/13540121-9bf6-4a62-8abb-730853b56d6d)

#### Context Menu - Create New File
![Context Menu - Create New File](https://github.com/jhasuraj01/filepad/assets/44930179/65dfaa13-56bf-4522-82ee-70c9216b5b3d)

##### Folder Context Menu
![Folder Context Menu](https://github.com/jhasuraj01/filepad/assets/44930179/dcabb439-1695-4a72-905a-74deb5f9db06)

##### File Context Menu
![File Context Menu](https://github.com/jhasuraj01/filepad/assets/44930179/7949af84-06ba-4394-8a57-53e61d4233c0)

##### FilePad Editor: Mobile View
<img src="https://github.com/jhasuraj01/filepad/assets/44930179/9c806994-18cf-4684-ac0e-c6928675e4ed" width="414" title="Mobile View" alt="Mobile View">

## References

- [OpenAI ChatGPT](https://openai.com/blog/chatgpt)
- [Clean Architerture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [How to implement Clean Architecture in Node.js (and why it's important)](https://youtu.be/VmY22KuRDbk)
- [Using Clean Architecture for Microservice APIs in Node.js with MongoDB and Express](https://youtu.be/CnailTcJV_U)
- [4Dev React - Enquetes para Programadores](https://github.com/rmanguinho/clean-react)
- [Clean Architecture: Applying with React](https://dev.to/rubemfsv/clean-architecture-applying-with-react-40h6)
## Appendix

This project is an example of how to structure a React application following the Clean Architecture principles. By separating the code into different layers, it becomes easier to maintain and test the application. The use of Redux Toolkit simplifies the implementation of state management and improves the performance of the application.
