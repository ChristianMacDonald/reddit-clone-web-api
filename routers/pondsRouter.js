const express = require('express');

const { pondsModel: { createPond, deletePondByName, findAllPonds, findPondByName, updatePondByName } } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let ponds = await findAllPonds();
    res.status(200).json(ponds);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get('/:name', async (req, res) => {
  try {
    let { name } = req.params;
    let pond = await findPondByName(name);

    if (pond) {
      res.status(200).json(pond);
    } else {
      res.status(404).json({ message: `Pond with name '${name}' not found` });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: 'No request body provided' });
    } else if (!req.body.name) {
      res.status(400).json({ message: 'No name field provided' });
    } else {
      let [pond] = await createPond(req.body);
      res.status(201).json(pond);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put('/:name', async (req, res) => {
  try {
    let { name } = req.params;
    let [pond] = await updatePondByName(name, req.body);

    if (pond) {
      res.status(200).json(pond);
    } else {
      res.status(404).json({ message: `Pond with name '${name}' not found` });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete('/:name', async (req, res) => {
  try {
    let { name } = req.params;
    let [pond] = await deletePondByName(name);

    if (pond) {
      res.status(200).json(pond);
    } else {
      res.status(404).json({ message: `Pond with name '${name}' not found` });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;