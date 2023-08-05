import * as Yup from 'yup';

export const validationSchemaForCompany = Yup.object().shape({
  //Firm Deatils Validation 
  firmName: Yup.string().required('Firmname is required'),
  firmRegisterNumber: Yup.number().required('Firm Register Number is required'),
  firmBranchName: Yup.string().required('Firm Branch Name is required'),
  firmOfficeAddress: Yup.string().required('Firm Office Address is required'),
  firmPhoneNumber: Yup.number()
    .required('Firm Phone Number is required')
    .typeError('Firm Phone Number is not valid.')
    .min(10000, ({ min }) => `Firm Phone Number must be more than ${5} characters`)
    .max(999999999999999, ({ max }) => `Firm Phone Number must be less than ${15} characters`),
  firmEmialId: Yup.string()
    .email('Please enter valid Firm Emial Id')
    .required('Firm Email is required'),

  //Personal Deatils Validation
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
  cnfPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords not match!')
    .required('Confirm Password is required'),
  mobileNumber: Yup.number()
    .required('Mobile Number is required')
    .typeError('Mobile number is not valid.')
    .min(10000, ({ min }) => `Mobile number must be more than ${5} characters`)
    .max(999999999999999, ({ max }) => `Mobile number must be less than ${15} characters`)
});

export const validationSchemaForIndividual = Yup.object().shape({
  //Personal Deatils Validation
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
  cnfPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords not match!')
    .required('Confirm Password is required'),
  mobileNumber: Yup.number()
    .required('Mobile Number is required')
    .typeError('Mobile number is not valid.')
    .min(10000, ({ min }) => `Mobile number must be more than ${5} characters`)
    .max(999999999999999, ({ max }) => `Mobile number must be less than ${15} characters`)
});

//export default validationSchema;
