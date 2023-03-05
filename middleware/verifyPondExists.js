let { pondsModel: { findPondByName } } = require('../models');

async function verifyPondExists(req, res, next) {
  try {
    let { name } = req.params;

    let pond = await findPondByName(name);

    if (!pond) {
      res.status(404).json({ message: `Pond with name '${name}' not found` });
      return;
    }

    req.pond = pond;

    next();
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = verifyPondExists;