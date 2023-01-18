import React, {useContext, useEffect, useState} from 'react';
import {createGlobalStyle} from 'styled-components';
import {LoginStyle} from '../components/login/StyledComponents';
import LoginImgSvg from '../assets/svg/loginImgSvg.svg';
import Logo from '../assets/img/Logo.png';
import {getToken, setToken} from '../helpers/tokenStorage';
import {useNavigate} from 'react-router-dom';
import {ClipLoader} from 'react-spinners';
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import login from "./Login";
import {GetAuthInstance} from "../helpers/httpClient";

const Style = createGlobalStyle`
  body {
    @media (max-width: 991px) {
      background: var(--white) !important;
    }
  }

  body > div {
    height: 100%;
    position: relative;
  }
`;
const Login = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState({username: '', password: ''}, '');
    const [err, setErr] = useState({});

    useEffect(() => {
        if (getToken()) {
            navigate('dashboard/main');
        }

    }, []);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        let t = true,
            e = {};

        if (!obj.login) {
            t = false;
            e = {...e, login: true};
        }

        if (!obj.password) {
            t = false;
            e = {...e, password: true};
        }
        if (t) {
            GetAuthInstance()
                .post('/o/token/', new URLSearchParams({
                    username: obj.login,
                    password: obj.password,
                    grant_type: "password",
                    client_id: "hd1FyNwHJioJUv6s38cL78rWFkU4DMBvMS3vWU4c",
                    client_secret: "vIdhbsblwmY4E0jDagqIRsuqSB5odUb75DZJy8MdZ4koEJF7monkySBQpYdW3PNPuxTZqpkUEjtEZ1IDAmD2zoXv75rvhzNDIl6KhBA5DT8Fv2tec8qFRqoTlxkpuDRI",
                }))
                .then((res) => {
                    setToken(res.data.access_token, true);
                    navigate('/dashboard/main');
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    setErr({ common: true });
                });
        } else {
            setErr(e);
            setLoading(false);
        }
    };
    return (
        <LoginStyle>
            <div className='containerLogin'>
                <div className='loginLogoMain'>
                    <img src={Logo} className='loginLogo' alt=''/>
                </div>
                <h2>Авторизация</h2>
                <form className='loginForm' onSubmit={onSubmit}>
                    <div className='input-group pb-2'>
                        <span className="input-group-text" id="basic-addon1">+998</span>
                        <input
                            className='form-control'
                            type='text'
                            value={obj.login}
                            placeholder='Логин'
                            onChange={(e) => {
                                setObj({...obj, login: e.target.value});
                                setErr({...err, login: false, common: false});
                            }}
                        />
                    </div>
                    {err.login ? (
                        <div className='loginFormSub' style={{color: 'red'}}>
                            Ошибка входа
                        </div>
                    ) : (
                        ''
                    )}
                    <div className='input-group pb-2'>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='Пароль'
                            value={obj.password}
                            onChange={(e) => {
                                setObj({...obj, password: e.target.value});
                                setErr({...err, password: false, common: false});
                            }}
                        />
                    </div>
                    {err.password ? (
                        <div className='loginFormSub' style={{color: 'red'}}>
                            Неверный пароль
                        </div>
                    ) : (
                        ''
                    )}
                    {err.common ? (
                        <div className='loginFormSub' style={{color: 'red'}}>
                            Пароль или ошибка входа
                        </div>
                    ) : (
                        ''
                    )}
                    {loading ? (
                        <div className='loginFormSub'>
                            <button className='loadBtn'>
                                <ClipLoader loading={loading} size={20} color={'#CF9338'}/>
                            </button>
                        </div>
                    ) : (
                        <div className='text-center py-4'>
                            <button className="btn btn-outline-primary w-100" type='submit'>Войти</button>
                        </div>
                    )}
                </form>
            </div>
            <div className='LoginImg'>
                <img src={LoginImgSvg} alt=''/>
            </div>
            <Style/>
        </LoginStyle>
    );
};

export default Login;
