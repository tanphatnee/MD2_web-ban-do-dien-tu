import classNames from "classnames/bind";
import { useState } from "react";
import { GoReply } from 'react-icons/go'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from "react-router-dom";

import style from './Cart.module.css';
import config from "../../config";

const cx = classNames.bind(style);

function Cart() {

    const [count, setCount] = useState(1);
    const isHasProduct = true;

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Giỏ hàng của bạn</h2>
            <span className={cx('count')}>{isHasProduct ? `Có ${count} sản phẩm` : 'Không có sản phẩm nào!'}</span>
            {isHasProduct && (
                <div className={cx('product-and-checkout')}>
                    <div className={cx('product-list')}>
                        {/* <div className={(cx('product-item'))}>
                            <img src='https://vmart.exdomain.net/image/cache/catalog/vmart/san_pham/OPPO-Reno-5-80x80.png' />
                            <div className={cx('product-infos')}>
                                <span className={cx('name')}>Điện thoại OPPO Reno5 (8GB|128GB)</span>
                                <span className={cx('price')}>8.690.000đ</span>
                                <div className={cx('quantity-and-total')}>
                                    <div className={cx('quantity')}>
                                        <button className={cx('decrease')} onClick={() => count > 1 && setCount(count - 1)}>–</button>
                                        <span className={cx('number')}>{count}</span>
                                        <button className={cx('increase')} onClick={() => setCount(count + 1)}>+</button>
                                    </div>
                                    <div className={cx('total-price')}>8.690.000đ</div>
                                </div>
                            </div>
                            <div className={cx('close')}><AiOutlineClose /></div>
                        </div> */}
                        {/* <div className={(cx('product-item'))}>
                            <img src='https://vmart.exdomain.net/image/cache/catalog/vmart/san_pham/OPPO-Reno-5-80x80.png' />
                            <div className={cx('product-infos')}>
                                <span className={cx('name')}>Điện thoại OPPO Reno5 (8GB|128GB)</span>
                                <span className={cx('price')}>8.690.000đ</span>
                                <div className={cx('quantity-and-total')}>
                                    <div className={cx('quantity')}>
                                        <button className={cx('decrease')} onClick={() => count > 1 && setCount(count - 1)}>–</button>
                                        <span className={cx('number')}>{count}</span>
                                        <button className={cx('increase')} onClick={() => setCount(count + 1)}>+</button>
                                    </div>
                                    <div className={cx('total-price')}>8.690.000đ</div>
                                </div>
                            </div>
                            <div className={cx('close')}><AiOutlineClose /></div>
                        </div> */}
                    </div>
{/* 
                    <div className={cx('checkout')}>
                        <h3 className={cx('checkout-info')}>Thông tin đơn hàng</h3>
                        <div className={cx('checkout-total')}>
                            <span className={cx('checkout-total-text')}>Tổng tiền:</span>
                            <span className={cx('checkout-total-price')}>8,690,000đ</span>
                        </div>
                        <div className={cx('checkout-text')}>
                            Phí vận chuyển sẽ được tính ở trang thanh toán.
                            Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                        </div>
                        <button className={cx('checkout-btn')}>THANH TOÁN</button>
                        <Link to={config.home}>
                            <span className={cx('keep-buying')}>
                                <GoReply className={cx('back-icon')} />
                                Tiếp tục mua hàng
                            </span>
                        </Link>
                    </div> */}
                </div>
            )}
        </div>
    )
}
export default Cart;