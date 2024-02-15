const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT * FROM "item";
  `;
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.error("ERROR in Shelf GET:", error);
  });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
  INSERT INTO "item" ("description", "image_url", "user_id")
  VALUES($1, $2, $3);
  `;
  pool.query(queryText, [req.body.description, req.body.image_url, req.body.user_id])
  .then(() => {
    res.sendStatus(201);
  })
  .catch((error) => {
    console.error("ERROR in Shelf POST:", error);
  });
  // endpoint functionality
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const itemId = req.params.id;
  const user_id = req.user.id;
  console.log(user_id);
  const queryText = `
  DELETE FROM "item" WHERE "id" = $1 AND "user_id"=$2;
  `;

  pool.query(queryText, [itemId, user_id])
  .then(() => res.sendStatus(204))
  .catch((error) => {
    console.error("ERROR in Shelf DELETE:", error);
  });

  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
