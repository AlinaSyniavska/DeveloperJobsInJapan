module.exports = {
    PORT: process.env.PORT || 5001,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/DeveloperJobsInJapan',
    FORGOT_PASS_ACTION_SECRET: process.env.FORGOT_PASS_ACTION_SECRET || 'fgt_pass',
    AUTHORIZATION: process.env.AUTHORIZATION,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@email.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '1234567890',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',
};
