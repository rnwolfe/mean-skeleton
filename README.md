# Introduction
[Note: This is not a fully completed skeleton project, yet; however, will work for a quicker start than from scratch! I will clean this up more in the future as I go.]

This a skeleton for a MEAN stack application to help quick start projects in the format that I normally do. This by no means represents best practices or anything else along those lines.

This project uses
* MongoDB (via Atlas)
* ExpressJS
* Angular
* Node.js (w/ nodemon)

# Setup
## Setup Backend
1. Install node packages for backend in `./backend/` using `npm i`.
2. Configure MongoDB connection details in `./nodemon.json`. If using a pre-existing MongoDB Atlas instance, just change the DB name on the end of the URL to a new one. Mongoose will handle creation of new collections, etc. automatically when referencing them.
3. Set a unique JSON Web Token key in `./nodemon.json`.
* Start the backend using `npm run start:server`.
* Nodemon is used to monitor for changes and auto-restart the server.
* The backend uses port 3000 by default.

## Setup Frontend
1. Angular will use a Node backend will be at http://localhost:3000/api when running in dev, but can be modified in `./src/environments/environment.ts`.
2. The Node backend URL for production needs to be set in `./src/environments/environment.prod.ts`.
* Run the frontend using `ng serve` from project root directory.
* Frontend will run on http://localhost:4200 by default.

# Building Off of the Skeleton
## Add New API Routes
The general structure for routes uses

* **Controllers** for logic.
* **Routes** for directing requests (gets, posts, deletes, etc).
* **Top level routes** are put in `app.js`.

Logic should be in `./backend/controllers/[name].js`.

```python
const Post = require('../models/post');

exports.deletePost = (req, res, next) => {
Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
  .then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'Post deleted!' });
    } else {
      res.status(401).json({ message: 'Not authorized.' });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Failed to delete post!'
    })
  });
}
```
The routes file in `./backend/routes` has the specific gets, puts, posts, deletes, etc. This file should not contain logic, but the specific routes calling specific functions. Authentication can be required by adding the `checkAuth` middleware (after importing) to the route.

```python
const express = require('express');
const PostController = require('../controllers/posts');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.delete('/:id', checkAuth, PostController.deletePost);

module.exports = router;
```

Top level is in `./backend/app.js` specifying that all `/api/[name]` URIs should use the router model in `./backend/routes/`.

```python
const postsRoutes = require('./routes/posts');
app.use('/api/posts', postsRoutes);
```
