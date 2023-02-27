import classNames from "classnames/bind";
import { RxCaretDown } from 'react-icons/rx'
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import style from './Category.module.css';

import {
    headphones,
    keyboards,
    laptops,
    mouses,
    smartphones,
    smartwatchs,
    tablets
} from "../../data/products";
import ProductItem from "../../components/ProductItem";
import Tippy from "@tippyjs/react/headless";

const prices = ['Tất cả', 'Dưới 10 triệu', 'Từ 10 đến 20 triệu', 'Từ 20 đến 30 triệu', 'Trên 30 triệu'];
const memorys = ['256GB', '128GB', '64GB'];
const colors = ['Vàng', 'Đỏ', 'Trắng'];
const sortList = ['Mặc định', 'Giá: Từ thấp đến cao', 'Giá: Từ cao đến thấp'];

const cx = classNames.bind(style);

function Category() {

    const navigate = useNavigate();

    const location = useLocation();
    const category = location.state;
    const pathNameCateg = location.pathname;

    const handleItemLocalStorage = (item) => {
        const getItem = localStorage.getItem(item);
        if (getItem) {
            const data = JSON.parse(getItem);
            return data;
        }
    }

    const [data, setData] = useState(handleItemLocalStorage('data_default') ?? []);
    const [filterData, setFilterData] = useState(handleItemLocalStorage('data_filter') ?? []);
    const [checked, setChecked] = useState(handleItemLocalStorage('checkId') ?? 0);
    const [isDataDefault, setIsDataDefault] = useState(filterData ? false : true);

    const [sortType, setSortType] = useState('Mặc định')
    const [isSort, setIsSort] = useState(false);
    const [sortData, setSortData] = useState([]);

    const [isSortList, setIsSortList] = useState(true);

    // handle when comp mount position always on top    
    useEffect(() => window.scrollTo({ top: 0 }));

    useEffect(() => {
        switch (category) {
            case 'laptop':
                handleCategItem(laptops);
                break;
            case 'smartphone':
                handleCategItem(smartphones);
                break;
            case 'tablet':
                handleCategItem(tablets);
                break;
            case 'smartwatch':
                handleCategItem(smartwatchs);
                break;
            case 'headphone':
                handleCategItem(headphones);
                break;
            case 'computer-Mouse':
                handleCategItem(mouses);
                break;
            case 'keyboard':
                handleCategItem(keyboards);
                break;
            default:
                break;
        }
    }, [category]);


    const handleCategItem = (data) => {
        localStorage.setItem('data_default', JSON.stringify(data));
        localStorage.removeItem('data_filter');
        localStorage.removeItem('checkId');
        setData(data);
        setIsDataDefault(true);
        setIsSort(false);
        setChecked(0);
    }

    const handlePrice = (item) => {
        const priceString = item.price;
        const removeLastCharInPrice = priceString.slice(0, priceString.length - 1);
        const removeDotsInPrice = removeLastCharInPrice.replace('.', '');
        const newPrice = removeDotsInPrice * 1;
        return newPrice;
    }

    const handleFilterProduct = (price, index) => {
        let result;
        setChecked(index);

        const handleAfterWhenFilter = (data, index, searchQuery) => {
            localStorage.setItem('data_filter', JSON.stringify(data));
            localStorage.setItem('checkId', index);
            navigate({ search: searchQuery });
            setIsDataDefault(false);
            setIsSort(false);
            setFilterData(data);
            setSortType('Mặc định')
        }

        switch (price) {
            case 'Tất cả':
                result = data.filter((item) => {
                    const price = handlePrice(item);
                    return (price > 0) && item;
                });
                handleAfterWhenFilter(result, index, '?price_filter=tat-ca');
                break;
            case 'Dưới 10 triệu':
                result = data.filter((item) => {
                    const price = handlePrice(item);
                    return (price <= 10000) && item;
                });
                handleAfterWhenFilter(result, index, '?price_filter=duoi-10-trieu');
                break;
            case 'Từ 10 đến 20 triệu':
                result = data.filter((item) => {
                    const price = handlePrice(item);
                    return (price >= 10000 && price <= 20000) && item;
                });
                handleAfterWhenFilter(result, index, '?price_filter=tu-10-den-20-trieu');
                break;
            case 'Từ 20 đến 30 triệu':
                result = data.filter((item) => {
                    const price = handlePrice(item);
                    return (price >= 20000 && price <= 30000) && item;
                });
                handleAfterWhenFilter(result, index, '?price_filter=tu-20-den-30-trieu');
                break;
            case 'Trên 30 triệu':
                result = data.filter((item) => {
                    const price = handlePrice(item);
                    return (price >= 30000) && item;
                });
                handleAfterWhenFilter(result, index, '?price_filter=tren-30-trieu');
                break;
            default:
                return result;
        }
    }


    const handleSortType = (item) => {
        let result;
        setSortType(item);

        const handleSort = (data) => {
            setIsDataDefault(false);
            setIsSort(true);
            setSortData(data);
            setChecked(0);
            setFilterData([]);
        }

        switch (item) {
            case 'Mặc định':
                result = data.sort((a, b) => a.id - b.id);
                handleSort(result);
                break;
            case 'Giá: Từ thấp đến cao':
                result = data.sort((a, b) => {
                    a = handlePrice(a);
                    b = handlePrice(b);
                    return a - b;
                })
                handleSort(result);
                break;
            case 'Giá: Từ cao đến thấp':
                result = data.sort((a, b) => {
                    a = handlePrice(a);
                    b = handlePrice(b);
                    return b - a;
                })
                handleSort(result);
                break;
            default:
                break;
        }
    }

    const productItem = (item) => (
        <div className='col-3' key={item.id}>
            <Link to={`${pathNameCateg}/${item.name}`} state={item}>
                <ProductItem data={item} />
            </Link>
        </div>
    )


    return (
        <div className={cx('wrapper')}>
            <div className='grid'>
                <div className='row'>
                    <div className='col-3'>
                        <div className={cx('filter')}>
                            <h3 className={cx('filter-heading')}>Lọc</h3>
                            <ul className={cx('filter-list')}>
                                <span className={cx('filter-title')}>Giá</span>
                                {prices.map((price, index) => (
                                    <li key={index} className={cx('filter-item')}>
                                        <input
                                            type='checkbox'
                                            checked={index === checked}
                                            onChange={() => handleFilterProduct(price, index)} />
                                        <span className={cx('filter-item-title')}>{price}</span>
                                    </li>
                                ))}
                            </ul>
                            <ul className={cx('filter-list')}>
                                <span className={cx('filter-title')}>Bộ nhớ</span>
                                {memorys.map((memory, index) => (
                                    <li key={index} className={cx('filter-item')}>
                                        <input type='checkbox' />
                                        <span className={cx('filter-item-title')}>{memory}</span>
                                    </li>
                                ))}
                            </ul>
                            <ul className={cx('filter-list')}>
                                <span className={cx('filter-title')}>Màu sắc</span>
                                {colors.map((color, index) => (
                                    <li key={index} className={cx('filter-item')}>
                                        <input type='checkbox' />
                                        <span className={cx('filter-item-title')}>{color}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='col-9'>
                        <div className={cx('sort-product')}>
                            <span className={cx('sort-by')}>Sắp xếp theo: </span>
                            <Tippy
                                interactive
                                placement='bottom'
                                offset={[0, 0]}
                                render={(attrs) => (isSortList &&
                                    (<div className={cx('sort-list')} tabIndex={-1} {...attrs}>
                                        {sortList.map((item, index) => (
                                            <div
                                                key={index}
                                                className={cx('sort-item')}
                                                onClick={() => {
                                                    setIsSortList(false);
                                                    handleSortType(item);
                                                }}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>))
                                }
                            >
                                <div className={cx('sort')} onMouseMove={() => setIsSortList(true)}>
                                    <span>{sortType}</span>
                                    <RxCaretDown className={cx('caret-down')} />
                                </div>
                            </Tippy>
                        </div>
                        <div className={cx('product-list')}>
                            <div className='row'>
                                {isDataDefault && data.map((item) => productItem(item))}
                                {!isDataDefault && filterData.map((item) => productItem(item))}
                                {isSort && sortData.map((item) => productItem(item))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Category;
