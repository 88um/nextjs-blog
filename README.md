# NextJS Blog Webapp
This is a TypeScript React application built with Next.js. It allows users with the editor role or higher to writea and upload articles, manage user profiles, and includes features such as form validation with Zod and authentication with NextAuth.js.

## Features

- **Next.js:** The application is built with Next.js, a React framework that enables server-side rendering, routing, and more.
- **Tiptap Editor with OpenAI Autocomplete:** The application utilizes the Tiptap editor, which offers a rich text editing experience, and leverages OpenAI's autocomplete functionality to enhance the user experience by providing AI-powered suggestions and autocomplete features.
- **Prisma with Supabase PostgreSQL:** Prisma is used as the ORM for interacting with a Supabase PostgreSQL database, providing a seamless and type-safe database access layer.
- **Form Validation with Zod:** Zod is used for form validation, ensuring that user input is validated against defined schemas before submission.
- **NextAuth.js:** Authentication is implemented with NextAuth.js, providing authentication and authorization features such as social login, email/password authentication, and JSON Web Token (JWT) authentication.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js and npm (or yarn)
- Supabase account for PostgreSQL database
- Prisma CLI (`npm install prisma -g` or `yarn global add prisma`)
- NextAuth.js configured with authentication providers (e.g., Google, Facebook, etc.)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```
2. Install Dependencies
```
npm install
# or
yarn install
```
3. Configure .env variables
```
DATABASE_URL=
OPENAI_API_KEY=
NEXTAUTH_SECRET=
```

## Development
To start the development server, run the following command:
```
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000.

## Deployment
Before deploying the application to production, make sure to configure deployment settings and environment variables accordingly. You can deploy the application to platforms like Vercel, Netlify, or your own server.

## Contributing
Contributions are welcome! If you'd like to contribute to the project, please send a PR.

## License
This project is licensed under the MIT License.
