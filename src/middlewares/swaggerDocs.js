import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

import { SWAGGER_PATH } from '../constans/constans.js';

export const swaggerDocs = () => {
  try {
    const swaggerDocument = JSON.parse(
      fs.readFileSync(SWAGGER_PATH).toString(),
    );
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDocument)];
  } catch (error) {
    return (req, res, next) =>
      next(createHttpError(500, 'Cannot load Swagger documentation'));
  }
};
