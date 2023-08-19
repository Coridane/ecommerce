const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

try {
  const catDat = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(catDat); }
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
try {
  const catDat = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  if (!catDat) {
  res.status(404).json({ message: 'No category includes that ID' });
  return;
  }

  res.status(200).json(catDat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
try {
  const catDat = await Category.create({
    category_name: req.body.category_name,
  });
  res.status(200).json(catDat);
} catch (err) {
  res.status(400).json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
try {
  const catDat = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!catDat) {
    res.status(404).json({ message: 'No category includes that ID' });
    return;
  }
  res.status(200).json(catDat);  
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
try {
  const catDat = await Category.destroy({
    where: {
      id: req.params.id,
    },
    });

    if (!catDat) {
      res.status(404).json({ message: 'No category includes that ID' });
      return;
    }
    res.status(200).json(catDat);  
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
