// errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Handle specific error cases
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    // General error response
    res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
