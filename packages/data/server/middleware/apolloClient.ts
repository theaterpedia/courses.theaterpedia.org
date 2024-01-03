import { createApiClient, MiddlewareConfig } from '@erpgap/odoo-sdk-api-client/server';
import { Queries } from '~/server/queries';
import { Mutations } from '~/server/mutations';

export default defineEventHandler((event) => {

  if (event.method === 'POST') {

    const config : MiddlewareConfig = {
      odooGraphqlUrl: `${process.env.NUXT_PUBLIC_ODOO_BASE_URL}graphql/vsf`,
      queries: { ...Queries, ...Mutations },
      headers: {
        'REAL-IP': getRequestIP(event) || '',
        Cookie: `session_id=${parseCookies(event).session_id}`,
        'resquest-host': getRequestHost(event)
      }
    };

    event.context.apolloClient = createApiClient(config);
  }
});

