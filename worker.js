export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/config.js') {
      const key = env.WEB3FORMS_ACCESS_KEY?.trim() || '';
      const body = `window.PORTFOLIO_CONFIG = {\n  web3formsAccessKey: ${JSON.stringify(key)}\n};\n`;

      return new Response(body, {
        headers: {
          'content-type': 'application/javascript; charset=utf-8',
          'cache-control': 'no-store',
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
