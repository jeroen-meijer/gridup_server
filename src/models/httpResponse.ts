type SuccessHttpResponse = { success: true; message?: string };
type FailureHttpResponse = { success: false; message: string };
type HttpResponsePayload<T = unknown> = { payload?: T };

export type HttpResponse<T = unknown> = HttpResponsePayload<T> & (SuccessHttpResponse | FailureHttpResponse);

export type HttpRequestBody<T = unknown> = T | undefined;
