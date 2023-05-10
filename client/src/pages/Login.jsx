import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Password, Person, ShoppingCart } from '@mui/icons-material'
import { Button, ButtonGroup, Container, Typography } from '@mui/material'
import IconTextField from '../components/IconTextField'

const baseURI = import.meta.env.VITE_BASE_URI

const HeaderComponent = () => (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ShoppingCart sx={{ fontSize: 60, color: "#333" }} />
        <Typography variant='h3' fontFamily="Poppins" fontSize={24}
            color="#333" fontWeight={600}>Shopping App</Typography>
    </Container>
)

const Login = () => {
    const navigate = useNavigate()
    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const changeUserType = () => setIsAdmin(!isAdmin)

    const loginAction = async () => {
        try {
            const loginUser = await axios.post(`${baseURI}/loginuser`, {
                email: emailValue,
                password: passValue
            })
            if (loginUser.data) {
                const { accessToken, refreshToken } = loginUser.data;
                Cookies.set('accessToken', accessToken, { secure: true });
                Cookies.set('refreshToken', refreshToken, { secure: true });
                navigate('/home')
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Container sx={{ display: 'grid', gap: 3, justifyContent: 'center', margin: '50px auto' }}>
                <HeaderComponent />
                <ButtonGroup fullWidth>
                    <Button onClick={changeUserType} variant={isAdmin ? 'contained' : 'outlined'}>Admin</Button>
                    <Button onClick={changeUserType} variant={isAdmin ? 'outlined' : 'contained'}>User</Button>
                </ButtonGroup>
                <IconTextField label="Email" type='email' value={emailValue}
                    setValue={setEmailValue} icon={<Person />} width={500} />
                <IconTextField label="Password" type='password' value={passValue}
                    setValue={setPassValue} icon={<Password />} width={500} />
                <Button onClick={loginAction}
                    variant='contained' sx={{ backgroundColor: "#333" }}>Login</Button>
            </Container>
        </>
    )
}

export default Login