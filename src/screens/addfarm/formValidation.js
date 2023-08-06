import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  //Firm Deatils Validation 
  farmName: Yup.string().required('Firmname is required'),
  farmerName: Yup.string().required('Farmer name is required'),
  /* latitudeCoordiante1: Yup.number().required('Coordinate 1 latitude required'),
  longitudeCoordiante1: Yup.number().required('Coordinate 1 longitude required'),
  latitudeCoordiante2: Yup.number().required('Coordinate 2 latitude required'),
  longitudeCoordiante2: Yup.number().required('Coordinate 2 longitude required'),
  latitudeCoordiante3: Yup.number().required('Coordinate 3 latitude required'),
  longitudeCoordiante3: Yup.number().required('Coordinate 3 longitude required'),
  latitudeCoordiante4: Yup.number().required('Coordinate 4 latitude required'),
  longitudeCoordiante4: Yup.number().required('Coordinate 4 longitude required'),
  latitudeCoordiante5: Yup.number().required('Coordinate 5 latitude required'),
  longitudeCoordiante5: Yup.number().required('Coordinate 5 longitude required') */
});

export default validationSchema;
