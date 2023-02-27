import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { RiLock2Line } from 'react-icons/ri';
import { BiUser } from 'react-icons/bi';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai'


import { ModalContext } from "../ModalProvider";
import style from './ModalLogin.module.css';

const cx = classNames.bind(style);

function ModalLogin() {

    const context = useContext(ModalContext);

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [isEyeOff, setIsEyeOff] = useState(false);

    const inputPassRef = useRef();
    const inputPassConfirmRef = useRef();
    const modalRef = useRef();

    useEffect(() => {
        const handleKeyIsEsc = e => e.key === 'Escape' && handleClose();
        window.addEventListener('keydown', handleKeyIsEsc)
        return () => window.removeEventListener('keydown', handleKeyIsEsc);
    }, [])

    useEffect(() => {
        if (isRegister) {
            if (isEyeOff) inputPassConfirmRef.current.type = 'text';
            if (isEyeOpen) inputPassConfirmRef.current.type = 'password';
        }
    }, [isEyeOff, isEyeOpen])



    const handleWhenEnterPass = (e) => {
        if (e.target.value.length > 0) {
            if (isEyeOff) {
                setIsEyeOpen(false);
            } else {
                setIsEyeOpen(true);
            }
        } else {
            if (isEyeOff) {
                inputPassRef.current.type = 'password';
                setIsEyeOff(false);
            }
            setIsEyeOpen(false);
        }
        setPass(e.target.value);
    }

    const handleEyeOpen = () => {
        inputPassRef.current.type = 'text';
        setIsEyeOpen(false);
        setIsEyeOff(true);
    }

    const handleEyeOff = () => {
        inputPassRef.current.type = 'password';
        setIsEyeOff(false);
        setIsEyeOpen(true);
    }

    const handleToggleForm = () => {
        inputPassRef.current.type = 'password'
        setUser('');
        setPass('');
        setPassConfirm('');
        setIsEyeOff(false)
        setIsEyeOpen(false);
        setIsRegister(!isRegister);
    }

    const handleClose = () => {
        modalRef.current.animate([
            { opacity: 0, transform: 'scale(0)' }
        ], { duration: 200, fill: 'forwards' })
        setTimeout(() => context.handleModalOff(), 200)
    }


    return (
        <div className={cx('wrapper')}>
            <div ref={modalRef} className={cx('inner')}>
                <div className={cx('form')}>
                    <h2 className={cx('from-heading')}>{!isRegister ? 'Đăng nhập' : 'Đăng ký'}</h2>
                    <div className={cx('form-group')}>
                        <BiUser className={cx('icon-user')} />
                        <input
                            value={user}
                            className={cx('form-input')}
                            placeholder='Tên đăng nhập'
                            onChange={e => setUser(e.target.value)}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <RiLock2Line className={cx('icon-lock')} />
                        <input
                            ref={inputPassRef}
                            value={pass}
                            type='password'
                            className={cx('form-input', 'pass')}
                            placeholder='Mật khẩu'
                            onChange={handleWhenEnterPass}
                        />
                        {isEyeOpen && <span className={cx('icon-eye-open')} onClick={handleEyeOpen}><FaRegEye /></span>}
                        {isEyeOff && <span className={cx('icon-eye-off')} onClick={handleEyeOff}><FaRegEyeSlash /></span>}

                    </div>
                    {isRegister && (<div className={cx('form-group')}>
                        <RiLock2Line className={cx('icon-lock')} />
                        <input
                            ref={inputPassConfirmRef}
                            value={passConfirm}
                            type='password'
                            className={cx('form-input', 'pass-confirm')}
                            placeholder='Nhập lại mật khẩu'
                            onChange={e => setPassConfirm(e.target.value)}
                        />
                    </div>)}
                    <button className={cx('btn-submit')}>{!isRegister ? 'Đăng nhập' : 'Đăng ký'}</button>
                    <span className={cx('other-login-text')}>{!isRegister ? 'Hoặc đăng nhập với' : 'Hoặc đăng ký với'}</span>
                    <div className={cx('socials')}>
                        <div className={cx('social-fb')}>
                            <BsFacebook className={cx('icon')} />
                            <span className={cx('text')}>Facebook</span>
                        </div>
                        <div className={cx('social-gg')}>
                            <FcGoogle className={cx('icon')} />
                            <span className={cx('text')}>Google</span>
                        </div>
                    </div>
                    <div className={cx('not-account')}>
                        {!isRegister ? 'Không có tài khoản? ' : 'Đã có tài khoản? '}
                        <span className={cx('toggle-form-btn')} onClick={handleToggleForm}>{!isRegister ? 'Đăng ký ngay' : 'Đăng nhập'}</span>
                    </div>
                </div>
                <div className={cx('close')} onClick={handleClose}><AiFillCloseCircle /></div>
            </div>

        </div >
    )
}
export default ModalLogin;