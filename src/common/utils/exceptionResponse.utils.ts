// Função utilitária que retorna um objeto com a estrutura das respostas dos exception filters
export const createErrorResponse = (
  statusCode: number,
  message: string,
  requestUrl?: string,
) => {
  return {
    statusCode,
    message,
    timestamp: new Date().toISOString(),
    path: requestUrl,
  };
};
