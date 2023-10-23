import React, { useState } from 'react';
import  Axios from 'axios';
import Popup from 'reactjs-popup';
import './index.css';

const categoryList = ["Clothing", "Beauty", "Footwear", "Entertainment", "Health","Financial"];

const ReactPopup = () => {
  const [category, setSelectedCategory] = useState('Clothing');
  const [otherSubcategory, setOtherSubcategory] = useState('');
  const [productName, setProductName] = useState('');
  const [couponCode,changeCouponCode] = useState("")
  const [description, setDescription] = useState('');
  const [imageUrl, setPhoto] = useState("");
  const [errorMsg,changeErorMsg]=useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (!productName || !description || !imageUrl || !couponCode){
        changeErorMsg("All fileds are Required")
    }else{
      try{
        const response=await Axios.post("http://localhost:3007/productDetails",{category,productName,couponCode,description,imageUrl})
        if (response.data==='Error posting data'){
          changeErorMsg("'Error posting data'")
        }else{
        changeErorMsg(response.data)
        console.log(response.data)
         setPhoto("")
         changeCouponCode("")
         setDescription("")
         setProductName("")
        setSubmitted(true);
        }

      }catch (e){
        changeErorMsg("Error posting Data")
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
              changeErorMsg("")
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
                  <label htmlFor="couponcode">coupon Code:</label>
                  <input
                    id="couponcode"
                    value={couponCode}
                    onChange={(event) => changeCouponCode(event.target.value)}
              
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
               { /*
                <label htmlFor="photo">Upload Photo:</label> 
               
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={(event) => setPhoto(event.target.files[0])}
                />  */}
                   <label htmlFor="photo">Upload Photo:</label> 
                <input type="url" id="photo" onChange={(event) => setPhoto(event.target.value) } />
                </div>
                <div>
                  <button type="submit" className="Submit-Button">Submit</button>
                  {errorMsg.length>1? <p className="formErrorMsg">{errorMsg}</p>:null} 
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
