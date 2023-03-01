import classNames from "classnames/bind";
import style from './Cart.module.css';

import { CartIcon } from '../../../components/Icons'
import Tippy from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import config from "../../../config";

const cx = classNames.bind(style);

function Cart() {

    const isCartList = false;

    return (
        <Tippy
            interactive
            placement="bottom"
            offset={[-150, 10]}
            render={attrs => (
                <div className={cx('cart-inner')}  {...attrs}>
                    {isCartList ?
                        <>
                            {/* <div className={cx('cart-list')}>
                                <div className={cx('cart-item')}>
                                    <img className={cx('img')} src="https://vmart.exdomain.net/image/cache/catalog/vmart/san_pham/OPPO-Reno-5-80x80.png" />
                                    <div className={cx('infos')}>
                                        <span className={cx('name')}>Điện thoại OPPO Reno5 (8GB|128GB)</span>
                                        <div className={cx('quantity-and-price')}>
                                            <span className={cx('quantity')}>Số lượng: 1</span>
                                            <span className={cx('price')}>17.380.000đ</span>
                                        </div>
                                        <span className={cx('remove')}>Xóa</span>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className={cx('cart-total-price')}>
                                <span className={cx('total-price-text')}>Thành tiền</span>
                                <span className={cx('total-price')}>17.380.000đ</span>
                            </div> */}
                            <Link to={config.cart}> <button className={cx('view-cart-btn')}>Xem giỏ hàng</button></Link>
                        </>
                        :
                        (
                            <div className={cx('cart-empty')}>
                                <img className={cx('no-cart-img')} src={require('../../../assets/images/no-cart.png')} />
                                <span className={cx('cart-title')}>Giỏ hàng của bạn đang trống!</span>
                            </div>
                        )
                    }
                </div>
            )}>
            <Link to={config.cart}>
                <div className={cx('wrapper')}>
                    <CartIcon />
                    <span className={cx('total')}>0</span>
                </div>
            </Link>
        </Tippy>
    )
}
export default Cart;