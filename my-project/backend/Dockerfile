FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Instala netcat (nc) necessário para o wait-for-db.sh
RUN apt-get update && apt-get install -y netcat-openbsd

COPY wait-for-db.sh ./wait-for-db.sh
RUN chmod +x ./wait-for-db.sh

EXPOSE 3000

CMD ["./wait-for-db.sh"]
