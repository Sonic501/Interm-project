import { RevealIcon, UnrevealIcon } from '../../UserManagement/UserPermission/IconSelectDropdown';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/slices/authSlice';
import Loading from '../../../components/Loading/Loading';
import { LoadingButton } from '@mui/lab';

const Login = () => {
    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.auth)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {

        if (!email || !password) {
            Swal.fire({
                title: 'Error',
                text: 'Please enter your email and password',
                icon: 'error',
                confirmButtonText: 'OK',
            });

        } else if (!/\S+@\S+\.\S+/.test(email)) {
            Swal.fire({
                title: 'Error',
                text: 'Please enter your email correctly',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } else
            dispatch(login({ email, password }))
    }
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (

        <>

            <div className="flex items-center justify-end h-screen mr-[56px]">
                <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 w-[614px]">

                    <div>
                        <h1 className="mb-6 text-center text-[36px] leading-10 font-[700] tracking-[0.2rem]">FPT Fresh Academy
                            Training Management</h1>
                        <p className='pl-10 text-[16px] font-[400]'>If you don’t have the account, please contact <a className='text-[#285D9A] underline underline-offset-2' href='#'>FA.HCM@fsoft.com.vn</a> </p>
                    </div>
                    <div>
                        <div className="mb-[10px] mx-20 mt-[70px]">

                            <input
                                className="appearance-none bg-[#F1F1F1] rounded-[10px] w-full py-2 px-5 text-gray-700 leading-tight h-[57px] placeholder:text-[black]"
                                id="email"
                                type="text"
                                placeholder='Enter email'
                                onChange={handleEmailChange}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 13) {
                                        handleSubmit();
                                    }
                                }}
                            />
                        </div>
                        <div className="mb-3 mx-20 relative">

                            <input
                                className="appearance-none bg-[#F1F1F1] rounded-[10px] w-full py-2 px-5 text-gray-700 leading-tight h-[57px] placeholder:text-[black]"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder='Password'
                                onChange={handlePasswordChange}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 13) {
                                        handleSubmit();
                                    }
                                }}
                            />
                            <div className='absolute right-5 top-5 cursor-pointer '>
                                {showPassword ? <>
                                    <div onClick={togglePasswordVisibility}>
                                        <RevealIcon fill={"#000000"} />
                                    </div>
                                </> : <>
                                    <div onClick={togglePasswordVisibility} >
                                        <UnrevealIcon fill={"#000000"} />
                                    </div>

                                </>}
                            </div>
                        </div>
                        <div className='text-[14px] text-[#8B8B8B] flex justify-end mr-[80px] italic mb-[30px]'>
                            <Link to={'/forgotpassword'}>
                                Forgot password?

                            </Link>
                        </div>
                    </div>


                    <div className="flex items-center justify-center mx-20">

                        <LoadingButton
                            onClick={handleSubmit}
                            loading={loading}
                            variant="contained"
                            sx={{
                                backgroundColor: '#2D3748',
                                borderRadius: '10px',
                                width: '100%',
                                padding: '0.5rem 0.75rem',
                                color: 'white',
                                height: '57px',
                                fontWeight: '700',
                                fontSize: '16px'
                            }}
                        >
                            Sign in
                        </LoadingButton>
                    </div>


                </form>
            </div>

        </>

    );
}




export default Login
