const errorHandlermiddlewares = (err, req, res, next) => {
    
  // Checking Duplicae Key Error
  if (err.code == "11000") {
    const collection = err.message
      .split(" ")[5]
      .split(".")[1]
      .slice(0, -1)
      .toUpperCase();
    const key = Object.keys(err.keyPattern)[0];
    const error = {
      param: key,
      message: `${collection} with this ${key} Already Exists`,
      code: "RESOURCE_EXISTS",
    };
    return res.json(error);
  }

  // Formatting Mongoose Inbuilt Validation Errors
  if (err.name === "ValidationError") {
    const mongooseCustomErrors = [];
    for (field in err.errors)
      mongooseCustomErrors.push(err.errors[field].message);
   return res.status(403).json({ message: mongooseCustomErrors[0] });
  }
  res.status(400).json(err);
};

module.exports = errorHandlermiddlewares;
