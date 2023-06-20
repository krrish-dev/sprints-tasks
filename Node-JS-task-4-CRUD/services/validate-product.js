import { z } from "zod";

export const validateProduct = (req, res, next) => {
    try {
      const schema = z.object({
        title: z.string(),
        price: z.number(),
        description: z.string(),
        categoryId: z.number(),
        images: z.array(z.string()),
      });
  
      const parsedData = schema.safeParse(req.body);
  
      if (parsedData.success) {
        req.body = parsedData.data;
        next();
      } else {
        const validationErrors = parsedData.error.issues.map(
          (issue) => `Invalid ${issue.path.join(".")} field: ${issue.message}`
        );
        res.status(400).json({ error: "Invalid product data", validationErrors });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  };
  

export const validateProductUpdate = (req, res, next) => {
    try {
      const schema = z.object({
        title: z.string().optional(),
        price: z.number().optional(),
        description: z.string().optional(),
        categoryId: z.number().optional(),
        images: z.array(z.string()).optional(),
      });
  
      const parsedData = schema.safeParse(req.body);
  
      if (parsedData.success) {
        req.body = parsedData.data;
        next();
      } else {
        const validationErrors = parsedData.error.issues.map(
          (issue) => `Invalid ${issue.path.join(".")} field: ${issue.message}`
        );
        res.status(400).json({ error: "Invalid product data", validationErrors });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  };
