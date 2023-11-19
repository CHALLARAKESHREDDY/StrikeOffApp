import {Link} from 'react-router-dom'
import Header from '../LandingPageHeader'
import './index.css'

function LandingPage(){



    return(
        <div className="Landingpage-Container">
       <Header />
            <div id="Quote-Image-Container">
            <img  className="Landing-Image" src="https://img.freepik.com/free-vector/modern-coupon-sale-label-collection-with-flat-design_23-2147950121.jpg?w=740&t=st=1698747587~exp=1698748187~hmac=3be02a8aeeaea7d2a9fe8341e548e4cbe756966e8e751853c6f77c3d42b4901d" alt="Landing-image" />
                <div style={{textAlign:"center"}}>
                    <h1 className="Quote">Your Coupons,<br />Your Savings,<br/> Your Way.</h1>
                    <div className="Para-Container">
                        <p  className="Landing-Para">Do you want to know about Strikeout?</p>
                        <Link to="/landingAbout"><button type="button" className="Landing-Button" >Know More</button></Link>
                    </div>
                </div>
               
            </div>

        </div>
    )
}


export default LandingPage