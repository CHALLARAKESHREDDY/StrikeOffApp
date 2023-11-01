
import Header from '../LandingPageHeader'
import './index.css'

function LandingPage(){



    return(
        <div className="Landingpage-Container">
       <Header />
            <div className="Quote-Image-Container">
                <div>
                    <h1 className="Quote">Your Coupons,<br />Your Savings,<br/> Your Way.</h1>
                </div>
                <img  className="Landing-Image" src="https://img.freepik.com/free-vector/modern-coupon-sale-label-collection-with-flat-design_23-2147950121.jpg?w=740&t=st=1698747587~exp=1698748187~hmac=3be02a8aeeaea7d2a9fe8341e548e4cbe756966e8e751853c6f77c3d42b4901d" alt="Landing-image" />
            </div>

        </div>
    )
}


export default LandingPage