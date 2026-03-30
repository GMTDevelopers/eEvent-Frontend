'use client'
import { ChevronDown, Plus, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import styles from './searchFilter.module.css'
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from 'next/navigation'

const SearchFilter = ({name, page, onSearch}) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const router = useRouter()
    const [showMore, setShowMore] = useState(false);
    const moreCatRef = useRef(null);
    const {logedInUser} = useAuth()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch){
            onSearch(query);
        }
        console.log('Searching for:', query);
    };

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
        <>
            <div className={styles.bar1}>
                <h3>{name}</h3>
                <div className={styles.rightContainer}>
                    <form onSubmit={handleSubmit} className={styles.searchContainer}>                    
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => {
                                const value = e.target.value;
                                setQuery(value);
                                if (onSearch) {
                                    onSearch(value);
                                }
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Search here"
                            className={styles.searchInput}
                        />
                        <Search className={styles.searchIcon} size={20} />
                    </form>
                    {page==="findService" && <div onClick={() => setShowMore(!showMore)} className={styles.searchBtn}>
                        <p>All locations</p>
                        <ChevronDown className={styles.searchMoreIcon} size={20}/>
                    </div>}
                    {page==="myBookings" && <div onClick={() => setShowMore(!showMore)} className={styles.searchBtn}>
                        <p>Apply filter</p>
                        <ChevronDown className={styles.searchMoreIcon} size={20}/>
                    </div>}
                    {page==="vendorService" && <div onClick={() => router.push('/vendor/service/addService')} className={styles.searchBtn}>
                        <p>Add new service</p>
                        <Plus className={styles.searchMoreIcon} size={20}/>
                    </div>}
                    {showMore && (
                        <div className={styles.moreCat} ref={moreCatRef}>
                            <ul>
                                <li>Entertainment</li>
                                <li>Snacks</li>
                                <li>Security</li>
                                <li>Decorative Lights</li>
                                {logedInUser? <li>Drinks and wines</li> : alert("you need to login")}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
     );
}
 
export default SearchFilter;