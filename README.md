# Blog List App

A simple blog listing application built using React, Redux, Node.js, and MongoDB. This application allows users to create, view, and manage blog posts.

## Features
- User authentication
- Create, update, and delete blog posts
- Like and comment on blog posts
- Responsive UI built with React and Redux
- Backend powered by Node.js and Express
- Data persistence with MongoDB

## Tech Stack
This project is built using the following technologies:
- **Frontend:** React, Redux
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **CI/CD:** GitHub Actions
- **Deployment:** Fly.io

## Purpose
The aim of this app is to demonstrate my learnings on setting up CI/CD pipelines. It includes automated testing, deployment, and release management.

## Live Demo
You can visit the deployed application at: [Blog List App](https://fullstack-ci-cd-floral-sunset-5336.fly.dev/)

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm
- MongoDB

### Setup
1. Clone the repository:
   ```sh
     git clone git@github.com:firstnuel/bloglistapp.git
   ```
   
2. Navigate into the project directory:
   ```sh
     cd bloglistapp
   ```
3. Install dependencies:
  ```sh
    npm install
  ```
4. Set up environment variables in a `.env` file in the root directory:
  ```env
    MONGODB_URI=your_mongodb_uri
    TEST_MONGODB_URI=your_test_mongodb_uri
    SECRET=your_secret_key
    PORT=3000
  ```
5. Run the development server:
     ```sh
      npm dev
    ```

### Running Tests
To run tests, use:

```sh
  npm test
```

###  Deployment
  This application is deployed automatically via GitHub Actions when changes are pushed to the main branch.
