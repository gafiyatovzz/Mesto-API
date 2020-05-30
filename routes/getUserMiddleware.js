const fs = require('fs');
const path = require('path');

function getUserMiddleware(req, res, next) {
  return fs.readFile(path.join(__dirname, '../data/users.json'), (e, data) => {
    // eslint-disable-next-line no-underscore-dangle
    const user = JSON.parse(data).find((u) => u._id === req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }

    req.user = user;
    return next();
  });
}

module.exports = getUserMiddleware;
