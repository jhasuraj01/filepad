# React Notepad Based on Clean Architecture

This is a sample project built with React, following the principles of clean architecture. The project aims to provide a simple file explorer with basic features such as editing files, creating directories, creating files, and renaming/deleting directories and files.

## Getting Started
To get started with the project, you will need to have Node.js installed on your computer. Then, clone the repository to your local machine and install the dependencies by running the following commands:

```bash
git clone https://github.com/jhasuraj01/notepad.git
cd notepad
npm install
```

After the installation is complete, start the development server with the following command:
```bash
npm start
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

## Technologies Used
- ReactJS
- Redux Toolkit
- TypeScript
- Sass
- Ant Design

## Conclusion
This project is an example of how to structure a React application following the Clean Architecture principles. By separating the code into different layers, it becomes easier to maintain and test the application. The use of Redux Toolkit simplifies the implementation of state management and improves the performance of the application.
