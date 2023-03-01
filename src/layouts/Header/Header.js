import classNames from 'classnames/bind';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Search from './Search';
import Cart from './Cart';
import Navbar from './Navbar';
import config from '../../config';
import style from './Header.module.css';
import { PhoneIcon, UserIcon } from '../../components/Icons';
import { ModalContext } from '../../components/ModalProvider';


const cx = classNames.bind(style);

function Header() {

    const context = useContext(ModalContext);
    const isUserLogin = false;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.home} className={cx('logo-link')}>
                    <img className={cx('logo')} src="https://vmart.exdomain.net/image/catalog/vmart/logo/StyleHorizontal.png" />
                </Link>
                <Search />
                <div className={cx('phone-wrap')}>
                    <PhoneIcon />
                    <div className={cx('phone')}>
                        <span className={cx('phone-text')}>Hotline</span>
                        <a href='tel: 0123 456 789' className={cx('phone-number')}>0999 999 999</a>
                    </div>
                </div>
                <div className={cx('user-account')}>
                    {isUserLogin ?
                        <img className={cx('user-img')} src='https://afamilycdn.com/150157425591193600/2022/11/6/hop-bao-cong-bo-vuong-mien-6-3186-1667693183709-1667693183801970763433.jpeg' />
                        :
                        <UserIcon />
                    }
                    <div className={cx('account')}>
                        <span className={cx('acount-text')}>{isUserLogin ? 'Xin chào' : 'Tài khoản'}</span>
                        {isUserLogin ?
                            <span className={cx('username')}></span>
                            :
                            <span className={cx('login')} onClick={() => context.handleModalOpen()}>Đăng nhập</span>
                        }
                    </div>
                </div>
                <Cart />
            </div>
            <Navbar />
        </div>
    )
}
export default Header;