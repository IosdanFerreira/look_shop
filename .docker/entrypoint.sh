#!/bin/bash

npm install
npm run build
npm install prisma -D
npm run start:dev