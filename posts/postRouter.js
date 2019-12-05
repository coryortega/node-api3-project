const express = require('express');

const Posts = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  });
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the post',
    });
  });
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The post has been removed' });
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post',
    });
  });
});

router.put('/:id', (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the post',
    });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  Posts.getById(req.params.id)
  .then(post => {
    if (post) {
      req.user = user
    } else {
      res.status(400).json({ errorMessage: 'invalid post ID' })
    }
  })
 next();
}

module.exports = router;
