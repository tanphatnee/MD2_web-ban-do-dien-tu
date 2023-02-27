import { BsCart2 } from 'react-icons/bs'
import classNames from "classnames/bind";
import style from './ProductItem.module.css';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function ProductItem({ data, width = 200, height = 200 }) {
    return (
        <Link to={`/${data.name}`} state={data}>
            <div className={cx('wrapper')}>
                <img width={width} height={height} src={data.img} />
                <div className={cx('info')}>
                    <span className={cx('name')}>{data.name}</span>
                    <span className={cx('price')}>{data.price}</span>
                </div>
                <div className={cx('add-to-cart')}><BsCart2 /></div>
            </div>
        </Link>
    )
}
export default ProductItem;