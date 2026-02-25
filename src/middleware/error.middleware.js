export  const notFound = (req, res) => {
  res.status(404).json({ message : `Route not found : ${req.originalUrl}`})
}

export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message : err.message || "Internal Server Error"
  })
}