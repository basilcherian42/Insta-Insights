import React from 'react'

const login_validate = (values) => {

    const errors ={};

    if (!values.email) {
        errors.email = 'email Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      //validation for password
//     if (!values.password) {
//   errors.password = "Password is required";
// } else if (values.password.length < 8 || values.password.length > 20) {
//   errors.password = "Password should be between 8 and 20 characters";
// } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(values.password)) {
//   errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
// } else if (/\s/.test(values.password)) {
//   errors.password = "Password cannot contain spaces";
// }

  return errors;
}

export default login_validate 