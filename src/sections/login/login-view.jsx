
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import DirectionSnackbar from 'src/components/toast/toast';



// ----------------------------------------------------------------------

export default function LoginView() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [userType, setUserType] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const createRegister = (id) => {
    fetch(`${API_URL}/activity/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then((response) => {
      if (response.ok) {
        console.log('Registro de actividad creado');
      }
    });
  }

  const handleClick = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage('Por favor, rellena todos los campos');
      setSeverity('error');
      setShowAlert(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json(); // Convertir la respuesta a JSON
      if (response.ok) {
      
        setUserType(responseData.data.type);

        localStorage.setItem('name', responseData.data.email); // Guardar el email como 'name'
        localStorage.setItem('type', responseData.data.type); // Guardar el tipo de usuario como 'type');
        localStorage.setItem('userId',responseData.data.id); // Guardar el token de autenticación

        setMessage('Inicio de sesión correcto');
        setSeverity('success');
        setShowAlert(true);

        if (responseData.data.type !== 'admin') {
          createRegister(responseData.data.id);
        }

        setTimeout(() => {
          // El usuario ha sido autenticado correctamente, redirige a la página de dashboard u otra página
          if (userType === 'admin') {
            router.push('/app');
          } else {
            router.push('/products');
            
          }
        }, 2000);
      } else {
        // Manejar el caso en el que el usuario no haya sido autenticado correctamente

        setMessage(`Error: \n ${responseData.message}`);
        setSeverity('error');
        setShowAlert(true);
      }
    } catch (error) {
      setMessage('Error al enviar la solicitud', error.message);
      setSeverity('error');
      setShowAlert(true);
    }
  };

  // Dentro de tu componente
  useEffect(() => {
    if (userType) {
      localStorage.setItem('type', userType);

      setTimeout(() => {
        // El usuario ha sido autenticado correctamente, redirige a la página de dashboard u otra página
        if (userType === 'admin') {
          router.push('/app');
        } else {
          router.push('/products');
        }
      }, 2000);
    }
  }, [userType, router]);

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="Name" label="User name" value={email} onChange={handleEmailChange} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_4.jpg',
          }),
          height: 1,
        }}
      >
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
          }}
        />

        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography variant="h4">Iniciar sesión</Typography>

            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              No tienes una cuenta?
              <Link component={RouterLink} to="/register" variant="subtitle2" sx={{ ml: 0.5 }}>
                Crear
              </Link>
            </Typography>

            {renderForm}
          </Card>
        </Stack>
      </Box>

      <DirectionSnackbar
        message={message}
        severity={severity}
        autoOpen={showAlert}
        onClose={handleCloseAlert}
      />
    </>
  );
}
