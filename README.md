# MyFlix
![MyFlix](https://i.postimg.cc/hvzZZ6MT/myflix.png)

## About
Movie app consisting of a database containing a few movies and a client-side providing several features for users.  
This project was part of the CF Full-Stack Web Development course and was built with the MERN (MongoDB, Express,
React, and Node.js) stack.

The web application provides users with access to information about different movies, directors, and genres. 
Users can sign up, log in, update their account information and manage a list of their favorite movies.

![MyFlix](https://i.postimg.cc/GmK0D0fm/overview.png)

View the website [here](https://mymovieapi2020.herokuapp.com/client/).
To test it, you can use the following test user:
- Username: TestUser
- Password: TestPassword

**Please do not delete this account, thank you!**

You can find the endpoint documentation on [this link](https://mymovieapi2020.herokuapp.com/documentation.html).

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


## Dependencies
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

## Planned updates:
#### Back-end:
- [ ] Improved server-side validation
  
#### Client-side:
- [ ] Animated logo/title in Login and Registration views
- [ ] Login error messages/alerts
- [ ] Sort movies function
- [ ] DirectorView and GenreView updates 
  (responsive design, 'Back' button to return the previously viewed movie, display corresponding movies)
- [ ] Confirmation alert for account deletion
- [ ] Design updates
- [ ] Add favicon
