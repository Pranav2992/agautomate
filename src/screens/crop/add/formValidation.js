import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  //Firm Deatils Validation

  SowingDate: Yup.string().required('Sowing date is required'),
  FarmId: Yup.string().required('Farm is required'),
  CropId: Yup.string().required('Crop is required'),
});

export default validationSchema;
