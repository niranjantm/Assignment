
# Task Management API
The project involves using NodeJS with express to build APIs for a task management application. I have created two APIs for this project

1. ### User API
   This API deals with user authentication, it exposes three endpoints. Please visit the below link to read the documentation about this API
      https://documenter.getpostman.com/view/30001255/2s9Ykrbf4q#ad3b5cf6-e7b0-4c8f-aecc-1fd371539c9f

3. ### Task API
   This API is used to perform CRUD operations on Tasks, it exposes five endpoints. Please visit the below link to read the documentation about this API
      https://documenter.getpostman.com/view/30001255/2s9Ykrbf4q#739d4fb2-e7a4-427e-b4c5-85e004ef7816

## API documentation
https://documenter.getpostman.com/view/30001255/2s9Ykrbf4q

## Directories
   I have split the schema, the index and the routes into different modules
   - **/api/index**- Contains the code for Express.js server with MongoDB connection, utilizing Mongoose for handling database operations. Error handling middleware is included which responds with appropriate status codes and messages.
   - **/api/models**- Contains the schema files for creation of models for MongoDB
   - **/api/routes**- Contains the express route files which are used in different API calls
   - **/api/utils**- Contains two files one as error handling middleware and another to authenticate the user by using cookies.

## packages used
  - nodemon
  - mongoose
  - cookie-parser
  - jsonweb-token

### To run the application navgate to /Assignment directory and then use " npm start "


## Built with

<a href='https://nodejs.org/en' ><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"  height="25"></a>
<a href='https://expressjs.com/' ><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"  height="25"></a>
<a href='https://www.mongodb.com/' ><img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"  height="25"></a>

