import { IResolvers } from "@graphql-tools/utils";
import { GraphQLSchema } from "graphql";

import { DatasourceType } from "./libs/datasources";

export abstract class SubgraphBase {
    protected appname: string = "base";
    
    constructor(appname: string){
        if(this.appname === "base" && !appname){
            throw new Error("Please provide your appname or override \"name\" property");
        }
        this.appname = appname;
    }
    
    abstract getResolvers<TContext = unknown>(): IResolvers<unknown, TContext>;
    
    abstract getSchemaPath(): string
    
    abstract getDirectiveTranformationFunctions(): Array<(schema: GraphQLSchema) => GraphQLSchema>
    
    abstract getContext(): {datasources: DatasourceType}

    getAppname(){
        return this.appname;
    }
}
