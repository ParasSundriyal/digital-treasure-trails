export const httpError = (statusCode: number, message: string) => {
  const error = new Error(message);
  // @ts-expect-error augment
  error.statusCode = statusCode;
  return error;
};

