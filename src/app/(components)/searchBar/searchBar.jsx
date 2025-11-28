'use client';
import styles from './searchBar.module.css';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import SearchFilter from '../search/page';

const SearchBar = () => {

    const [showMore, setShowMore] = useState(false);
    const moreCatRef = useRef(null);
    const {logedInUser} = useAuth()

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


    return ( 
        <div className={styles.searchBar}>
            <div className={styles.bar1}>
                <h3>eEvents Vendors & Services</h3>
                <div className={styles.rightContainer}>
                    <SearchFilter />
                    <div onClick={() => setShowMore(!showMore)} className={styles.searchBtn}>
                        <p>All locations</p>
                        <ChevronDown className={styles.searchMoreIcon} size={20}/>
                    </div>
                    {showMore && (
                        <div className={styles.moreCat} ref={moreCatRef}>
                            <ul>
                                <li>Entertainment</li>
                                <li>Snacks</li>
                                <li>Security</li>
                                <li>Decorative Lights</li>
                                {logedInUser && (<li>Drinks and wines</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.bar2}>
                {logedInUser && (<div className={styles.searchBtn2}>
                    <p style={{color:"#222222"}}>My Favourites </p>
                </div>)}
                <div className={styles.searchBtn2}>
                    <p style={{color:"#222222"}}>All locations</p>
                </div>
                <div className={styles.searchBtn2}>
                    <p style={{color:"#222222"}}>Catering</p>
                </div>
                <div className={styles.searchBtn2}>
                    <p style={{color:"#222222"}}>Rentals</p>
                </div>
                <div className={styles.searchBtn2}>
                    <p style={{color:"#222222"}}>Entertainment</p>
                </div>
                <div className={styles.searchBtn2}>
                    <p style={{color:"#222222"}}>Halls & venues</p>
                </div>
                <div className={styles.searchBtn2}>
                    <p style={{color:"#222222"}}>Photography</p>
                </div>
                <div className={styles.searchBtn2}>
                    <p style={{color:"#222222"}}>Decorations</p>
                </div>
                {logedInUser && (<div className={logedInUser? styles.hidden:searchBtn2}>
                   <p style={{color:"#222222"}}>Drinks and wines</p>
                </div>)}

                <div onClick={() => setShowMore(!showMore)} className={styles.searchBtn2}>
                    <p>more</p>
                    <ChevronDown className={styles.searchMoreIcon} size={20}/>
                </div>
            </div>
        </div>
    );
}
 
export default SearchBar;