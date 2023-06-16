import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter valid email address.')
        .required('Email is required.'),
    password: Yup.string().required('Password is required.'),
});

export const validationSchemaRecover = Yup.object().shape({
    recoverEmailAddress: Yup.string()
        .email('Please enter valid email address.')
        .required('Email is required.'),
});


export const validationSchemaUpdatePassword = Yup.object().shape({
    currentPassword: Yup.string().required('Temporary Password is required.'),
    newPassword: Yup.string()
        // .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
        // .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
        // .matches(/\d/, 'Password must have a number')
        .min(8, ({ min }) => `${'Password must be at least'} ${min} ${'characters'}`)
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a special character')
        .required('Password is required.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], "Passwords don't match!")
        .required('Confirm Password is required'),
});


