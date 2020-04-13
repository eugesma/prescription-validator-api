import { Router } from 'express';

import { hasPermissionIn } from '../middlewares/roles.middleware';
// interfaces
import { BaseController } from '../interfaces/classes/base-controllers.interface';

// controllers
import roleController from '../controllers/role.controller';
import prescriptionController from '../controllers/prescription.controller';
import patientController from '../controllers/patient.controller';
// import pharmacistController from '../controllers/pharmacist.controller';
// import professionalController from '../controllers/professional.controller';
// import pharmacyController from '../controllers/pharmacy.controller';
import supplyController from '../controllers/supply.controller';

import secretController from '../controllers/secret.controller';
class PrivateRoutes{

  constructor(private router: Router = Router()){}

  public routes(): Router{
    // only requires authentication
    // this.router.get('/secret-path', hasPermissionIn('createAny','video'), secretController.index);

    // this.router.post('/users/:id/assign-role', authController.assignRole);

    // pharmacistRoleMiddleware, professionalRoleMiddleware 2 middlewares, para determinar a que routa tiene accesos el farmaceutico y/o profesional
    // ejemplo:
    // this.router.post('/test', passportMiddlewareJwt, pharmacistRoleMiddleware, testController.tmp);

    // this.router.post('/roles/:id/assign-user', roleController.assignUser);


    this.router.get('/patients/get-by-dni/:dni', patientController.getByDni);
    this.router.get('/prescriptions/get-by-patient-and-date/:patientId&:date', prescriptionController.getByPatientAndDate);
    this.router.get('/prescriptions/get-by-patient-id/:patient_id', prescriptionController.getByPatientId);
    this.router.get('/supplies/get-by-name', supplyController.getByName);



    // roles
    this.router.get(`/roles/`, hasPermissionIn('readAny','role'), roleController.index);
    this.router.post(`/roles/`, hasPermissionIn('createAny','role'), roleController.create);
    this.router.get(`/roles/:id`, hasPermissionIn('readAny','role'), roleController.show);
    this.router.put(`/roles/:id`, hasPermissionIn('updateAny','role'), roleController.update);
    this.router.delete(`/roles/:id`, hasPermissionIn('deleteAny','role'), roleController.delete);

    // prescriptions
    this.router.get(`/prescriptions/`, hasPermissionIn('readAny','prescription'), prescriptionController.index);
    this.router.post(`/prescriptions/`, hasPermissionIn('createAny','prescription'), prescriptionController.create);
    this.router.get(`/prescriptions/:id`, hasPermissionIn('readAny','prescription'), prescriptionController.show);
    this.router.put(`/prescriptions/:id`, hasPermissionIn('updateAny','prescription'), prescriptionController.update);
    // this.router.delete(`/prescriptions/:id`, hasPermissionIn('deleteAny','prescription'), prescriptionController.delete);

    // patients
    this.router.get(`/patients/`, hasPermissionIn('readAny','patient'), patientController.index);
    this.router.post(`/patients/`, hasPermissionIn('createAny','patient'), patientController.create);
    this.router.get(`/patients/:id`, hasPermissionIn('readAny','patient'), patientController.show);
    this.router.put(`/patients/:id`, hasPermissionIn('updateAny','patient'), patientController.update);
    // this.router.delete(`/patients/:id`, hasPermissionIn('deleteAny','patient'), patientController.delete);

    // pharmacist
    // this.router.get(`/pharmacists/`, hasPermissionIn('readAny','patient'), pharmacistController.index);
    // this.router.post(`/pharmacists/`, hasPermissionIn('createAny','patient'), pharmacistController.create);
    // this.router.get(`/pharmacists/:id`, hasPermissionIn('readAny','patient'), pharmacistController.show);
    // this.router.put(`/pharmacists/:id`, hasPermissionIn('updateAny','patient'), pharmacistController.update);
    // this.router.delete(`/pharmacists/:id`, hasPermissionIn('deleteAny','patient'), pharmacistController.delete);

    // pharmacy
    // this.router.get(`/pharmacies/`, hasPermissionIn('readAny','patient'), pharmacyController.index);
    // this.router.post(`/pharmacies/`, hasPermissionIn('createAny','patient'), pharmacyController.create);
    // this.router.get(`/pharmacies/:id`, hasPermissionIn('readAny','patient'), pharmacyController.show);
    // this.router.put(`/pharmacies/:id`, hasPermissionIn('updateAny','patient'), pharmacyController.update);
    // this.router.delete(`/pharmacies/:id`, hasPermissionIn('deleteAny','patient'), pharmacyController.delete);

    // professional
    // this.router.get(`/professionals/`, hasPermissionIn('readAny','patient'), professionalController.index);
    // this.router.post(`/professionals/`, hasPermissionIn('createAny','patient'), professionalController.create);
    // this.router.get(`/professionals/:id`, hasPermissionIn('readAny','patient'), professionalController.show);
    // this.router.put(`/professionals/:id`, hasPermissionIn('updateAny','patient'), professionalController.update);
    // this.router.delete(`/professionals/:id`, hasPermissionIn('deleteAny','patient'), professionalController.delete);

    // supply
    this.router.get(`/supplies/`, hasPermissionIn('readAny','patient'), supplyController.index);
    // this.router.post(`/supplies/`, hasPermissionIn('createAny','patient'), supplyController.create);
    // this.router.get(`/supplies/:id`, hasPermissionIn('readAny','patient'), supplyController.show);
    // this.router.put(`/supplies/:id`, hasPermissionIn('updateAny','patient'), supplyController.update);
    // this.router.delete(`/supplies/:id`, hasPermissionIn('deleteAny','patient'), supplyController.delete);

    return this.router;
  }
}

const privateRoutes: PrivateRoutes = new PrivateRoutes();
export default privateRoutes.routes();