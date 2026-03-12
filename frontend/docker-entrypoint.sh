#!/bin/sh
# Substitui apenas a variável API_KEY no template do nginx
envsubst '${API_KEY}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
