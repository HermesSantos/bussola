FROM node:20

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas package.json e package-lock.json primeiro (cache de dependências)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do Vite
EXPOSE 5173

# Comando padrão (modo dev)
CMD ["npm", "run", "dev", "--", "--host"]
