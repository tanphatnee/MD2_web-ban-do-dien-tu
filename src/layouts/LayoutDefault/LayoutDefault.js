import { useContext } from "react";
import classNames from "classnames/bind";

import style from './LayoutDefault.module.css';
import Footer from "../Footer";
import Header from "../Header";
import ModalLogin from "../../components/ModalLogin/ModalLogin";
import { ModalContext } from "../../components/ModalProvider";
import Slider from "../Slider/Slider";

const cx = classNames.bind(style);

function LayoutDefault({ children }) {

    const context = useContext(ModalContext);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <Slider />
            <div className={cx('content')}>
                {children}
            </div>
            <Footer />
            {context.isLogin && <ModalLogin />}
        </div >
    )
}

export default LayoutDefault;