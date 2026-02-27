'use client'
import Image from "next/image";
import styles from "./prodCard.module.css";
import { SlArrowRightCircle } from "react-icons/sl";
import Link from "next/link";
import { useState } from "react";

const ProductCard = ({title, prodId, description, category, ratings, price, thumb, vendorName, vendorImg}) => {
    const [isThumb, setIsThumb] = useState(thumb || "/images/defaultDP.jpg")
    const [isVendorImg, setIsVendorImg] = useState(vendorImg || "/images/defaultDP.jpg")
    return ( 
        <div className={styles.prodCard}>
            <div className={styles.cardHeader}>
                <img className={styles.prodImg} src={isThumb} alt="product" />            
                <div className={styles.catPill}>
                    <li>{category}</li>
                </div>
            </div>
            <div className="cardHeader">
                <div className={`sectionHeader ${styles.prodTitle}`}>
                    <Link href={`/find-service/${prodId}`}><p className="txtHeader">{title}</p></Link>    
                    <div className="btnNoCapsule">
                        <Image src={'/images/star.jpg'} className={styles.star} width={17} height={17} alt="star" />
                        <p style={{color:"#222222"}} className={styles.rating}>{ratings}</p>
                    </div>
                </div>
                <div className={styles.vendor}>
                    <img className={styles.vendorImg} src={isVendorImg} alt="vendor" />
                    <p style={{fontWeight:600, color:"#636363"}} className={styles.rating}>{vendorName}</p>
                </div>
                <p className={styles.prodDisc}>{description}</p>
                <div className={styles.prodPrice}>
                    <p className={styles.rating} style={{fontWeight:500, color:"#AAA6A6"}}>PRICING STARTS FROM</p>
                    <div className="sectionHeader">
                        <h3 style={{color:"#222222"}}>₦ {price}</h3>
                        <Link href={`/find-service/${prodId}`}><div className="btnNoCapsule">More details<SlArrowRightCircle /></div></Link>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}
 
    export default ProductCard;