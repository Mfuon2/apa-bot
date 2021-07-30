import Logger from '../lib/logger';

const info = (msg: any) => {
  Logger.info(`INFO : ${msg}`);
};

const warn = (msg: any) => {
  Logger.warn(`WARN : ${msg}`);
};
const debug = (msg: any) => {
  Logger.debug(`DEBUG : ${msg}`);
};
const error = (msg: any) => {
  Logger.error(`ERROR : ${msg}`);
};

export { info, warn, debug, error };
