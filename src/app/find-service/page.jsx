'use client';

import styles from './page.module.css';
import SearchBar from '../(components)/searchBar/searchBar';
import { useEffect, useState } from 'react';
import ProductCard from '../(components)/productCard/page';
import Header from '../(components)/header/page';
import Pagination from '../(components)/pagination/page';

const FindService = () => {
  const [allData, setAllData] = useState([]);        // ← Full dataset
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_PER_PAGE = 9;

  // Load data once
  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        const pages = Math.ceil(data.length / ITEMS_PER_PAGE);
        setTotalPages(pages);
        console.log("Total items:", data.length, "Pages:", pages);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Re-calculate visible data whenever currentPage or allData changes
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const visibleData = allData.slice(startIdx, endIdx);


  return (
    <div className={`main ${styles.service}`}>
      <Header />

      <div className={styles.searchContainer}>
        <SearchBar />
      </div>

      <div className='cardPack'>
        {visibleData.map((data) => (
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
        ))}
      </div>
      {/* PAGINATION */}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
    </div>
  );
};

export default FindService;