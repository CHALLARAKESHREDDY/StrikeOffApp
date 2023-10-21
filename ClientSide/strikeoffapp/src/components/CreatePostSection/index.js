import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './index.css';

const categoryList = ["Clothing", "Beauty", "Footwear", "Entertainment", "Other"];
const subCategoryList = {
  Clothing: [
    'Fashion',
    'Apparel',
    'Style',
    'Wardrobe',
    'Dress',
    'Accessories',
    'Designer',
    'Trends',
    'Fabric',
    'Outfit'
  ],
  Beauty: [
    'Makeup',
    'Skincare',
    'Cosmetics',
    'Glamour',
    'Wellness',
    'Aesthetics',
    'Beauty salon',
    'Perfume',
    'Radiant',
    'Pampering'
  ],
  Entertainment: [
    'Movies',
    'Music',
    'Gaming',
    'Theater',
    'Celebrities',
    'Leisure',
    'Recreation',
    'Events',
    'Amusement',
    'Pop culture'
  ],
  Footwear: [
    'Shoes',
    'Sneakers',
    'Boots',
    'Sandals',
    'High heels',
    'Athletic footwear',
    'Comfort',
    'Shoelaces',
    'Shoe store',
    'Sole'
  ]
};

const ReactPopup = () => {
  const [selectedCategory, setSelectedCategory] = useState('Clothing');
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategoryList['Clothing'][0]);
  const [otherSubcategory, setOtherSubcategory] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);

    if (selectedCategory !== 'Other') {
      setSelectedSubCategory(subCategoryList[selectedCategory][0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
              setSubmitted(false);
              return null;
            }}>Close</button>
            <h1>Create New Post</h1>
            {submitted ? (
              <div className="submitted-message">
                <p>Form Submitted!</p>
              </div>
            ) : (
              <form className="post-form" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="categorySelect">Select Category:</label>
                  <select
                    id="categorySelect"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    {categoryList.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedCategory === 'Other' ? (
                  <div>
                    <label htmlFor="otherSubcategory">Enter Other Subcategory:</label>
                    <input
                      type="text"
                      id="otherSubcategory"
                      value={otherSubcategory}
                      onChange={(event) => setOtherSubcategory(event.target.value)}
                    />
                  </div>
                ) : selectedCategory ? (
                  <div>
                    <label htmlFor="subCategorySelect">Select Subcategory:</label>
                    <select
                      id="subCategorySelect"
                      value={selectedSubCategory}
                      onChange={(event) => setSelectedSubCategory(event.target.value)}
                    >
                      {subCategoryList[selectedCategory].map((subcategory, index) => (
                        <option key={index} value={subcategory}>
                          {subcategory}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
                <div>
                  <label htmlFor="productName">Product Name:</label>
                  <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows="4"
                  />
                </div>
                <div>
                  <label htmlFor="photo">Upload Photo:</label>
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={(event) => setPhoto(event.target.files[0])}
                  />
                </div>
                <div>
                  <button type="submit" className="Submit-Button">Submit</button>
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
