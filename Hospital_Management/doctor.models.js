import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    experienceInYear: {
      type: Number,
      default: 0,
    },

    // Here i am refer some other database schema , which means this workinHospital details get from Hospital , MedicalRecords model
    worksInHospitals: [
      {
        hospitalId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Hospital',
        },
        noHoursWorked: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MedicalRecords',
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Doctor = mongoose.model('Doctor', doctorSchema);
