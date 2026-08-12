JS Back-End
===========

This repository contains my implementations of the projects provided during the [JS Back-End](https://softuni.bg/trainings/5315/js-back-end-june-2026) course at [SoftUni](https://softuni.bg).

📁 Projects
----------

Throughout the course, practical projects were progressively developed to apply the theoretical concepts into functional web applications:

- [Cat Shelter](./(2026-06-17)%20Introduction%20to%20Node.js%20Streams%20and%20Utilities/cat-shelter)
- [Movie Magic](./(2026-07-15)%20Validation%20and%20Error%20Handling/movie-magic)
- [Furniture Store](./(2026-07-22)%20REST%20API/furniture-store/api)
- [Space Mission Control](./(2026-08-01)%20Final%20Exam/space-mission-control)

🚀 How to Run
------------

To run a specific project locally, follow these steps:

1. **Clone the repository** and navigate to the desired project’s root directory.
2. **Install project dependencies** with `npm install`.
3. **Configure the environment (if applicable):** If the project includes a `.env.example` file, duplicate it, rename it to `.env`, and provide the required credentials (e.g., database connection string or JWT secret).
4. **Set up the database (for Prisma-enabled projects):** Apply the migrations to your database with executing `npx prisma migrate dev` and generate the Prisma Client with `npm run generate:client`.
5. **Start the application server** with `npm start`. For development mode with auto-reloading, you can use instead `npm run dev`.

🛠️ Technologies & Tools Used
---------------------------

- JavaScript (ES6+)
- Node.js
- Express.js
- Handlebars
- Prisma ORM
- Bcrypt
- JSON Web Token (JWT)
- Zod

📚 Course Structure
------------------

| Lesson topic                                  | Lesson type | Date          |
| --------------------------------------------- | ----------- | ------------- |
| Introduction to Node.js Streams and Utilities | lecture     |  15 June 2026 |
| Introduction to Node.js Streams and Utilities | exercise    |  17 June 2026 |
| ExpressJS and Templating                      | lecture     |  22 June 2026 |
| ExpressJS and Templating                      | exercise    |  24 June 2026 |
| PostgreSQL and Prisma ORM                     | lecture     |  29 June 2026 |
| PostgreSQL and Prisma ORM                     | exercise    |   1 July 2026 |
| Session and Authentication                    | lecture     |   6 July 2026 |
| Session and Authentication                    | exercise    |   8 July 2026 |
| Validation and Error Handling                 | lecture     |  13 July 2026 |
| Validation and Error Handling                 | exercise    |  15 July 2026 |
| REST API                                      | lecture     |  20 July 2026 |
| REST API                                      | exercise    |  22 July 2026 |
| Exam Preparation                              | exercise    |  27 July 2026 |
| Regular Exam                                  | exam        | 1 August 2026 |