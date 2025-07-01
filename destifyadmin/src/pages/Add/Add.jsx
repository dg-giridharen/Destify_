import React, { useState } from 'react';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import upload_area from '../../assets/upload_area.svg';
import { FaCheck } from 'react-icons/fa';

const Add = ({ url }) => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        tripPrice: "",
        category: "Beach",
        country: "",
        packageType: "Standard",
        serviceFee: "",
        roomCharges: "",
        discount: "",
        stock: "",
        foodCost: "",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handlePackageClick = (type) => {
        setData(prevData => ({ ...prevData, packageType: type }));
    };
    
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error("Please upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("tripPrice", Number(data.tripPrice));
        formData.append("image", image);
        formData.append("category", data.category);
        formData.append("country", data.country);
        formData.append("packageType", data.packageType);
        formData.append("serviceFee", Number(data.serviceFee));
        formData.append("roomCharges", Number(data.roomCharges));
        formData.append("discount", Number(data.discount));
        formData.append("stock", Number(data.stock));
        formData.append("foodCost", Number(data.foodCost));

        try {
            const response = await axios.post(`${url}/api/destination/add`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                // Reset form after successful submission
                setData({ name: "", description: "", tripPrice: "", category: "Beach", country: "", packageType: "Standard", serviceFee: "", roomCharges: "", discount: "", stock: "", foodCost: ""});
                setImage(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className='add-page'>
            <form onSubmit={onSubmitHandler}>
                <div className="add-page-header">
                    <h2>Add New Destination</h2>
                    <div className="header-buttons">
                        <button type="submit" className="btn-primary">
                            <FaCheck /> Add Destination
                        </button>
                    </div>
                </div>

                <div className="add-page-layout">
                    {/* Left Column */}
                    <div className="add-left-column">
                        <div className="form-card">
                            <h3>General Information</h3>
                            <div className="form-group">
                                <label>Destination Name</label>
                                <input onChange={onChangeHandler} value={data.name} type="text" name='name' required />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="4" required></textarea>
                            </div>
                             <div className="form-group">
                                <label>Country</label>
                                <input onChange={onChangeHandler} value={data.country} type="text" name='country' required />
                            </div>
                        </div>

                        <div className="form-card">
                            <h3>Pricing Details</h3>
                             <div className="form-row">
                                <div className="form-group">
                                    <label>Trip Price</label>
                                    <input onChange={onChangeHandler} value={data.tripPrice} type="number" name='tripPrice' required />
                                </div>
                                <div className="form-group">
                                    <label>Service Fee</label>
                                    <input onChange={onChangeHandler} value={data.serviceFee} type="number" name='serviceFee' required />
                                </div>
                            </div>
                             <div className="form-row">
                                <div className="form-group">
                                    <label>Room Charges</label>
                                    <input onChange={onChangeHandler} value={data.roomCharges} type="number" name='roomCharges' required />
                                </div>
                                <div className="form-group">
                                    <label>Food Cost</label>
                                    <input onChange={onChangeHandler} value={data.foodCost} type="number" name='foodCost' required />
                                </div>
                            </div>
                             <div className="form-group">
                                <label>Discount (%)</label>
                                <input onChange={onChangeHandler} value={data.discount} type="number" name='discount' />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="add-right-column">
                         <div className="form-card">
                            <h3>Upload Image</h3>
                            <label htmlFor="image">
                                <img src={image ? URL.createObjectURL(image) : upload_area} alt="Upload preview" className="upload-main-preview-img" />
                            </label>
                            <input type="file" id="image" hidden required onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div className="form-card">
                            <h3>Categorization & Stock</h3>
                             <div className="form-group">
                                <label>Category</label>
                                <select name="category" onChange={onChangeHandler} value={data.category}>
                                    <option value="Beach">Beach</option>
                                    <option value="Mountain">Mountain</option>
                                    <option value="City">City</option>
                                    <option value="Historical">Historical</option>
                                </select>
                            </div>
                             <div className="form-group">
                                <label>Package Type</label>
                                <div className="package-selector">
                                    {['Standard', 'Couples', 'Family', 'Luxury'].map(type => (
                                        <button type="button" key={type} className={data.packageType === type ? 'active' : ''} onClick={() => handlePackageClick(type)}>
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                             <div className="form-group">
                                <label>Stock (Available Packages)</label>
                                <input onChange={onChangeHandler} value={data.stock} type="number" name='stock' required />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Add;