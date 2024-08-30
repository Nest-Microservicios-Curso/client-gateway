import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;
  ORDERS_MS_HOST: string;
  ORDERS_MS_PORT: number;
}

const envSchemaValidator = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
    ORDERS_MS_HOST: joi.string().required(),
    ORDERS_MS_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchemaValidator.validate(process.env);

if (error) {
  throw new Error(`Config(.env) has error: \${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  PRODUCTS_MS_HOST: envVars.PRODUCTS_MS_HOST,
  PRODUCTS_MS_PORT: envVars.PRODUCTS_MS_PORT,
  ORDERS_MS_HOST: envVars.ORDERS_MS_HOST,
  ORDERS_MS_PORT: envVars.ORDERS_MS_PORT,
};
