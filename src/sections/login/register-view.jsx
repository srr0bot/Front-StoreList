import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { Switch, FormControlLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import DirectionSnackbar from 'src/components/toast/toast';

// ----------------------------------------------------------------------

export default function RegisterView({ isAdmin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };

  const handleAdminChange = (event) => {
    setAdmin(event.target.checked);
    console.log(admin);
  };

  const theme = useTheme();
  const router = useRouter();

  const handleClick = async (event) => {
    event.preventDefault();

    if (!email || !password || !password2) {
      setMessage('Por favor, rellena todos los campos');
      setSeverity('error');
      setShowAlert(true);
      return;
    }

    if (password !== password2) {
      setMessage('Las contraseñas no coinciden');
      setSeverity('error');
      setShowAlert(true);
      return;
    }

    const requestBody = {
      email,
      password,
    };
    
    if (admin) {
      requestBody.type = 'admin';
    }
    

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setMessage(`Usuario registrado correctamente.\n ${isAdmin ? '' : 'Redirigiendo al login...'}`);
     
        setSeverity('success');
        setShowAlert(true);
       
        setTimeout(() => {
          if (!isAdmin) {
            router.push('/');
          }
        }, 2000);
      } else {
        setMessage('Error al registrar el usuario');
        setSeverity('error');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setMessage(error.message);
      setSeverity('error');
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

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
            <Typography variant="h4">Register</Typography>

            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              Ya tienes una cuenta?
              <Link component={RouterLink} to="/" variant="subtitle2" sx={{ ml: 0.5 }}>
                Iniciar sesión
              </Link>
            </Typography>

            <Stack spacing={3}>
              <TextField name="user" label="User Name" value={email} onChange={handleEmailChange} />

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

              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword2 ? 'text' : 'password'}
                value={password2}
                onChange={handlePassword2Change}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                        <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 3 }}
            >
              {isAdmin && (
                <Stack direction="row" alignItems="center">
                  <FormControlLabel control={<Switch onChange={handleAdminChange} />} label="Admin" />
                </Stack>
              )}

              <Stack direction="row-reverse" alignItems="center">
                <Link variant="subtitle2" underline="hover">
                  Forgot password?
                </Link>
              </Stack>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              onClick={handleClick}
            >
              Register
            </LoadingButton>
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
RegisterView.propTypes = {
  isAdmin: PropTypes.bool,
};
