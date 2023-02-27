function validate() {
  return (req, res, next) => {
    let requiredFields = [...arguments]
    let missingFields = requiredFields.filter(field => !(field in req.body));
  
    if (missingFields.length > 0) {
      let message = 'No';
  
      for (let i = 0; i < missingFields.length; i++) {
        if (i != 0) {
          if (i == missingFields.length - 1) {
            if (i != 1) {
              message += ','
            }
            
            message += ' or'
          } else {
            message += ',';
          }
        }
  
        message += ' ' + missingFields[i];
      }
  
      message += ' field'
      
      if (missingFields.length > 1) {
        message += 's'
      }
  
      message += ' provided'
  
      res.status(400).json({ message });
  
      return;
    }
  
    next();
  }
}

module.exports = validate;