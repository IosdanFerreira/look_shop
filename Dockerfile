# Versão do node utilizado no projeto 
FROM node:lts-alpine

# Instala o bash
RUN apk add --no-cache bash / npm install -g @nestjs/cli

# Muda para o usuário root para as próximas operações
USER root

# Copia o arquivo entrypoint.sh para o container
COPY .docker/entrypoint.sh /home/node/app/.docker/entrypoint.sh

# Define as permissões de execução para o entrypoint
RUN chmod +x /home/node/app/.docker/entrypoint.sh

# Define o diretório de trabalho
WORKDIR /home/node/app

# Define o node como usuário do projeto
USER node


