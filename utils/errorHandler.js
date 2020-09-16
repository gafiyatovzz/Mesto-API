module.exports = (res, error) => {
  if (error.name === 'CastError') {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
  if (error.name === 'MongoError') {
    res.status(409).json({
      success: false,
      message: 'Пользователь существует!',
    });
  }
  if (error.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  if (error.name === 'Error') {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
