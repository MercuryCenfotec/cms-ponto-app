import './style.css';
import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Typography,
    CardActions,
    CardContent,
    Card,
    Button,
    makeStyles,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import useUserByEmail from '../../hooks/useUserByEmail';
import Snackbar from '../../components/Snackbar/Snackbar.js';

const useGeneralStyles = makeStyles({
    photo: {
        backgroundImage: `url("https://res.cloudinary.com/zerodevcorp/image/upload/v1587680997/sidebar-2_uaffa2.jpg")`,
        backgroundSize: 'cover',
        height: '100vh',
    },
    photoInfo: {
        height: 100,
    },
    welcome: {
        color: '#fff',
        textShadow: '0px 0px 10px #000000',
    },
    signIn: {
        color: '#fff',
        textShadow: '0px 0px 10px #000000',
        height: 180,
    },
    button: {
        textTransform: 'none',
        background: '#942BAE',
        color: '#fff',
        '&:hover': {
            background: '#BF73CC',
        },
    },
    form: { maxWidth: 400 },
});

function Login({ history }) {
    const classes = useGeneralStyles();
    const [openToast, setOpenToast] = useState(false);
    const { user, setReload } = useUserByEmail();

    useEffect(() => {
        'userId' in sessionStorage && history.push('/admin/serviceType');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (prop) => (event) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        console.log(formValues);
        if (
            formValues.email === 'admin@ponto.com' &&
            formValues.password === 'adminponto'
        ) {
            sessionStorage.setItem('userId', 'admin');
            history.push('/admin/serviceType');
        } else {
            setOpenToast(true);
        }
    };

    const handleError = () => {
        console.log('inside error handler');
    };

    return (
        <Grid container>
            <Grid xs={12} md={5} container alignItems='center'>
                {/* Cambiar el contenido aqui */}
                <Box className={`${classes.form} sign-in`}>
                    <Box display={{ xs: 'block', md: 'none' }}>
                        <Typography variant='h4' gutterBottom>
                            Sign in
                        </Typography>
                    </Box>
                    <Card className='card' elevation={0}>
                        <CardContent className='card__content'>
                            <ValidatorForm
                                onSubmit={() => handleSubmit()}
                                onError={() => handleError()}
                                instantValidate
                                className='card__content--form'
                            >
                                <TextValidator
                                    id='email-input'
                                    label='Email *'
                                    onChange={handleInputChange('email')}
                                    placeholder='jdoe@gmail.com'
                                    name='email'
                                    value={formValues.email}
                                    fullWidth
                                    margin='normal'
                                    autoComplete='off'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'Este campo es obligatorio.',
                                        'Ingrese un correo válido.',
                                    ]}
                                />
                                <TextValidator
                                    id='password-input'
                                    label='Contraseña *'
                                    onChange={handleInputChange('password')}
                                    placeholder='Contraseña'
                                    name='password'
                                    value={formValues.password}
                                    fullWidth
                                    margin='normal'
                                    type='password'
                                    autoComplete='off'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    validators={['required']}
                                    errorMessages={[
                                        'Este campo es obligatorio.',
                                    ]}
                                />
                                <Grid container justify='center'>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        className={`${classes.button} submit-button`}
                                    >
                                        Iniciar sesión
                                    </Button>
                                </Grid>
                            </ValidatorForm>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
            <Grid
                component={Box}
                md={7}
                display={{ xs: 'none', sm: 'none', md: 'block' }}
                className={classes.photo}
                justify='center'
                alignItems='center'
                container
            >
                <Grid container item direction='column' xs={10}>
                    <Typography className={classes.welcome} variant='h3'>
                        Bienvenido a Ponto
                    </Typography>
                    <Typography className={classes.signIn} variant='h6'>
                        Inicie sesión para administrar la aplicación
                    </Typography>
                </Grid>
            </Grid>
            <Snackbar
                place='bc'
                color='danger'
                message='Credenciales incorrectas.'
                open={openToast}
                closeNotification={() => setOpenToast(false)}
                close
            />
        </Grid>
    );
}

export default Login;
