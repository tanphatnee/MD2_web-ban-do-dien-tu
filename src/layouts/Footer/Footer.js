import classNames from "classnames/bind";
import { FaMapMarked, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsClockFill } from 'react-icons/bs';

import style from './Footer.module.css';

const cx = classNames.bind(style);

const infos1 = [
    'Công ty cổ phần thương mại VMart',
    'Địa chỉ: A12, Đinh Tiên Hoàng, Q. Hoàn Kiếm, Hà Nội ',
    'Điện thoại: 0378740576 ',
    'Email: nvtphat2k4@gmail.com'
];

const infos2 = [
    { icon: <FaMapMarked />, content: 'Xem bản đồ đường đi' },
    { icon: <FaPhoneAlt />, content: 'Điện thoại: 0378740576' },
    { icon: <FaMapMarkerAlt />, content: 'Địa chỉ: A12, Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội' },
    { icon: <MdEmail />, content: 'Email: nvtphat2k4@gmail.com' },
    { icon: <BsClockFill />, content: 'Giờ mở cửa: Các ngày trong tuần: 9h00 - 22h00' },
];

const infos3 = [
    'Gọi mua: 0123456789 (7:30 - 22:00)',
    'Kỹ thuật: 0123456789 (7:30 - 22:00)',
    'Khiếu nại: 0123456789 (8:00 - 21:30)',
    'Bảo hành: 0123456789 (8:00 - 21:00)',
];


function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className='grid'>
                <div className='row'>
                    <div className='col-4'>
                        <h3 className={cx('title')}>THIÊN ĐƯỜNG MUA SẮM VMART</h3>
                        <div className={cx('infos')}>
                            {infos1.map((item, index) => <span key={index} className={cx('info-item')}>{item}</span>)}
                        </div>
                    </div>
                    <div className='col-4'>
                        <h3 className={cx('title')}>CỬA HÀNG</h3>
                        <div className={cx('infos')}>
                            {infos2.map((item, index) => (
                                <div className={cx('infos2')} key={index}>
                                    <span className={cx('info-icon')}>{item.icon}</span>
                                    <span className={cx('info-item')}>{item.content}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='col-4'>
                        <h3 className={cx('title')}>TỔNG ĐÀI HỖ TRỢ</h3>
                        <div className={cx('infos')}>
                            {infos3.map((item, index) => <span key={index} className={cx('info-item')}>{item}</span>)}
                        </div>
                    </div>
                </div>
                <div className={cx('copyright')}>
                    <p className={cx('copyright-text')}>© Copyright 2021-2023 Vmart</p>
                </div>
            </div>
        </div>
    )
}
export default Footer;