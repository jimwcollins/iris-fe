# The Iris

## Front-End

A full-stack, responsive news app built using React, Express and postgreSQL.

The hosted site can be found here: <to come>

The backend repo can be found here: https://github.com/jimwcollins/iris-be

&nbsp;

## `Features`

- Fully responsive, with specific UI elements and menus for tablets and phones.
- Users can vote and comment on articles, plus vote on comments. They can only vote once for each article or comment.
- The most popular articles for a topic (or in general if no topic is selected) appear in a sidebar to drive site engagement.
- Users can log in to the site, giving access to buttons allowing them to post a new article, delete their own articles, or comment on existing articles. If no user is logged in, these buttons are not rendered.
- Users can perform a fuzzy search of topics, bringing back any appropriate matches. They can then display the articles solely for one topic.
- Articles can be sorted by date, number of comments and number of votes.

&nbsp;

## `Tech Stack`

### Front End

- React
- Reach router
- Axios for calls to back-end api
- React Responsive to handle media queries in React
- Hosting on netlify

### Back End

- Express server
- postgreSQL database
- Knex
- Jest for testing
- Hosting on heroku

&nbsp;

## `Future improvements`

- Implement article list pagination
- Allow sorting of comments
- Implement sign-up of new users
- Allow creation of new topics
- Add images to articles
- Persist user voting info between sessions. Don't allow them to vote on their own article or comment.
- Dark mode

&nbsp;

## `Installation`

To install locally, run the following commands:

### npm install

Install required project dependencies locally

### npm start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### npm run build

Builds the app for production to the `build` folder.
