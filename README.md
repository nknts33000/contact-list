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




🧑‍💻 generateUsername

Purpose:
Generates a unique username using a configurable prefix, current timestamp, and random characters. This is useful for tests that require creating new users without conflicts.

How it works:

Uses the current time (Date.now()) encoded in base-36 to keep the username compact and unique.

Appends a random alphanumeric string to reduce the chance of collisions.

Prepends a customizable prefix (default: user).

Ensures the final username does not exceed a specified maximum length.

Key Features:

✅ Automatically unique

✅ Configurable prefix

✅ Enforces maximum length

✅ Suitable for parallel test execution

Parameters:

prefix (string, optional) – Username prefix (default: user)

maxLength (number, optional) – Maximum allowed length (default: 20)

Example Output:

user-lk3p9a8xq7





🔐 generatePassword

Purpose:
Generates a secure, random password that meets typical complexity requirements, making it suitable for user registration and authentication tests.

How it works:

Ensures the password contains at least:

One uppercase letter

One lowercase letter

One number

One special character

Uses cryptographically secure randomness (crypto.getRandomValues) when available.

Randomly shuffles characters so the structure is not predictable.

Throws an error if the requested password length is less than 8 characters.

Key Features:

🔒 Strong password complexity

🔒 Secure random generation

🔒 Configurable length

🔒 Prevents weak passwords

Parameters:

length (number, optional) – Desired password length (minimum: 8, default: 8)
