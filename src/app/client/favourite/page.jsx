'use client';

import styles from '../../find-service/page.module.css';

import { useEffect, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/app/(components)/productCard/page';
import SearchBar from '@/app/(components)/searchBar/searchBar';

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

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: scroll to top
    }
  };

  return (
    <div className={`main ${styles.service}`}>

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
        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Page navigation">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className={styles.pageBtn}>
              <ChevronLeft size={18} />
            </button>

            <button onClick={() => goToPage(1)} disabled={currentPage === 1} className={styles.pageBtn}>
              First
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ))}

            <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className={styles.pageBtn}>
              Last
            </button>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={styles.pageBtn}>
                <ChevronRight size={18} />
            </button>
          </nav>
        )}
    </div>
  );
};

export default FindService;