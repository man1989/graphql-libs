import {
  AugmentedRequest,
  CacheOptions,
  GetRequest,
  RESTDataSource,
} from '@apollo/datasource-rest';

import { KeyValueCache } from '@apollo/utils.keyvaluecache';
import { ZodSchema } from 'zod';

import { InternalServerError } from "../errors";
import { SchemaMapType } from './types';


export class RestDataSourceWithValidation extends RESTDataSource {
  private _schemas: SchemaMapType;
  protected pathPrefix?: string;

  constructor({ schemas, cache }: { schemas: SchemaMapType; cache: KeyValueCache }) {
    super({ cache });
    this._schemas = schemas;
  }

  override resolveURL(path: string, _request: AugmentedRequest<CacheOptions>){
    if (this.baseURL && !this.pathPrefix) {
      const urlObj = new URL(this.baseURL);
      this.baseURL = urlObj.origin;
      this.pathPrefix = urlObj.pathname;
    }
    path = `${this.pathPrefix}${path}`;
    return super.resolveURL(path, _request);
  }

  protected async get<TResult>(
    path: string,
    options?: (GetRequest<CacheOptions> & { schemaType?: string }) | undefined,
  ): Promise<TResult> {
    const data = await super.get<TResult>(path, options);
    if (options?.schemaType) {
      return this._validateData<TResult>(options.schemaType, data);
    }
    return data;
  }

  private _getSchemabyType(schemaType: string): (() => ZodSchema) | void {
    if (this._schemas) {
      return this._schemas[schemaType];
    }
  }

  private async _validateData<T>(schemaType: string, data: T): Promise<T> {
    const schema = this._getSchemabyType(schemaType);
    if (schema) {
      const result = await schema().spa(data);
      if (result.error) {
        throw new InternalServerError('Validation Failed', result.error.format());
      }
      return result.data;
    }
    return data;
  }
}
