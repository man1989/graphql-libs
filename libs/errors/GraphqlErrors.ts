import { GraphQLError } from "graphql"

import {HttpStatusCodeType, HttpStatusCodes, HttpStatusMap} from "./HttpErrorCodes";

export const HttpCodes = HttpStatusCodes;

export class GenericGraphqlError extends GraphQLError {
    constructor(message: string, code: string, statusCode?: number, ...extra: Partial<Array<string | unknown>>) {
        super(message, {
            extensions: {
                code: code,
                statusCode: statusCode,
                ...extra
            }
        })
    }
}

export class HttpError extends GenericGraphqlError {
    constructor(message: string, code: HttpStatusCodeType, ...args: Partial<Array<string | unknown>>){
        super(message, code, HttpStatusMap[code].status, ...args);
    }
}

export class NotFoundError extends HttpError{
    constructor(message: string) {
        super(message, HttpStatusMap.NOT_FOUND.code);
    }
}

export class ForbiddenError extends HttpError{
    constructor(message: string) {
        super(message, HttpStatusMap.FORBIDDEN.code);
    }
}

export class NotAuthorizedError extends HttpError{
    constructor(message: string) {
        super(message, HttpStatusMap.UNAUTHORIZED.code);
    }
}

export class InternalServerError extends HttpError{
    constructor(message: string, reason?: string | unknown) {
        super(message, HttpStatusMap.INTERNAL_SERVER_ERROR.code, reason);
    }
}

export class InputValidationFailed extends HttpError{
    constructor(message: string) {
        super(message, HttpStatusMap.INPUT_VALIDATION_FAILED.code);
    }
}