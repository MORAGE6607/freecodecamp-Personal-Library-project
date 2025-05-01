Personal Library Project

## Project Overview
This project involves building a full-stack JavaScript Personal Library app where users can:
- Add new books (with a unique `_id` and title)  
- View all books (with title, `_id`, and comment count)  
- View a single book’s details (with comments)  
- Add comments to a book  
- Delete a single book or all books  

## Completion Status
Finished the Personal Library Project and passed all the tests:  
- Connected to MongoDB using Mongoose in `server.js`  
- Defined the `Book` schema (with `comments` array and `commentcount` virtual) in `routes/api.js`  
- Implemented all required API routes in `routes/api.js`:  
  - `POST /api/books`  
  - `GET /api/books`  
  - `GET /api/books/:id`  
  - `POST /api/books/:id`  
  - `DELETE /api/books/:id`  
  - `DELETE /api/books`  
- Completed the functional tests in `tests/2_functional-tests.js`  

--  
📄 License: This project is completed for educational purposes under the FreeCodeCamp curriculum.  
