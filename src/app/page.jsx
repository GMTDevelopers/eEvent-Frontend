"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { SlArrowRightCircle } from "react-icons/sl";
import Categories from "./(components)/categories/pages";
import { useState, useRef, useEffect } from "react";
import ProductCard from "./(components)/productCard/page";
import Footer from "./footer/footer";
import Loading from "./(components)/loading/loading";
export default function Home() {

  const [showMore, setShowMore] = useState(false);
  const moreCatRef = useRef(null);
  const [Data, setData] = useState([])
  const [loading, setLoading] = useState(null)

    // Hide when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreCatRef.current && !moreCatRef.current.contains(event.target)) {
        setShowMore(false);
      }
    };

    if (showMore) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMore]);

    //product data
    useEffect(() => {
      setLoading(true)
      fetch("https://eevents-srvx.onrender.com/v1/discovery/featured")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);   // See what was fetched 
          setData(data.data);
          setLoading(false)       // Update state with the fetched data limit search to 6
        })
      .catch((error) => console.error("Error fetching data:", error));
    }, []);

  return (
    <div className={styles.page}>
      <main className="main">
        <header className={styles.header}>
          <div className={styles.headerTxt}>
            <p>The marketplace for all things <span>EVENTS</span> !</p>
            <p style={{fontWeight:600, color:"#FBFBFB"}} className={`txtHeader ${styles.headerSubHeading}`}>Compare vendors, chat directly, and book securely.</p>
            <p style={{fontWeight:600, marginTop:"-5px", color:"#FBFBFB"}} className={`txtHeader ${styles.headerSubHeading}`}>We make event planning simple, transparent & safe.</p>
            <div className={styles.headerTxtBtns}>
              <div className={`btnCapsule ${styles.headerBtn1}`}>Explore services <SlArrowRightCircle /></div>
              <div className={`btnCapsule ${styles.headerBtn2}`}>Become a vendor</div>
            </div>
          </div>
        </header>
        
        <section className={styles.popularCat}>
          <div className={styles.popularCatPack}>
            <div className="sectionHeader">
              <h3>Explore popular categories</h3>
              <div className="btnNoCapsule" onClick={() => setShowMore(!showMore)}>view all<SlArrowRightCircle /></div>
            </div>
            {showMore && (
              <div className={styles.moreCat} ref={moreCatRef}>
                <ul>
                  <li>Entertainment</li>
                  <li>Snacks</li>
                  <li>Security</li>
                  <li>Decorative Lights</li>
                </ul>
              </div>
            )}
            <Categories />
          </div>     
        </section>

        <section className={styles.featured}>
          <div className="sectionHeader">
            <h3>FEATURED VENDORS AND SERVICES</h3>
            <div className="btnNoCapsule">view all<SlArrowRightCircle /></div>
          </div>
          {loading ? <div> <Loading /> </div> :
            <div className="cardPack">
              {Data && Data.map((data)=>(  
                <ProductCard 
                  key={data.id} 
                  title={data.serviceName} 
                  description={data.serviceDescription} 
                  category={data.category} 
                  ratings={data.ratings} 
                  price={data.startingPrice} 
                  thumb={data.serviceImage}
                  vendorName={data.vendorName}
                  vendorImg={data.vendorProfileImage}
                  prodId={data.id}
                /> 
              ))}
            </div>  
          }
        </section>   


        <section className={styles.hiWorks}>
          <div className="sectionHeaderCenter">
            <h2>How it works</h2>
            <div className="line"></div>
          </div>
          
          <div className={styles.worksCardPack}>
            <div className={styles.worksCard}>
              <p className={styles.number}>01</p>
              <div>
                <p className="txtHeader">Browse & Compare</p>
                <p style={{color:"#636363"}}>Discover verified vendors for catering, rentals, décor, music, and more. Compare options and choose what fits your event best.</p>
              </div>              
            </div>
            <div className={styles.pinkLine}></div>
            <div className={styles.worksCard}>
              <p className={styles.number}>02</p>
              <div>
                <p className="txtHeader">Book & Pay Securely</p>
                <p style={{color:"#636363"}}>Book services and pay safely through eEvents. Your payment is held until both sides confirm the job is complete.</p>
              </div>              
            </div>
            <div className={styles.pinkLine}></div>
            <div className={styles.worksCard}>
              <p className={styles.number}>03</p>
              <div>
                <p className="txtHeader">Enjoy Your Event</p>
                <p style={{color:"#636363"}}>Relax and let trusted vendors handle the details. eEvents ensures smooth delivery from start to finish so you can focus on celebrating.</p>
              </div>              
            </div>
          </div>
        </section>


        <section className={styles.whyChoose}>
          <div className="sectionHeaderCenter">
            <h2>Why Choose eEvents?</h2>
            <div className="line"></div>
          </div>
          
          <div className={styles.chooseContainer}>
            <div className={styles.cardChoose}>
              <Image className={styles.cardChooseImg} src='/images/choose1.webp' width={527} height={662} alt="why choose us"/>
              <div className={styles.chooseCardTxt}>
                <div className={styles.cCardHeader}>
                  <li>FOR CUSTOMERS</li>
                </div>
                <div className={styles.chooseList}>
                  <div className={styles.chooseListTxt}>
                    <Image className={styles.cardChooseCheck} src='/images/check.png' width={27} height={19} alt="check"/>
                    <div>
                      <p className="txtHeader">All-in-One Place</p>
                      <p style={{color:"#636363"}}>Stop juggling multiple contacts and platforms. eEvents brings every event service from catering to décor to music together in one seamless marketplace.</p>
                    </div>
                  </div>
                  <div className={styles.chooseListTxt}>
                    <Image className={styles.cardChooseCheck} src='/images/check.png' width={27} height={19} alt="check" />
                    <div>
                      <p className="txtHeader">Secure Payments</p>
                      <p style={{color:"#636363"}}>Your money stays protected with our escrow system. Funds are released only when both you and the vendor confirm the job is complete</p>
                    </div>
                  </div>
                  <div className={styles.chooseListTxt}>
                    <Image className={styles.cardChooseCheck} src='/images/check.png' width={27} height={19} alt="check" />
                    <div>
                      <p className="txtHeader">Verified Vendors</p>
                      <p style={{color:"#636363"}}>Every vendor on eEvents is carefully vetted for quality, reliability, and professionalism so you can book with confidence.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.chooseContainer}>
            <div className={styles.cardChoose}>
              
              <div className={styles.chooseCardTxt}>
                <div className={styles.cCardHeader}>
                  <li>FOR VENDORS</li>
                </div>
                <div className={styles.chooseList}>
                  <div className={styles.chooseListTxt}>
                    <Image className={styles.cardChooseCheck} src='/images/check.png' width={27} height={19} alt="check" />
                    <div>
                      <p className="txtHeader">Grow Your Business</p>
                      <p style={{color:"#636363"}}>Get discovered by a growing community of event planners and clients looking for trusted service providers.  We turn your expertise to steady bookings.</p>
                    </div>
                  </div>
                  <div className={styles.chooseListTxt}>
                    <Image className={styles.cardChooseCheck} src='/images/check.png' width={27} height={19} alt="check" />
                    <div>
                      <p className="txtHeader">Easy Management</p>
                      <p style={{color:"#636363"}}>Manage all your bookings, client conversations, and payments from one simple dashboard. Everything you need to run your event business is in one place</p>
                    </div>
                  </div>
                  <div className={styles.chooseListTxt}>
                    <Image className={styles.cardChooseCheck} src='/images/check.png' width={27} height={19} alt="check" />
                    <div>
                      <p className="txtHeader">Flexible Subscriptions</p>
                      <p style={{color:"#636363"}}>Choose a monthly or yearly plan that suits your goals. Enjoy full access to platform features while keeping complete control of your pricing and services.</p>
                    </div>
                  </div>
                </div>
              </div>
              <Image className={styles.cardChooseImg} src='/images/choose2.webp' width={527} height={662} alt="why choose us"/>
            </div>
          </div>
          
        </section>
       
      </main>
    </div>
  );
}
