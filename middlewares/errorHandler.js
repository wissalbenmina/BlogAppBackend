function errorHandler(err, req, res, next){
    console.error(err.stack);
    
    if (err instanceof SyntaxError) {
        return res.status(400).json({ error: 'Invalid JSON syntax' });
    } else {
        // For other types of errors, provide a generic error message
        return res.status(500).json({ error: 'Something went wrong!' });
    }
}

module.exports = errorHandler;