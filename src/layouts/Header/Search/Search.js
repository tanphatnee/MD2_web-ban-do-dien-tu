import Tippy from '@tippyjs/react/headless';
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import allProduct from '../../../data/products';
import style from './Search.module.css';
import { useDebounce } from '../../../hooks';

const cx = classNames.bind(style);

function Search() {

    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false);

    const debounceValue = useDebounce(inputValue.trim(), 300);

    // handle filter product
    useEffect(() => {
        const result = allProduct.filter(item => {
            if (inputValue.length >= 2) {
                const inputValueLowerCase = item.name.toLowerCase().includes(debounceValue);
                const inputValueUpperCase = item.name.toUpperCase().includes(debounceValue);
                return inputValueLowerCase || inputValueUpperCase;
            }
        })
        setData(result);
        setShowSearchResult(true);
    }, [debounceValue])

    // handle when press enter in input will navigate  to page search
    useEffect(() => {
        const handleKey = e => {
            if (e.key === 'Enter') {
                if (inputValue) {
                    navigate({
                        pathname: '/search',
                        search: `?q=${inputValue}`
                    }, { state: { data, key: inputValue } });
                    handleResetInput();
                }
            }
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [data])

    const handleResetInput = () => {
        setInputValue('');
        setShowSearchResult(false);
    };

    return (
        <Tippy
            placement='bottom'
            interactive
            visible={data.length > 0 && showSearchResult}
            onClickOutside={() => setShowSearchResult(false)}
            render={(attrs) => (
                <div className={cx('search-result')}  {...attrs}>
                    <span className={cx('search-text')}>Kết quả tìm kiếm: {data.length} sản phẩm</span>
                    <div className={cx('search-list')}>
                        {data.map((item, index) => (
                            <Link to={`/${item.name}`} key={index} state={item} >
                                <div className={cx('search-item')} onClick={handleResetInput}>
                                    <img className={cx('search-item-img')} src={item.img} />
                                    <div className={cx('search-item-infos')}>
                                        <span className={cx('search-item-name')}>{item.name}</span>
                                        <span className={cx('search-item-price')}>{item.price}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Link to={`/search?q=${inputValue}`} state={{ data, key: inputValue }} >
                        <span className={cx('btn-view-all')} onClick={handleResetInput}>Xem tất cả</span>
                    </Link>
                </div>
            )}>
            <div className={cx('search')}>
                <input
                    value={inputValue}
                    placeholder='Tìm kiếm'
                    onChange={e => setInputValue(e.target.value)}
                    onFocus={() => setShowSearchResult(true)}
                />
                {inputValue && data.length > 0 ?
                    <Link to={`/search?q=${inputValue}`} state={{ data, key: inputValue }} >
                        <span className={cx('search-icon')} onClick={handleResetInput}><HiMagnifyingGlass /></span>
                    </Link>
                    :
                    <span className={cx('search-icon')}><HiMagnifyingGlass /></span>
                }
            </div>
        </Tippy>

    )
}
export default Search;