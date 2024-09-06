
import { ZodSchema } from 'zod';
import { KeyValueCache } from '@apollo/utils.keyvaluecache';

import { RestDataSourceWithValidation } from "./RestDataSourceWithValidation";

type COptionType = {
    cache: KeyValueCache,
    [key: string]: unknown
}

type Scope = "read"| "write" | "trust";

export type SchemaMapType = {
    [key: string]: () => ZodSchema;
};
 
export type ConstructorType<T> = new (options: COptionType) => T

export interface BaseToken{
  companyid: string
  scope: Scope[]
  exp: number
  tokenType: string
  jti: string
  client_id: string
}

export interface UserToken extends BaseToken{
  userGUID: string
  user_name: string
  roles: string[]
  usertype: string
  isTemporary: boolean
  userid: string
  authenticationMethod: string
  personId: string
  id: string
  status: string
}

export interface ClientToken extends BaseToken{
  authorities: string[]
}

export type Token = UserToken | ClientToken;

export type DatasourceType = {
  [key: string]: ConstructorType<RestDataSourceWithValidation>
}

export interface ContextValue {
  datasources: { [key: string]: RestDataSourceWithValidation };
  headers?: Record<string, string>;
  userInfo: Token
}
  
  