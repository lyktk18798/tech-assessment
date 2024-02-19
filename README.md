# Shorten URL React App

This is a React application that allows users to shorten URLs using a URL shortening service.

## Prerequisites

- Node.js and npm or yarn
- Git

## Installation

1. Clone the repository: ``git clone https://github.com/lyktk18798/tech-assessment.git``
2. Navigate into the project directory: ``cd tech-assessment``
3. Install dependencies:
``npm install``
or
``yarn install``

## Usage
1. Start the development server: 
``npm start``
or
``yarn start``
2. The app will be running at ``http://localhost:3000`` by default.
3. Enter a long URL into the input field and click "Create a link" to generate a shortened URL.
4. Copy the shortened URL to the clipboard by clicking the "Copy" icon.

## API Integration
This app utilizes a URL shortening service API to generate shortened URLs. You will need to obtain an API Endpoint and configure it in the app.

###Environment Configuration
Currently the endpoint of Backend service is ``http://localhost:8080``, please check out here: ``https://github.com/lyktk18798/tech-assessement-be.git``

Update API endpoint for your server by update value of REACT_APP_API_ENDPOINT in .env file

## Running Unit Tests
To run unit tests for the React components, use the following command:
``npm test``
or
``yarn test``

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.
