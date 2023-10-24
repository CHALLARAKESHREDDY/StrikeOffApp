import "./index.css"

function CardItem(props){
    const {item}=props
    const {category,productName,couponCode,description,imageUrl,expiresOn,username}=item
    console.log(category)
    return(
  
<div className="Cards">
<div><img className="Card-Image" src={imageUrl} alt="shopping-img"/></div>
<div className="Description-Container">
    <div className="Cards-Elements"><p className="card-para">Category : {category}</p>
   <p className="card-para">Product/Platform : {productName}</p></div>
   <div className="Cards-Elements"><p className="card-para">Coupon Code : {couponCode}</p> <p>{expiresOn}</p> </div>
    <p className="card-para">Details : {description}</p>
    <p>Posted By:{username}</p>
</div>
</div>

        
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
