var express = require('express');
const db = require('../models/index');

var router = express.Router();

router.get('/', async(req, res, next) => {
  let result = await findAllFromBooks();
  res.json(result);
});

router.get('/:id', async(req, res, next) => {
  let result = await findOneFromBooks(req.params['id']);
  res.json(result)
});

router.post('/', async(req, res, next) => {
  let params = req.body;
  await CreateBook(params);
  res.json({messege: "ok"})
})

async function CreateBook(params) {
  const books = await db.Book.create({name: params['name'], genre: params['genre']});
  return books;
}

async function findAllFromBooks() {
  const books = await db.Book.findAll({raw: true});  
  return books;
}

async function findOneFromBooks(id) {
  const book = await db.Book.findAll({
    where: {
      id: id
    },
    raw: true});  
  return book;
}

module.exports = router;
