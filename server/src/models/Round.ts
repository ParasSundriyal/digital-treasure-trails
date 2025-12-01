import { Schema, model } from 'mongoose';

export type RoundDocument = {
  roundNumber: number;
  clueText: string;
  description?: string;
  hint?: string;
  unlockCode: string;
  qrId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const roundSchema = new Schema<RoundDocument>(
  {
    roundNumber: { type: Number, required: true, unique: true },
    clueText: { type: String, required: true },
    description: { type: String },
    hint: { type: String },
    unlockCode: { type: String, required: true },
    qrId: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Round = model<RoundDocument>('Round', roundSchema);

