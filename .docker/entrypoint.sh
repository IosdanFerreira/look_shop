#!/bin/bash

npm install
npm run build
npm install prisma -D
npm install @prisma/client
npm run start:dev
