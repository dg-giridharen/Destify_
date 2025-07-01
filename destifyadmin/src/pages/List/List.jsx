import React, { useState, useEffect } from 'react';
// Removed Link import as it's no longer needed
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/destination/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error fetching list");
        }
    };

    const removeDestination = async (destinationId) => {
        const response = await axios.post(`${url}/api/destination/remove`, { id: destinationId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("Error removing item");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='list-page'>
            <div className="list-header">
                <h2>All Destinations</h2>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item) => (
                            <tr key={item._id}>
                                <td><img src={`${url}/images/${item.image}`} alt={item.name} className='table-image' /></td>
                                <td>{item.name}</td>
                                <td>{item.country}</td>
                                <td>{item.category}</td>
                                <td>${item.tripPrice}</td>
                                <td>{item.stock}</td>
                                <td className="action-links">
                                    {/* Removed the Link component for Update */}
                                    <a onClick={() => removeDestination(item._id)} className="remove-link">Remove</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default List;