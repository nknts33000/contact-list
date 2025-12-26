✅ Prerequisites
Make sure the following are installed:
Typescript - latest
Node.js - latest 
Playwright - latest 

⚙️ Setup Instructions

Before running any test, make a .env file in the project's root folder and write the environment variable BASE_URL set it to the appropriate value.

RUN:

git clone https://github.com/nknts33000/contact-list
cd contact-list
npm install

📁 Project Structure
contact-list/
│
├── tests/               # Test cases
├── pages/               # Page Object Models
├── authentication/      # Authentication class
├── dto/                 # API DTOs
├── fixtures/            # fixtures for pages, services and authentication
├── factory/             # username and password generator functions
├── services/            # api service classes  
├── package.json 
├── package-lock.json
├── playwright.config.ts 
└── README.md

▶️ Running Tests 

To run all tests:

npx playwright test

To run end-to-end test cases:

npx playwright test tests/e2e

To run all api test cases: 

npx playwright test tests/api

