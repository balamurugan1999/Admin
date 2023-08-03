import React from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import swal from 'sweetalert'

const defaultTheme = createTheme();
export default function Login(props) {

    const navigate = useNavigate()
    let Auth = false
    let setAuth = props.auth
    let res
    let username
    let password

    const initialValues = {
        username: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('* Please enter the username'),
        password: Yup.string().required('* Please enter the password')
    })

    const onSubmit = async (onSubmitProps) => {

        username = onSubmitProps.username
        password = onSubmitProps.password
        try {

            res = await axios.post('http://localhost:5000/api/login', {
                username, password
            })
        }
        catch (error) {
            console.log(error)
        }
        if (res.data === "invalid") {
            Auth = false
            setAuth(false)
        }
        else {
            sessionStorage.setItem('tokenValue', res.data)
            Auth = true
            localStorage.setItem('Auth', false)
            setAuth(true)

        }
        if (Auth) {
            navigate("/home")
            setTimeout(() => {
                sessionStorage.removeItem('tokenValue')
                Auth = false
                setAuth(false)
                swal({
                    title: "Session Expired",
                    icon: "error",
                    button: "OK"
                })
                localStorage.setItem('Auth', false)
                navigate("/")
            }, 1200000);

        }
        else {
            swal({
                title: "UnAuthorized access",
                icon: "error",
                button: "OK"
            })
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={formik.handleSubmit} >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={formik.handleChange}
                        />
                        {formik.touched.username && formik.errors.username && <span className='text-danger' style={{ fontSize: '0.9em' }}>{formik.errors.username}</span>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={formik.handleChange}
                        />
                        {formik.touched.password && formik.errors.password && <span className='text-danger' style={{ fontSize: '0.9em' }}>{formik.errors.password}</span>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}