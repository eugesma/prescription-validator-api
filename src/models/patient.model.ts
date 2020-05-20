import { Schema, Model, model } from 'mongoose';
import IPatient from '../interfaces/patient.interface';

// Schema
export const patientSchema = new Schema({
  dni: {
    type: String,
    required: '{PATH} is required'
  },
  lastName: {
    type: String,
    required: '{PATH} is required'
  },
  firstName: {
    type: String,
    required: '{PATH} is required'
  },
  sex: {
    type: String,
    enum: ['Femenino', 'Masculino', 'Otro'],
    required: '{PATH} is required'
  },
  status: {
    type: String,
    enum: ['Validado', 'Temporal'],
    required: '{PATH} is required'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
});

// Model
const Patient: Model<IPatient> = model<IPatient>('Patient', patientSchema);

Patient.schema.method('findOrCreate', async function(patientParam: IPatient): Promise<IPatient>{
  try{
    let patient: IPatient | null = await Patient.findOne({ dni: patientParam.dni});
    if(!patient){
      patient = new Patient(patientParam);
      await patient.save();
    }
    return patient;
  } catch(err){
    throw new Error(err);
  }
});

export default Patient;
