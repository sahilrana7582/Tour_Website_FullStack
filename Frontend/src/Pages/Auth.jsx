import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { baseURL } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../store/slices/tour';

export default function Auth() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = React.useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (loggedIn) {
      try {
        const apiRes = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/login`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );

        const result = await apiRes.json();
        if (result?.status === 'success') {
          localStorage.setItem('token', result?.token);
          localStorage.setItem('name', result?.data?.user?.name);
          dispatch(setUserInfo({ ...result?.data?.user }));
          toast('Loggin Successfully');
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          toast('Something Went Wrong!! Try Again');
        }
      } catch (e) {
        toast(e);
      }
    } else {
      try {
        const body = { ...data, passwordConfirm: data.password };
        console.log(body);
        const apiRes = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/signup`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(body),
          }
        );
        const result = await apiRes.json();
        toast('Account Created Successfully');
        setLoggedIn(!loggedIn);
      } catch (e) {
        toast(e);
      }
    }
    reset();
  };

  return (
    <div className="p-20 flex justify-center items-center h-screen">
      <form className="max-sm:w-full w-1/3" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="flex flex-col w-full gap-4">
            <Typography className="text-center" variant="h5">
              {loggedIn ? 'Login' : 'Sign - Up'}
            </Typography>

            {!loggedIn && (
              <TextField
                id="firstName"
                size="medium"
                label="First Name"
                {...register('name', {
                  required: 'First Name is required',
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
            <TextField
              id="email"
              label="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 4,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Typography className="text-center">
              {loggedIn ? (
                <>
                  Don't have an account?{' '}
                  <span
                    className="hover:text-blue-600 cursor-pointer"
                    onClick={() => setLoggedIn(false)}
                  >
                    Sign up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span
                    className="hover:text-blue-600 cursor-pointer"
                    onClick={() => setLoggedIn(true)}
                  >
                    Login
                  </span>
                </>
              )}
            </Typography>
            <Toaster toastOptions={{ className: 'bg-green' }} />
          </CardContent>

          <CardActions>
            <Button
              className="w-full"
              variant="contained"
              color="inherit"
              size="large"
              type="submit"
            >
              {loggedIn ? 'Login' : 'Sign Up'}
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}
