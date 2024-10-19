import { DatabaseError } from '../errors/types/DatabaseError';
import { PrismaClientError } from '../errors/types/PrismaClientError';
import { UniqueConstraintError } from '../errors/types/UniqueConstraintError';

// Enum que deve armazenar todos os tipos de erro Prisma que serão observados na aplicação
enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
}

// Método que define qual exceção vai ser disparada dependendo do código do erro Prisma
export const handleDatabaseErrors = (e: PrismaClientError) => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    default:
      return new DatabaseError(e.message);
  }
};
