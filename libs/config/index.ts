import dotenv from "dotenv";
import { readFileSync } from "node:fs";
import path from 'node:path';
import { RecordType, SomeZodObject, z } from 'zod';
import { JSONParseError } from "../errors";

if (process.env.CONFIG_PATH && !path.isAbsolute(process.env.CONFIG_PATH)) {
    throw new Error(`CONFIG_PATH needs to be an absolute path`);
}

if (process.env.DOT_ENV_PATH && !path.isAbsolute(process.env.DOT_ENV_PATH)) {
    throw new Error(`DOT_ENV_PATH needs to be an absolute path`);
}

if (process.env.DOT_ENV_PATH) {
    dotenv.config({ path: process.env.DOT_ENV_PATH });
}

const DefaultSchema = z.object({
    publicKey: z.string()
});

type ConfigType = z.infer<typeof DefaultSchema>;

type GenericConfigType = RecordType<string, string | number>

export type BaseOptionsType = {
    schema?: SomeZodObject,
    dotEnvPath?: string
}

export class BaseConfig {

    private defaultConfig?: Record<string, string | number | {}> = {};
    private Schema: SomeZodObject = DefaultSchema;
    private _config?: ConfigType;

    constructor(options?: BaseOptionsType) {
        if(options){
            if(options.schema){
                this.Schema = this.Schema.extend(options.schema.shape);
            }
    
            if (options.dotEnvPath && !path.isAbsolute(options.dotEnvPath)) {
                throw Error("dotEnvPath needs to be an absolute path")
            }else if(options.dotEnvPath){
                console.log(options.dotEnvPath);
                dotenv.config({ path: options.dotEnvPath });
            }
        }
    }

    getConfig<T extends GenericConfigType>() {
        if (!this._config) {
            this._config = this.getParsedConfig<T>();
        }
        return this._config as (T & ConfigType);
    }

    private parse<T extends GenericConfigType>(configData: GenericConfigType): T & ConfigType{
        try {
            const result = this.Schema.safeParse(configData);
            if (result.error) {
                throw result.error.format();
            }
            return result.data as T & ConfigType
        } catch (err) {
            throw err;
        }
    }

    private getParsedConfig<T extends GenericConfigType>(): T & ConfigType {
        let extendedConfigData: GenericConfigType | {} = { ...this.defaultConfig, ...process.env };
        if (process.env.CONFIG_PATH) {
            try {
                const configString = readFileSync(process.env.CONFIG_PATH, "utf-8"); 
                const configJSON = JSON.parse(configString);
                extendedConfigData = { ...extendedConfigData, ...configJSON };
                return this.parse<T>(extendedConfigData);
            } catch (err) {
                if (err instanceof SyntaxError) {
                    throw new JSONParseError(err.message, { cause: err.cause })
                }
                throw err;
            }
        }
        return this.parse<T>(extendedConfigData);
    }
}