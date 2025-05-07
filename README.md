# Checklist Test by @dpardox

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.10.

This project uses [Tailwind CSS](https://tailwindcss.com/) version 4.1 for utility-first and mobile-first styling.

This project uses uses [Firebase Authentication](https://firebase.google.com/products/auth) and [Cloud Firestore](https://firebase.google.com/products/firestore) through the [AngularFire](https://github.com/angular/angularfire) library for authentication and data persistence. Because of this, there was no need to implement a custom backend using Node.js or Express.

This project features continuous deployment (CD) via GitHub Actions to GitHub Pages. Every push to the `main` branch triggers a production build and automatically updates the deployed version at [checklist.dpardox.com](https://checklist.dpardox.com).

## Getting Started

To get started with this project, clone the repository and install the dependencies.

Copy the `src/environments/environment.example.ts` file to `src/environments/environment.ts` and fill in the required values.

Run `npm start` To start a local development server.

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.
