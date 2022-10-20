#!/bin/sh
# docker-nginx procura por scripts de configuração adicionais em /docker-entrypoint.d/*
# Assim podemos converter variáveis de ambiente sem estragar as coisas padrões.

echo "globalThis['__env'] = { \
'REACT_APP_API_HOST': '${REACT_APP_API_HOST}' \
};" > /usr/share/nginx/html/env.js
