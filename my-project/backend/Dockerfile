# Use imagem oficial do Node.js
FROM node:20

# Crie diretório de trabalho
WORKDIR /app

# Copie os arquivos
COPY package*.json ./

# Instale dependências
RUN npm install

# Copie o restante
COPY . .

# Exponha a porta usada pelo Express
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]
