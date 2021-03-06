// flow-typed signature: 357498ce72c46993321252dfe372e703
// flow-typed version: <<STUB>>/negotiator_v^0.6.1/flow_v0.63.1

/**
 * This is an autogenerated libdef stub for:
 *
 *   'negotiator'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare module 'negotiator' {
  import type {IncomingMessage} from 'http';
  declare class Negotiator {
    constructor(IncomingMessage): void;
    mediaType(?Array<string>): string;
    mediaTypes(?Array<string>): Array<string>;
    language(?Array<string>): string;
    languages(?Array<string>): Array<string>;
    charset(?Array<string>): string;
    charsets(?Array<string>): Array<string>;
    encoding(?Array<string>): string;
    encodings(?Array<string>): Array<string>;
  }
  declare module.exports: Class<Negotiator>;
}
