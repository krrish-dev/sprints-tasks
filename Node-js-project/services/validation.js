const { z } = require('zod');

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[!@#$%^&*()]/);

module.exports = { emailSchema, passwordSchema };
