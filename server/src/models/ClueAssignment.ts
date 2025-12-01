import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const clueAssignmentSchema = new Schema(
  {
    roundNumber: { type: Number, required: true },
    clueText: { type: String, required: true },
    description: { type: String },
    hint: { type: String },
    unlockCode: { type: String, required: true, unique: true },
    qrId: { type: String, required: true, unique: true },
    teamIds: { type: [Types.ObjectId], ref: 'Team', required: true },
    timeLimitSeconds: { type: Number, required: true }, // max allowed time from QR scan to unlock
  },
  { timestamps: true },
);

export type ClueAssignmentDocument = InferSchemaType<typeof clueAssignmentSchema>;

export const ClueAssignment = model<ClueAssignmentDocument>('ClueAssignment', clueAssignmentSchema);


