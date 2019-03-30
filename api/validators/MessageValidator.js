module.exports = (message) => {
    const errors = [];

    if (message.trim().length < 1) {
        errors.push('Message empty');
    }

    if (message.length > 200) {
        errors.push('Message is long');
    }
    if (errors.length > 0) {
        errors.forEach((err) => {
            throw new Error(err);
        })
    }
};