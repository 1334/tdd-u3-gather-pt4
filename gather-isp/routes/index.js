const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

router.get('/items/create', async (req, res, next) => {
  res.render('create');
});

router.get('/items/:id', async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  res.render('show', {item});
});

router.get('/items/:id/edit', async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  res.render('edit', {item});
});

router.post('/items/:id/update', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const params = req.body
  const item = await Item.findByIdAndUpdate(req.params.id, { title, description, imageUrl });
  item.validateSync();
  if (item.errors) {
    res.status(400).render('edit', {item: item});
  } else {
    await item.save();
    res.redirect('/');
  }
});

router.post('/items/create', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const newItem = new Item({title, description, imageUrl});
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', {newItem: newItem});
  } else {
    await newItem.save();
    res.redirect('/');
  }
});

router.post('/items/:id/delete', async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  item.remove();

  res.redirect('/');
});

module.exports = router;
