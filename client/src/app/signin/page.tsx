"use client"

import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {signInFetch, signInFetchPayload} from "@/api/auth";
import Link from 'next/link';
import {useRouter} from "next/navigation";
import { useCookies } from 'next-client-cookies';
import {getDataFromForm} from "@/utils/getDataFromForm";

const Page = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const cookies = useCookies();

    const handleSubmit = async (e: any) => {
        setLoading(true)
        e.preventDefault()
        const data = getDataFromForm(e.currentTarget)
        let res = await signInFetch(data as signInFetchPayload);
        setError(res.message)
        if(res?.access_token) {
            cookies.set("token", res.access_token)
            router.push('/')
        }
        setLoading(false)
    }
    return (
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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    {error ?? <Typography>{error}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        {/*<Grid item xs>*/}
                        {/*    <Link href="#" variant="body2">*/}
                        {/*        Forgot password?*/}
                        {/*    </Link>*/}
                        {/*</Grid>*/}
                        <Grid item>
                            <Link href="/signup" style={{color: "#1976d2", textDecoration: "underline"}}>
                                Нет аккаунта, регистрация
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {/*<Copyright sx={{ mt: 8, mb: 4 }} />*/}
        </Container>
    );
};

export default Page;