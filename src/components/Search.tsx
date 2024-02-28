import { Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Search = ({ placeHolder, onChange, result, handleSearch }: any) => {

    return (
        <Form className='searchbox' onSubmit={handleSearch}>
            <div className="search-form-ctrl">
                <input type="search" placeholder={placeHolder}
                    value={result}
                    onChange={onChange} />

                <button type="button" className='search-icon-btn' onClick={handleSearch}>
                    <FaSearch />
                </button>
            </div>
        </Form>
    )
}

export default Search;