import React from 'react'

const register_validate  = (values) => {

    const errors ={};
    if (!values.name) {
        errors.name = 'name is required';
      } else if (!/^[a-zA-Z0-9_]+$/.test(values.name)) {
        errors.name = 'name can only contain letters, numbers, and underscores';
      }
      
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'Password should be between 8 and 20 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character';
      } else if (/\s/.test(values.password)) {
        errors.password = 'Password cannot contain spaces';
      }
      
      if (!values.cpassword) {
        errors.cpassword = 'Confirm password is required';
      } else if (values.cpassword !== values.password) {
        errors.cpassword = 'Passwords do not match';
      }
      

  return errors
}

export default register_validate 
