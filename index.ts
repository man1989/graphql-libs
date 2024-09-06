import { IResolvers } from "@graphql-tools/utils";
import { GraphQLSchema } from "graphql";

import { DatasourceType } from "./libs/datasources";

export abstract class BaseModule {
    protected APP_NAME="base";
    
    constructor(appname: string){
        if(this.APP_NAME === "base" && !appname){
            throw new Error("Please provide your appname or override APP_NAME");
        }
        this.APP_NAME = appname;
    }
    
    abstract getResolvers<TContext = unknown>(): IResolvers<unknown, TContext>;
    
    abstract getSchemaPath(): string
    
    abstract getDirectiveTranformationFunctions(): Array<(schema: GraphQLSchema) => GraphQLSchema>
    
    abstract getContext(): {datasources: DatasourceType}

    getAppname(){
        return this.APP_NAME;
    }
}
