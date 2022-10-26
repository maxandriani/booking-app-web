#!/bin/sh

set -e

# docker-nginx procura por scripts de configuração adicionais em /docker-entrypoint.d/*
# Assim podemos converter variáveis de ambiente sem estragar as coisas padrões.
if [ -f "/usr/share/nginx/html/env.js" ]; then
    echo "react environment file found on /usr/share/nginx/html/env.js"
fi
echo "inflating static env.js"
echo "globalThis['__env'] = { 'REACT_APP_API_HOST': '${REACT_APP_API_HOST}' };" > "/usr/share/nginx/html/env.js"

exit 0