# Verwende ein Node.js-Image als Basis
FROM node:18

# Arbeitsverzeichnis im Container setzen
WORKDIR /app

# package.json und package-lock.json kopieren
COPY ../package*.json ./

# Abhängigkeiten installieren
RUN npm install

# Den restlichen Code kopieren
COPY .. .

# Expose Port 3000
EXPOSE 3000

# Startbefehl: React-Entwicklungsserver
CMD ["npm", "start"]
