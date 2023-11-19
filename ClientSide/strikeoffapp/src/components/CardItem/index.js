import {BsChatSquareDots} from 'react-icons/bs'
import "./index.css"

function CardItem(props){
    const {item,clickedOnChatIcon,id}=props
    const {category,productName,couponCode,description,imageUrl,expiresOn,username}=item
    const expiresDate = new Date(expiresOn);

    const chatIconClick=(username)=>{
       
        clickedOnChatIcon(username)
    }
    
    return(
  
<li className="Cards">
<div className="image-Container"><img className="Card-Image" src={imageUrl}    onerror="showAltText(this, 'Alternative Text')"  alt="shopping-img"  /></div>
<div id="Description-Container">
   
   <p className="card-para">{productName}</p>
   <div className="sameline-elements-coupon" ><p className="card-para">CouponCode: {couponCode}</p><p  className="expiresOn" >ExpriesOn: {expiresDate.toLocaleDateString()}</p></div>
   <p className="card-para" id="mobile-view-elements">CouponCode: {couponCode}</p><p  className="card-para" id="mobile-view-elements">ExpriesOn: {expiresDate.toLocaleDateString()}</p>
    <p className="card-para" id="Details">Details : {description}</p>
    <div className="sameline-elements-coupon" ><p className="card-para">Category : {category}</p><div style={{display:"flex"}} className="chat-icon-container"><p className="card-para">PostedBy : {username}</p> <BsChatSquareDots className="Chat-Icon"  style={{color:"skyblue"}}  onClick={() => chatIconClick(username)}  /></div></div>
   
    <p className="card-para" id="mobile-view-elements">Category : {category}</p><div style={{display:"flex"}} className="chat-icon-container" id="mobile-view-elements"><p className="card-para" id="mobile-view-elements">PostedBy : {username}</p> <BsChatSquareDots  id="mobile-view-elements" className="Chat-Icon"  style={{color:"skyblue"}}  onClick={() => chatIconClick(username)}  /></div>
</div>
</li>

        
    )


}

export default CardItem

/*<div className="Cards">
<div><img className="Card-Image" src="https://img.freepik.com/free-photo/pretty-young-stylish-sexy-woman-pink-luxury-dress-summer-fashion-trend-chic-style-sunglasses-blue-studio-background-shopping-holding-paper-bags-talking-mobile-phone-shopaholic_285396-2957.jpg?w=1060&t=st=1697736877~exp=1697737477~hmac=7fbd6925b921bb9e05ebac81e9b9795ddea0b1c1bffddeaa3378c1d62710231b" alt="shopping-img"/></div>
<div className="Description-Container">
    <p>Heading</p>
    <p>Description</p>
</div>
</div>*/
