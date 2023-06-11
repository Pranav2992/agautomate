import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Firstname is required'),
  lastName: Yup.string().required('Lastname is required'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a special character')
    .required('Password is required'),
  mobileNumber: Yup.number()  
    .typeError('Mobile number is not valid.')    
    .min(10000, ({min}) => `Mobile number must be more than ${5} characters`)
    .max(999999999999999, ({max}) => `Mobile number must be less than ${15} characters`)     
});

export default validationSchema;
