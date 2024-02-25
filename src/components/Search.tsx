import React from 'react';
import { Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Search = ({ placeHolder, onChange, result }: any) => {

    return (
        <Form className='searchbox'>
            <div className="search-form-ctrl">
                <input type="search" placeholder={placeHolder}
                    value={result}
                    onChange={onChange} />

                <button type="button" className='search-icon-btn'>
                    <FaSearch />
                </button>
            </div>
        </Form>
    )
}

export default Search;