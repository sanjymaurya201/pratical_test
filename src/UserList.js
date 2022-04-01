import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const UserList = () => {

    const [name, setName] = useState('');
    const [foundUsers, setFoundUsers] = useState([]);


    const [postsPerPage] = useState(5);
    const [offset, setOffset] = useState(1);

    const [pageCount, setPageCount] = useState(0)

    const channel = async () => {
        axios.get('https://reqres.in/api/users').then(response => {
            const res = response.data.data
            // setFoundUsers(res);
            const slice = res.slice(offset - 1, offset - 1 + postsPerPage)
            // Using Hooks to set value
            setFoundUsers(slice)
            setPageCount(Math.ceil(res.length / postsPerPage))
        }).catch(error => {
            console.error(error)
        });
    }

    useEffect(() => {
        channel();
    }, [offset]);


    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setOffset(selectedPage + 1)
    };







    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = foundUsers.filter((user) => {
                return user.first_name.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setFoundUsers(results);
        } else {

            setFoundUsers(foundUsers);


            // If the text field is empty, show all users
        }

        setName(keyword);
    };



    return (
        <div className="container">
            <input
                type="search"
                value={name}
                onChange={filter}
                className="input"
                placeholder="Filter"
            />

            <div className="user-list">
                {foundUsers && foundUsers.length > 0 ? (
                    foundUsers.map((user) => (
                        <li key={user.id} className="user" >
                            <span className="user-id" style={{ padding: '10px' }}>{user.id}</span>
                            <span className="user-name" style={{ padding: '10px' }}>{user.first_name}</span>
                            <span className="user-img" style={{ padding: '10px' }}>{user.email}</span>
                            <img src={user.avatar} alt="logo" />
                        </li>
                    ))

                ) : (
                    <h1>No results found!</h1>
                )}
                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />

            </div>

        </div >
    );
}

export default UserList;


