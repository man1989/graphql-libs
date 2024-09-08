export const HttpStatusMap = {
    OK: { code: "OK", status: 200 },
    CREATED: { code: "CREATED", status: 201 },
    ACCEPTED: { code: "ACCEPTED", status: 202 },
    NON_AUTHORITATIVE_INFORMATION: { code: "NON_AUTHORITATIVE_INFORMATION", status: 203 },
    NO_CONTENT: { code: "NO_CONTENT", status: 204 },
    RESET_CONTENT: { code: "RESET_CONTENT", status: 205 },
    PARTIAL_CONTENT: { code: "PARTIAL_CONTENT", status: 206 },
    MULTI_STATUS: { code: "MULTI_STATUS", status: 207 },
    IM_USED: { code: "IM_USED", status: 226 },

    BAD_REQUEST: { code: "BAD_REQUEST", status: 400 },
    UNAUTHORIZED: { code: "UNAUTHORIZED", status: 401 },
    PAYMENT_REQUIRED: { code: "PAYMENT_REQUIRED", status: 402 },
    FORBIDDEN: { code: "FORBIDDEN", status: 403 },
    NOT_FOUND: { code: "NOT_FOUND", status: 404 },
    METHOD_NOT_ALLOWED: { code: "METHOD_NOT_ALLOWED", status: 405 },
    NOT_ACCEPTABLE: { code: "NOT_ACCEPTABLE", status: 406 },
    PROXY_AUTHENTICATION_REQUIRED: { code: "PROXY_AUTHENTICATION_REQUIRED", status: 407 },
    REQUEST_TIMEOUT: { code: "REQUEST_TIMEOUT", status: 408 },
    CONFLICT: { code: "CONFLICT", status: 409 },
    GONE: { code: "GONE", status: 410 },
    LENGTH_REQUIRED: { code: "LENGTH_REQUIRED", status: 411 },
    PRECONDITION_FAILED: { code: "PRECONDITION_FAILED", status: 412 },
    PAYLOAD_TOO_LARGE: { code: "PAYLOAD_TOO_LARGE", status: 413 },
    URI_TOO_LONG: { code: "URI_TOO_LONG", status: 414 },
    UNSUPPORTED_MEDIA_TYPE: { code: "UNSUPPORTED_MEDIA_TYPE", status: 415 },
    RANGE_NOT_SATISFIABLE: { code: "RANGE_NOT_SATISFIABLE", status: 416 },
    EXPECTATION_FAILED: { code: "EXPECTATION_FAILED", status: 417 },
    IM_A_TEAPOT: { code: "IM_A_TEAPOT", status: 418 },
    MISDIRECTED_REQUEST: { code: "MISDIRECTED_REQUEST", status: 421 },
    UNPROCESSABLE_ENTITY: { code: "UNPROCESSABLE_ENTITY", status: 422 },
    LOCKED: { code: "LOCKED", status: 423 },
    FAILED_DEPENDENCY: { code: "FAILED_DEPENDENCY", status: 424 },
    TOO_EARLY: { code: "TOO_EARLY", status: 425 },
    UPGRADE_REQUIRED: { code: "UPGRADE_REQUIRED", status: 426 },
    PRECONDITION_REQUIRED: { code: "PRECONDITION_REQUIRED", status: 428 },
    TOO_MANY_REQUESTS: { code: "TOO_MANY_REQUESTS", status: 429 },
    REQUEST_HEADER_FIELDS_TOO_LARGE: { code: "REQUEST_HEADER_FIELDS_TOO_LARGE", status: 431 },
    UNAVAILABLE_FOR_LEGAL_REASONS: { code: "UNAVAILABLE_FOR_LEGAL_REASONS", status: 451 },

    INTERNAL_SERVER_ERROR: { code: "INTERNAL_SERVER_ERROR", status: 500 },
    NOT_IMPLEMENTED: { code: "NOT_IMPLEMENTED", status: 501 },
    BAD_GATEWAY: { code: "BAD_GATEWAY", status: 502 },
    SERVICE_UNAVAILABLE: { code: "SERVICE_UNAVAILABLE", status: 503 },
    GATEWAY_TIMEOUT: { code: "GATEWAY_TIMEOUT", status: 504 },
    HTTP_VERSION_NOT_SUPPORTED: { code: "HTTP_VERSION_NOT_SUPPORTED", status: 505 },
    VARIANT_ALSO_NEGOTIATES: { code: "VARIANT_ALSO_NEGOTIATES", status: 506 },
    INSUFFICIENT_STORAGE: { code: "INSUFFICIENT_STORAGE", status: 507 },
    LOOP_DETECTED: { code: "LOOP_DETECTED", status: 508 },
    NOT_EXTENDED: { code: "NOT_EXTENDED", status: 510 },
    NETWORK_AUTHENTICATION_REQUIRED: { code: "NETWORK_AUTHENTICATION_REQUIRED", status: 511 },

    // Redirection responses
    MOVED_PERMANENTLY: { code: "MOVED_PERMANENTLY", status: 301 },
    FOUND: { code: "FOUND", status: 302 },
    SEE_OTHER: { code: "SEE_OTHER", status: 303 },
    NOT_MODIFIED: { code: "NOT_MODIFIED", status: 304 },
    USE_PROXY: { code: "USE_PROXY", status: 305 },
    TEMPORARY_REDIRECT: { code: "TEMPORARY_REDIRECT", status: 307 },
    PERMANENT_REDIRECT: { code: "PERMANENT_REDIRECT", status: 308 },
    INPUT_VALIDATION_FAILED: { code: "INPUT_VALIDATION_FAILED", status: 400 },
} as const;

export type HttpStatusCodeType = keyof typeof HttpStatusMap

const HttpStatusCodeKeys: Array<HttpStatusCodeType> = Object.keys(HttpStatusMap) as Array<HttpStatusCodeType>;

type HttpStatusCodesType = {
    [key in HttpStatusCodeType]: HttpStatusCodeType
}

export const HttpStatusCodes = Object.freeze(HttpStatusCodeKeys.reduce((acc, k) => {
    acc[k] = k
    return acc;
}, {} as HttpStatusCodesType));

