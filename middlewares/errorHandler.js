const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV !== 'production') { //NODE_ENV  <----Important: What is it?
      console.log(err.stack);
    }
    res.status(err.statusCode || 500).json({ error: err.message });
  };
  
  export default errorHandler;
  