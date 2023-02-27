import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { AiOutlineArrowUp } from 'react-icons/ai'

import style from './Home.module.css';
import { category } from "../../data/category";
import Product from "./Product";
import { laptops, smartphones, tablets, smartwatchs } from "../../data/products";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);

function Home() {

    const [isBtnTop, setIsBtnTop] = useState(false);

    // handle hide-show btn go to top
    useEffect(() => {
        const handleScroll = () => window.scrollY >= 500 ? setIsBtnTop(true) : setIsBtnTop(false);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const handleGoToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('category')}>
                {category.map((item, index) => (
                    <Link key={index} to={`/category/${item.category}`} state={item.category}>
                        <div className={cx('category-item')}>
                            <img src={item.image} />
                            <span className={cx('category-title')}>{item.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={cx('product-list')}>
                <div className={cx('product-item')}>
                    <Product
                        title='LAPTOP'
                        category='laptop'
                        data={laptops}
                        bannerSrc={require('../../assets/images/banner/laptop.png')}
                        items={['Laptop Asus', ' Laptop Dell', 'Laptop HP', 'Laptop Lenovo']}
                    />
                </div>
                <div className={cx('product-item')}>
                    <Product
                        title='TABLET'
                        category='tablet'
                        data={tablets}
                        bannerSrc={require('../../assets/images/banner/tablet.png')}
                        items={['iPad Air', 'iPad Mini', 'iPad Pro', ' Samsung Tablet']}
                    />
                </div>
                <div className={cx('product-item')}>
                    <Product
                        title='SMARTPHONE'
                        category='smartphone'
                        data={smartphones}
                        bannerSrc={require('../../assets/images/banner/smartphone.png')}
                        items={['Oppo', 'Samsung', 'Iphone']}
                    />
                </div>
                <div className={cx('product-item')}>
                    <Product
                        title='SMARTWATCH'
                        category='smartwatch'
                        data={smartwatchs}
                        bannerSrc={require('../../assets/images/banner/smartwatch.png')}
                        items={['Tai nghe bluetooth', 'Tai nghe có dây', 'Tai nghe True wireless']}
                    />
                </div>
            </div>
            <div
                className={cx('btn-top', { 'active': isBtnTop })}
                onClick={handleGoToTop}
            >
                <AiOutlineArrowUp />
            </div>
        </div>
    )
}
export default Home;