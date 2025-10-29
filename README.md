🔐 Password Strength Checker (Next.js)

 Overview

The Password Strength Checker is a modern web application built with Next.js (TypeScript) that evaluates how secure a user’s password is.
It analyzes password length, character diversity, and common patterns to generate a real-time strength rating — helping users create stronger and safer passwords.

 Features

 Built with Next.js 14 and React
 Real-time strength evaluation as users type
 Displays password strength levels: Weak, Moderate, Strong

 Checks for:

Minimum length requirement
Uppercase and lowercase letters
Numbers and special characters
Common password patterns

The main logic in page.tsx evaluates the entered password based on:

Length (≥ 8 characters)
Presence of uppercase, lowercase, digits, and symbols
Avoidance of common or repetitive sequences
A score is computed dynamically and reflected visually (e.g., color bars or messages).

🎨 Styled with globals.css for a clean, responsive UI

🗂️ Folder Structure
password-strength-checker/
│
├── app/
│   ├── globals.css       # Global styling
│   ├── layout.tsx        # Root layout for the app
│   └── page.tsx          # Main password checker page
│
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation

🚀 Getting Started
Clone the Repository
git clone https://github.com/manasvig-cyber/password-strength-checker.git
cd password-strength-checker

Install Dependencies
npm install

Run the Development Server
npm run dev


Then open your browser and visit:
👉 http://localhost:3000

 Example UI
[ Enter your password here ] 
→ Strength: Moderate 
Tips: Add special characters or numbers to strengthen your password.

Security Notes

This demo does not collect or store user passwords.
Intended for educational and personal demonstration only.
Always follow best practices for handling real credentials in production apps.

 Future Enhancements
Add visual strength meter bar (color-coded)
Include password suggestions
Enable password visibility toggle

Integrate AI-based entropy analysis

License

This project is released under the MIT License — feel free to use and modify for your own learning or projects.
