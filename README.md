# PowerSync App

Welcome to the PowerSync App! Follow the steps below to set up and run the application locally.

## Prerequisites

Ensure you have the following installed on your system:
- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/)

## Getting Started

1. **Start PowerSync using Docker Compose**  
    Navigate to the `powersync` folder and run the following command to start PowerSync services:
    ```bash
    docker-compose up
    ```

2. **Set Up the Application**  
    - Rename the `.env.example` file to `.env`:
      ```bash
      mv .env.example .env
      ```
    - Install dependencies:
      ```bash
      pnpm install
      ```

3. **Run Database Migrations**  
    Execute the following command to run the database migrations using Drizzle:
    ```bash
    pnpm run migrate
    ```

4. **Start the Application**  
    Launch the app in development mode:
    ```bash
    pnpm run dev
    ```

## Notes

- This setup uses PowerSync locally. The token is hardcoded for development purposes.
- We utilize the following libraries for token generation and management:
  - `key-generator`
  - `token-service` (from the PowerSync demo repository)

Feel free to explore and modify the app as needed. Happy coding!