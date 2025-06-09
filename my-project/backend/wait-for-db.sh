#!/bin/sh

echo "Aguardando o banco de dados MySQL ficar pronto..."

# Faz checagem contínua se a porta 3306 do serviço 'db' está respondendo
until nc -z db 3306; do
  sleep 2
done

echo "Banco de dados está pronto. Iniciando o servidor..."

# Inicia o backend
npm start
