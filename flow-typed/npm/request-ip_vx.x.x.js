// flow-typed signature: 5389839af5be43f5d1576bbd8a39b090
// flow-typed version: <<STUB>>/request-ip_v2.1.1/flow_v0.70.0

/**
 * This is an autogenerated libdef stub for:
 *
 *   'request-ip'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare module 'request-ip' {
  import type {IncomingMessage} from 'http';
  declare export function getClientIp(req: IncomingMessage): string;
}
