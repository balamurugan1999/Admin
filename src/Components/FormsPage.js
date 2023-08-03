import React, { useEffect } from 'react'
import NavigationBar from './NavigationBar'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'
import { Card, CardContent, TextField, CardActions } from '@mui/material'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'

function Forms() {
  
  const navigate = useNavigate()

  useEffect(()=>{
    if (localStorage.getItem('Auth')==='true') {
      setTimeout(() => {
          //alert('Session expired')
          swal({
            title: "Session expired",
            icon: "error",
            button: "OK"
        })
          localStorage.setItem('Auth',false)
          navigate("/")
      }, 1200000);
    }
    },)
    
    const initialValues = {
      name: '',
      city: '',
      phnno :'',
      emailid:'',
      password:'',
  }
  const getCharacterValidationError = (str) => {
    return `*Your password must have at least 1 ${str} character`;
  };
  
  const validationSchema = Yup.object().shape({
      name: Yup.string().required('* Please enter the Name'),
      city: Yup.string().required('* Please enter the City'),
      phnno:Yup.string().required('*Please enter Phone no').min(10,"*Invalid phone no").max(10,"*Invalid phone no").matches(/[0-9]/,"*Invalid phone no"),
      emailid:Yup.string().required("*Please enter Email Id").matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,"*Invalid Email Id"),
      password:Yup.string().required("*Please enter a password")
      .min(8, "Password must have at least 8 characters")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase"))

  })

  const onSubmit = (onSubmitProps) => {
      swal({
          title: "Submitted successfully",
          icon: "success",
          button: "OK"
      })
  }
  const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit
  })

  return (
    <div>
        <NavigationBar></NavigationBar>
        <br/>
        <div className='container'>
            <div className='row justify-content-center row align-items-end' style={{ margin: '0px' }}>
                <div className='col col-sm-4' style={{ padding: '0' }}>
                    <Card style={{ boxShadow: '1em 1em 1em grey', borderStyle: 'solid', borderColor: 'whitesmoke' }}>
                      <br/>
                        <h1 style={{ paddingLeft: '20vh' }}>Form</h1>
                        <CardContent>
                            <form onSubmit={formik.handleSubmit}>
                                <Form.Group>
                                    <TextField label='Name' variant='outlined' name='name' onChange={formik.handleChange} fullWidth={true}/><br />
                                    {formik.touched.name && formik.errors.name && <span className='text-danger' style={{ fontSize: '0.9em' }}>{formik.errors.name}</span>}<br />

                                    <TextField label='City' variant='outlined' name='city' onChange={formik.handleChange} fullWidth={true} /><br />
                                    {formik.touched.city && formik.errors.city && <span className='text-danger' style={{ fontSize: '0.9em' }}>{formik.errors.city}</span>}<br />

                                    <TextField label='Phone No' variant='outlined' name='phnno' onChange={formik.handleChange} fullWidth={true}/><br />
                                    {formik.touched.phnno && formik.errors.phnno && <span className='text-danger' style={{ fontSize: '0.9em' }}>{formik.errors.phnno}</span>}<br />

                                    <TextField label='Email Id' variant='outlined' name='emailid' onChange={formik.handleChange} fullWidth={true}/><br />
                                    {formik.touched.emailid && formik.errors.emailid && <span className='text-danger' style={{ fontSize: '0.9em' }}>{formik.errors.emailid}</span>}<br />

                                    <TextField label='Create Password' variant='outlined' name='password' onChange={formik.handleChange} fullWidth={true}/><br />
                                    {formik.touched.password && formik.errors.password && <span className='text-danger' style={{ fontSize: '0.9em' }}>{formik.errors.password}</span>}<br />

                                    <CardActions>
                                        <Button type='submit' variant='contained' color='success' style={{marginLeft:'21vh'}}>Submit</Button>
                                    </CardActions>
                                </Form.Group>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Forms
