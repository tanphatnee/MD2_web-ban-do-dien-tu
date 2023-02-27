import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProductItem from "../../../components/ProductItem";
import style from './Product.module.css';

const cx = classNames.bind(style);

function Product({ data, title, category, bannerSrc, items = [] }) {

    const [imgLarge, setImgLarge] = useState(false);
    const [lessData, setLessData] = useState(data.slice(0, 4))
    const imgRef = useRef();


    // handle banner if large than 300 will change the column
    useEffect(() => {
        const handleScroll = () => {
            if (imgRef.current.width > 300) {
                setImgLarge(true);
                setLessData(prev => prev.slice(0, 3));
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return (
        <div className='grid'>
            <div className={cx('heading')}>
                <Link to={`category/${category}`} state={category}>
                    <h3 className={cx('title')}>{title}</h3>
                </Link>
                <ul className={cx('list')}>
                    {items.map((item, index) => <li key={index} className={cx('item')}>{item}</li>)}
                </ul>
            </div>
            <div className='row'>
                <div className={imgLarge ? 'col-5' : 'col-3'}>
                    <img ref={imgRef} className={cx('image')} src={bannerSrc} />
                </div>
                <div className={imgLarge ? 'col-7' : 'col-9'}>
                    <div className="row">
                        {lessData.map((item) => (
                            <div className={cx('col-3', { 'itemFullWidth': imgLarge })} key={item.id}>
                                <ProductItem data={item} />
                            </div>
                        ))}
                    </div>
                    <div className={cx('see-more')}>
                        <Link to={`category/${category}`} state={category}>
                            <div className={cx('see-more-btn')}>Xem tất cả</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product;