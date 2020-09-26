# MyFlix
![MyFlix](https://i.postimg.cc/hvzZZ6MT/myflix.png)

## About
Movie app consisting of a database containing a few movies and a client-side providing several features for users.  
This project was part of the CF Full-Stack Web Development course and was built with the MERN (MongoDB, Express,
React, and Node.js) stack.

The web application provides users with access to information about different movies, directors, and genres. 
Users can sign up, log in, update their account information and manage a list of their favorite movies.

![MyFlix](https://i.postimg.cc/GmK0D0fm/overview.png)

View the **website** [here](https://mymovieapi2020.herokuapp.com/client/).

To **test it**, you can use the following test user:
- **Username:** TestUser
- **Password:** TestPassword

**Please do not delete this account, thank you!**

You can find the **endpoint documentation** on [this link](https://mymovieapi2020.herokuapp.com/documentation.html).

## User stories
- As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Project requirements
The project brief extracted several mandatory functions from the user stories that needed to be implemented:
1. Return a list of ALL movies to the user
2. Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
3. Return data about a genre (description) by name/title (e.g., “Thriller”)
4. Return data about a director (bio, birth year, death year) by name
5. Allow new users to register
6. Allow users to update their user info (username, password, email, date of birth)
7. Allow users to add a movie to their list of favorites
8. Allow users to remove a movie from their list of favorites
9. Allow existing users to deregister

The **server side** of the web application consists of a REST API and a database built with JavaScript, Node.js, Express, and MongoDB. The
REST API can be accessed via commonly used HTTP methods like GET, PUT, POST and DELETE. CRUD methods are used to retrieve data from the database and store that
data in a non-relational way. I used Postman for endpoint testing and Mongoose for the business layer logic. The database was built with MongoDB; the final project is hosted on Heroku. 

The **client side** was built with React. While intimidating at first, I really enjoyed working with this [library/framework](https://develoger.com/is-reactjs-library-or-a-framework-a14786f681a0) and I'm looking forward to gaining a deeper understanding of it. The goal was to develop a single-page, responsive application that uses routing, different interactions and has several interface views:

#### Main view
- Returns a list of ALL movies to the user (each listed item with an image, title, and description)
- Filtering
- Ability to select a movie for more details

#### Single movie view
- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

#### Login view
- Allows users to login with a username and password

#### Registration view
- Allows new users to register (username, password, email, birthday)

#### Genre view
- Returns data about a genre, with a name and description

#### Director view
- Returns data about a director (name, bio, birth year, death year)
- Displays example movies

#### Profile view
- Allows users to update their user info (username, password, email, date of birth)
- Allows existing users to deregister
- Displays favorite movies
- Allows users to remove a movie from their list of favorites

## Dependencies
You can install all dependencies by running `npm install` in the project directory.

- "axios",
- "bcrypt",
- "body-parser",
- "cors",
- "express",
- "express-validator",
- "jsonwebtoken",
- "lodash",
- "mongoose",
- "morgan",
- "passport",
- "passport-jwt",
- "passport-local",
- "prop-types",
- "react",
- "react-bootstrap",
- "react-dom",
- "react-router-dom",
- "uuid"

To run the project, run `npm start` in the project directory. 

## Planned updates:
#### Back-end:
- [ ] Improved server-side validation
  
#### Client-side:
- [ ] Animated logo/title in Login and Registration views
- [ ] Login error messages/alerts
- [ ] Sort movies function
- [ ] DirectorView and GenreView updates (responsive design, 'Back' button to return the previously viewed movie, display corresponding movies)
- [ ] Confirmation alert for account deletion
- [ ] Design updates
- [ ] Add favicon

#### Other:
- [ ] Update ReadMe with an image for each view
