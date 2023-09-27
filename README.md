# Task Hub - Collaborative Task Management App

Task Hub is a collaborative task management application that facilitates seamless task tracking in team environments. It empowers users to efficiently create, assign, and monitor tasks within their teams.

## Features

- **User Authentication**

  - Sign up, log in, and log out functionality.
  - User profiles with customizable profile pictures, usernames, and bios.

- **Task Creation and Management**

  - Create tasks with essential details: title, description, due date, and priority level.
  - Assign tasks to team members for streamlined collaboration.
  - Easily update task status to mark them as completed or in progress.

- **Team Collaboration**

  - Form teams and invite members for focused collaboration.
  - Users have access only to tasks within their respective teams, ensuring privacy and efficiency.

- **Task Filtering and Sorting**

  - Filter tasks by status (completed, in progress, pending) and due date.
  - Sort tasks based on priority, due date, and other relevant criteria.

- **Dashboard (Bonus Feature)**
  - A centralized overview of tasks across all teams for quick insights.

## Front-End Dependencies

- [@tanstack/react-query](https://github.com/tannerlinsley/react-query)
- [firebase](https://firebase.google.com/)
- [lottie-react](https://github.com/gre/lottie-react)
- [react](https://reactjs.org/)
- [react-dom](https://reactjs.org/docs/react-dom.html)
- [react-helmet-async](https://github.com/staylor/react-helmet-async)
- [react-hook-form](https://react-hook-form.com/)
- [react-hot-toast](https://react-hot-toast.com/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [react-router-dom](https://reactrouter.com/web/guides/quick-start)

## Back-End Dependencies

- [cors](https://expressjs.com/en/resources/middleware/cors.html)
- [dotenv](https://github.com/motdotla/dotenv)
- [express](https://expressjs.com/)
- [mongodb](https://www.mongodb.com/)

## Getting Started

Follow these steps to set up Task Hub:

### Clone the Repository

```bash
git clone https://github.com/your-username/task-hub.git
cd task-hub
```

## Front-End Setup

### Install the required dependencies:

```bash
cd task-hub-client
npm install
```

### Run the app:

```bash
npm run dev
```

### Make sure to create a .env file in the root directory of the client and add the following environment variables:

```bash
VITE_APIKEY= YOUR_FIREBASE_API_KEY
VITE_AUTHDOMAIN= YOUR_FIREBASE_AUTH_DOMAIN
VITE_PROJECTID= YOUR_FIREBASE_PROJECT_ID
VITE_STORAGEBUCKET= YOUR_FIREBASE_STORAGE_BUCKET
VITE_MESSAGINGSENDERID= YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_APPID= YOUR_FIREBASE_APP_ID
VITE_MEASUREMENTID= YOUR_FIREBASE_MEASUREMENT_ID
```

## Back-End Setup

### Install the required dependencies:

```bash
cd task-hub-server
npm install
```

### Run the app:

```bash
nodemon index.js
```

### Make sure to create a .env file in the root directory of the server and add the following environment variables:

```bash
DB_USER= YOUR_MONGODB_USERNAME
DB_PASS= YOUR_MONGODB_PASSWORD
```

### Connect Front-End to Back-End

- Ensure that the front-end makes requests to the correct back-end endpoints.

## For any queries, feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/fahimshariar28/) .
