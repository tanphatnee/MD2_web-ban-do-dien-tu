import classNames from "classnames/bind";
import style from './FilterProduct.module.css';

const cx = classNames.bind(style);

const prices = ['Dưới 1 triệu', 'Từ 1 đến 2 triệu', 'Từ 2 đến 4 triệu', 'Từ 4 đến 6 triệu'];
const memorys = ['256GB', '128GB', '65GB'];
const colors = ['Vàng', 'Đỏ', 'Trắng'];

function FilterProduct() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Lọc</h3>
            <ul className={cx('list')}>
                <span className={cx('title')}>Giá</span>
                {prices.map((price, index) => (
                    <li key={index} className={cx('item')}>
                        <input type='checkbox' />
                        <span className={cx('item-title')}>{price}</span>
                    </li>
                ))}
            </ul>
            <ul className={cx('list')}>
                <span className={cx('title')}>Bộ nhớ</span>
                {memorys.map((memory, index) => (
                    <li key={index} className={cx('item')}>
                        <input type='checkbox' />
                        <span className={cx('item-title')}>{memory}</span>
                    </li>
                ))}
            </ul>
            <ul className={cx('list')}>
                <span className={cx('title')}>Màu sắc</span>
                {colors.map((color, index) => (
                    <li key={index} className={cx('item')}>
                        <input type='checkbox' />
                        <span className={cx('item-title')}>{color}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default FilterProduct;