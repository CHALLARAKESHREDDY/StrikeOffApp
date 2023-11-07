import React, { useState } from 'react';
import {FcApproval} from 'react-icons/fc' 
import Cookies from 'js-cookie';
import Axios from 'axios';
import Popup from 'reactjs-popup';
import './index.css';

const categoryList = ["Clothing", "Beauty", "Footwear", "Entertainment", "Health", "Financial"];

const ReactPopup = ({ updateCardsItems }) => {
    const [category, setSelectedCategory] = useState('Clothing');
    const [otherSubcategory, setOtherSubcategory] = useState('');
    const [productName, setProductName] = useState('');
    const [couponCode, changeCouponCode] = useState("");
    const [description, setDescription] = useState('');
    const [expiresOn, setExpiredDate] = useState("");
    const [imageUrl, setPhoto] = useState("");
    const [errorMsg, changeErorMsg] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setSelectedCategory(selectedCategory);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName || !description || !imageUrl || !couponCode || !expiresOn) {
            changeErorMsg("All fields are Required")
        } else {
            try {
                const jwtTokenClient = await Cookies.get("jwtToken");
                const response = await Axios.post("http://localhost:3007/productDetails", { category, productName, couponCode, expiresOn, description, imageUrl, jwtTokenClient });
                if (response.data !== 'Data posted successfully') {
                    changeErorMsg(response.data);
                } else {
                    changeErorMsg(response.data);
                    console.log(response.data);
                    updateCardsItems();
                    setPhoto("");
                    changeCouponCode("");
                    setDescription("");
                    setProductName("");
                    setSubmitted(true);

                    // Update the cardsItems state by calling the provided function
                    updateCardsItems();

    
                }

            } catch (e) {
                changeErorMsg("Error posting Data");
            }
        }
    };

    return (
        <div>
            <Popup
                trigger={
                    <button type="button" className="Create-Post-Button">
                        <span className="Plus-Icon">+</span>Create Post
                    </button>
                }
                modal
            >
                {(close) => (
                    <div className="Popup-Container">
                        <button className="Close-Button" onClick={() => {
                            close();
                            changeErorMsg("");
                            setSubmitted(false);
                            return null;
                        }}>Close</button>
                        {submitted ? (
                            <div className="submitted-message">
                                <FcApproval style={{fontSize:"50px"}}/>
                                <p>Form Submitted!</p>
                            </div>
                        ) : (
                            <form className="post-form" onSubmit={handleSubmit}>
                                                        <h1 className="CreatePost-Heading" style={{ fontSize: "22px", color: "black" }}>Create New Post</h1>

                                <div>
                                    <label htmlFor="categorySelect">Select Category:</label>
                                    <select
                                        id="categorySelect"
                                        value={category}
                                        onChange={handleCategoryChange}
                                    >
                                        {categoryList.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {category === 'Other' ? (
                                    <div>
                                        <label htmlFor="otherSubcategory">Enter Other Category:</label>
                                        <input
                                            type="text"
                                            id="otherCategory"
                                            value={otherSubcategory}
                                            onChange={(event) => setOtherSubcategory(event.target.value)}
                                        />
                                    </div>
                                ) : null}
                                <div>
                                    <label htmlFor="productName">Product/Platform Name:</label>
                                    <input
                                        type="text"
                                        id="productName"
                                        value={productName}
                                        onChange={(event) => setProductName(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="couponcode">Coupon Code:</label>
                                    <input
                                        id="couponcode"
                                        value={couponCode}
                                        onChange={(event) => changeCouponCode(event.target.value)}

                                    />
                                </div>
                                <div>
                                    <label htmlFor="expireDate">Expires On:</label>
                                    <input
                                        id="expireDate"
                                        value={expiresOn}
                                        onChange={(event) => setExpiredDate(event.target.value)}
                                        type="date"
                                    />
                                </div>


                                <div>
                                    <label htmlFor="description">Description:</label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}

                                    />
                                </div>

                                <div>
                                    <label htmlFor="photo">Upload Photo:</label>
                                    <input type="url" id="photo" onChange={(event) => setPhoto(event.target.value)} />
                                </div>
                                <div>
                                    <button type="submit" className="Submit-Button">Submit</button>
                                    {errorMsg.length > 1 ? <p className="formErrorMsg">{errorMsg}yes</p> : null}
                                </div>
                            </form>
                        )}
                    </div>
                )}
            </Popup>
        </div>
    );
};

export default ReactPopup;

