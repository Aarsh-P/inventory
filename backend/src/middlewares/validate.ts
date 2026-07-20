import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema, ValidationError } from 'yup';

/**
 * Returns an Express middleware that validates `req.body` against the
 * provided Yup schema. Sends a 400 JSON response on failure.
 */
export const validate =
  (schema: AnyObjectSchema) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
        next();
      } catch (error) {
        if (error instanceof ValidationError) {
          res.status(400).json({
            message: 'Validation failed',
            errors: error.errors,
          });
          return;
        }
        next(error);
      }
    };
