const { MongooseError } = require("mongoose");

function getMongooseError(error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message);
    //const firstError = Object.values(error.errors)[0].message;
    //return firstError;
    return errors[0];
  }
  
  exports.getErrorMessage = (error) =>{
    switch (error.name) {
      case "Error":
        return error.message;
      case "ValidationError":
        return getMongooseError(error);
      default:
        return error.message;
    }
  
  }