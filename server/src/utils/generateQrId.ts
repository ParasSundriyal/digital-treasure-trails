import { customAlphabet } from 'nanoid';

const nano = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);

export const generateQrId = (roundNumber: number) => {
  return `QR-${roundNumber}-${nano()}`;
};

