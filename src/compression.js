// @flow
import compression from 'compression';
import middleware from './middleware';

import type {AppCreator} from './types';

type Filter = (req: *, res: *) => boolean;

type Options = {
  chunkSize?: number,
  filter?: Filter,
  level?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  memLevel?: number,
  strategy?: number,
  threshold?: string | number | false,
  windowBits?: number,
}

/**
 * Compress the response sent back to the client.
 * @param {?Object} options Compression options.
 * @returns {Function} App creator.
 */
export default (options: ?Options): AppCreator =>
  middleware(compression(options));
