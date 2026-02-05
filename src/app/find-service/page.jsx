/* 'use client';

import styles from './page.module.css';
import SearchBar from '../(components)/searchBar/searchBar';
import { useEffect, useState } from 'react';
import ProductCard from '../(components)/productCard/page';
import Header from '../(components)/header/page';
import Pagination from '../(components)/pagination/page';
import Loading from '../(components)/loading/loading';

const FindService = () => {
  const [allData, setAllData] = useState([]);        // ← Full dataset
  const [loading, setLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [categoryFilter, setcategoryFilter] = useState("");
  const ITEMS_PER_PAGE = 9;

  console.log("service page device " + categoryFilter);
  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      const query = new URLSearchParams({
        category: categoryFilter,
        location: " ",
        search: "",
        page: page,
        limit: 6,
      });

      if (categoryFilter === "favourites"){
        const res = await fetch(
          `https://eevents-srvx.onrender.com/v1/clients/favorites`
        );
      }

      const res = await fetch(
        `https://eevents-srvx.onrender.com/v1/discovery/services?${query}`
      );


      const data = await res.json();
      setAllData(data.data.data);
      setCurrentPage(data.data.page)
      setTotalPages(data.data.totalPages)
      setLoading(false)
    }

    loadServices();
  }, [categoryFilter] );


  console.log(totalPages)


  return (
    <div className={`main ${styles.service}`}>
      <Header img='/images/servicePage/serviceBG.png' header='Find trusted event services near you.' subHeader='Your next great event starts here.'  />

      <div className={styles.searchContainer}>
        <SearchBar onChange={setcategoryFilter} />
      </div>
      {loading ? <div> <Loading /> </div> : 
        allData.length === 0 ? <div className="sectionHeaderCenter"><p className="txtHeader">No items yet. Be the first to add one</p></div> :
          <div className='cardPack'>  
            {allData.map((data) => (   
              <ProductCard 
                key={data.id} 
                prodId={data.id}
                title={data.serviceName} 
                description={data.serviceDescription} 
                category={data.category} 
                ratings={data.ratings} 
                price={data.startingPrice} 
                thumb={data.serviceImage}
                vendorName={data.vendorName}
                vendorImg={data.vendorProfileImage}
              />
            ))} 
          </div>
      }
      {/* PAGINATION 
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
    </div>
  );
};

export default FindService; */



'use client';

import styles from './page.module.css';
import SearchBar from '../(components)/searchBar/searchBar';
import { useEffect, useState } from 'react';
import ProductCard from '../(components)/productCard/page';
import Header from '../(components)/header/page';
import Pagination from '../(components)/pagination/page';
import Loading from '../(components)/loading/loading';

const FindService = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryFilter, setcategoryFilter] = useState("");
  const [error, setError] = useState(null);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      setError(null);

      try {
        let res;

        if (categoryFilter === "favourites") {
          res = await fetch(
            `https://eevents-srvx.onrender.com/v1/clients/favorites`
          );
        } else {
          const query = new URLSearchParams({
            category: categoryFilter,
            location: "",
            search: "",
            page: currentPage,
            limit: ITEMS_PER_PAGE,
          });

          res = await fetch(
            `https://eevents-srvx.onrender.com/v1/discovery/services?${query.toString()}`
          );
        }

        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        const data = await res.json();

        setAllData(data.data.data || []);
        setCurrentPage(data.data.page || 1);
        setTotalPages(data.data.totalPages || 0);
      } catch (err) {
        console.error("Failed to load services", err);
        setError(err.message || "Something went wrong");
        setAllData([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, [categoryFilter, currentPage]);

  return (
    <div className={`main ${styles.service}`}>
      <Header
        img='/images/servicePage/serviceBG.png'
        header='Find trusted event services near you.'
        subHeader='Your next great event starts here.'
      />

      <div className={styles.searchContainer}>
        <SearchBar
          onChange={(cat) => {
            setcategoryFilter(cat);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading && (
        <div>
          <Loading />
        </div>
      )}

      {error && (
        <div className="sectionHeaderCenter">
          <p className="txtHeader">{error}</p>
        </div>
      )}

      {!loading && !error && allData.length === 0 && (
        <div className="sectionHeaderCenter">
          <p className="txtHeader">No items yet. Be the first to add one</p>
        </div>
      )}

      {!loading && !error && allData.length > 0 && (
        <div className='cardPack'>
          {allData.map((data) => (
            <ProductCard
              key={data.id}
              prodId={data.id}
              title={data.serviceName}
              description={data.serviceDescription}
              category={data.category}
              ratings={data.ratings}
              price={data.startingPrice}
              thumb={data.serviceImage}
              vendorName={data.vendorName}
              vendorImg={data.vendorProfileImage}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={!loading ? setCurrentPage : () => {}}
      />
    </div>
  );
};

export default FindService;
