import React, { useState, useCallback } from 'react';
import { FcApproval } from 'react-icons/fc';
import { IoIosCreate } from 'react-icons/io';
import Cookies from 'js-cookie';
import Axios from 'axios';
import Popup from 'reactjs-popup';
import './index.css';

const categoryList = ["Clothing", "Beauty", "Footwear", "Entertainment", "Health", "Financial"];

const ReactPopup = ({ updateCardsItems }) => {
  const [formData, setFormData] = useState({
    category: 'Clothing',
    otherSubcategory: '',
    productName: '',
    couponCode: '',
    expiresOn: '',
    description: '',
    imageUrl: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = useCallback((name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setFormData((prevData) => ({ ...prevData, category: selectedCategory }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { productName, description, imageUrl, couponCode, expiresOn, category } = formData;

    if (!productName || !description || !imageUrl || !couponCode || !expiresOn) {
      setErrorMsg("All fields are required");
    } else {
      try {
        const jwtTokenClient = await Cookies.get("jwtToken");
        const response = await Axios.post("https://strikeout-serverside.onrender.com/productDetails", {
          category,
          productName,
          couponCode,
          expiresOn,
          description,
          imageUrl,
          jwtTokenClient,
        });

        setErrorMsg(response.data);

        if (response.data === 'Data posted successfully') {
          setSubmitted(true);
          updateCardsItems();
          setFormData({
            category: 'Clothing',
            otherSubcategory: '',
            productName: '',
            couponCode: '',
            expiresOn: '',
            description: '',
            imageUrl: '',
          });
        }
      } catch (error) {
        setErrorMsg("Error posting data");
      }
    }
  };

  return (
    <div className="Popup-Container-div">
      <Popup trigger={
        <div>
          <button type="button" className="Create-Post-Button">
            <span className="Plus-Icon">+</span>Create Post
          </button>
          <div id="Create-post-option">
            <IoIosCreate />
            Create Post
          </div>
        </div>
      } modal>
        {(close) => (
          <div className="Popup-Container">
            <button className="Close-Button" onClick={() => { close(); setErrorMsg(""); setSubmitted(false); }}>Close</button>
            {submitted ? (
              <div className="submitted-message">
                <FcApproval style={{ fontSize: "50px" }} />
                <p>Posted Successfully!</p>
              </div>
            ) : (
              <form className="post-form" onSubmit={handleSubmit}>
                <h1 className="CreatePost-Heading" style={{ fontSize: "18px", color: "black" }}>Create New Post</h1>
                <div>
                  <label htmlFor="categorySelect">Select Category:</label>
                  <select id="categorySelect" value={formData.category} onChange={handleCategoryChange}>
                    {categoryList.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                {formData.category === 'Other' && (
                  <div>
                    <label htmlFor="otherCategory">Enter Other Category:</label>
                    <input
                      type="text"
                      id="otherCategory"
                      value={formData.otherSubcategory}
                      onChange={(event) => handleInputChange('otherSubcategory', event.target.value)}
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="productName">Product/Platform Name:</label>
                  <input
                    type="text"
                    id="productName"
                    value={formData.productName}
                    onChange={(event) => handleInputChange('productName', event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="couponcode">Coupon Code:</label>
                  <input
                    id="couponcode"
                    value={formData.couponCode}
                    onChange={(event) => handleInputChange('couponCode', event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="expireDate">Expires On:</label>
                  <input
                    id="expireDate"
                    value={formData.expiresOn}
                    onChange={(event) => handleInputChange('expiresOn', event.target.value)}
                    type="date"
                  />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(event) => handleInputChange('description', event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="photo">Upload Photo:</label>
                  <input
                    type="url"
                    id="photo"
                    onChange={(event) => handleInputChange('imageUrl', event.target.value)}
                  />
                </div>
                <div>
                  <button type="submit" className="Submit-Button">Submit</button>
                  {errorMsg.length > 1 && <p className="formErrorMsg">{errorMsg}</p>}
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


