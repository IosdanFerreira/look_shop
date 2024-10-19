import { PrismaClientError } from '../errors/types/PrismaClientError';

// Método que verifica se o erro disparado foi um erro vindo do prisma
export const isPrismaError = (e: PrismaClientError) => {
  return (
    typeof e.code === 'string' &&
    typeof e.clientVersion === 'string' &&
    (typeof e.meta === 'undefined' || typeof e.meta === 'object')
  );
};
