import Raven from 'raven-js';
import { ENV, SENTRY_KEY } from 'settings';

let ravenSetup = false;

if (SENTRY_KEY) {
  console.log(`Monitoramento de erros ativado - ${ENV}`);
  Raven
    .config(SENTRY_KEY, {
      environment: ENV
    })
    .install();

  Raven.setShouldSendCallback(() => {
    let err: any = Raven.lastException();
    if (!err || err.ignoreLog || err.reported) return false;

    err.reported = true;
    return true;
  });

  ravenSetup = true;
}

export function addBreadcrumb(message: string, category: string = 'manual', data: any = {}): void {
  data = data || {};
  delete data.type;

  ravenSetup && Raven.captureBreadcrumb({ message, category, data });
}

export function logError(err: any, force: boolean = false): void {
  ravenSetup && Raven.captureException(err, { extra: err.extraData });
  let error = (err && err.data && err.data.message) ? err.data.message.error : null;
  if (error) {
    for (let prop in error) {
      error = error[prop];
    }
  }
  throw error ? error : 'Desculpe, ocorreu um erro não identificado';
}

export function logComponentError(err: any): void {
  ravenSetup && Raven.captureException(err, { extra: err.extraData });
  console.log(err);
  if (ENV === 'production')
    window.location.href = '/error';
}