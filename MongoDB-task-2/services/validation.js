const { z } = require('zod');

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

module.exports = {
  userSchema,
};