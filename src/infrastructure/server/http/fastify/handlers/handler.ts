import { RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault, RouteHandlerMethod } from 'fastify';

export type Handler = RouteHandlerMethod<RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression, any>;
