import mongoose from 'mongoose';

const medicalRecordsSchema = new mongoose.Schema(
  {
    hoursWorked: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const MedicalRecords = mongoose.model(
  'MedicalRecords',
  medicalRecordsSchema
);
