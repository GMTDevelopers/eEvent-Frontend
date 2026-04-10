'use client';

import styles from '../../find-service/page.module.css';

import { useEffect, useState } from 'react';

import ProductCard from '@/app/(components)/productCard/page';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';


const FindService = () => {
  const [allData, setAllData] = useState([]);        // ← Full dataset
  const { openModal } = useModal();
  // Load data once
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      openModal(<SignIn />)
      return;
    }
    fetch("https://eevents-srvx.onrender.com/v1/client/favorites",{
        headers:{
            authorization: `Bearer ${token}`,
        },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data)
      setAllData(data.data);
    }) 
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  return (
    <div className={`main ${styles.service}`}>
      {allData.length > 0 ?<div className='cardPack'>
        {allData.map((data) => (
          <ProductCard 
            key={data.id} 
            prodId={data.id} 
            title={data.title} 
            description={data.description} 
            category={data.category} 
            ratings={data.rating} 
            price={data.pricing}
            thumb={data.thumb}
            vendorName={data.vendor.name}
          />
        )) }
      </div> : 
        <div> 
          <br /> <br /> 
          <h3 style={{textAlign:"center"}}>You are yet to choose a favourite</h3>
        </div>}
    </div>    
  );
};

export default FindService;