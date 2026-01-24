'use client';
import styles from './searchBar.module.css';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import SearchFilter from '../search/page';

const SearchBar = ({ onChange }) => {

    const [showMore, setShowMore] = useState(false);
    const moreCatRef = useRef(null);
    const {logedInUser} = useAuth()
    const [category, setCategory] = useState()
    const [activeTab, setActiveTab] = useState('All Services')

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
                <SearchFilter name='eEvents Vendors & Services' page="findService"/>
            </div>
            <div className={styles.bar2}>
                {logedInUser && (<div className={styles.searchBtn2} onClick={() => {onChange("favourites"); setActiveTab('Favourites')}} style={activeTab === "Favourites" ? {backgroundColor:"#82027D", color:"#ffffff"} : {backgroundColor:"inherit", color:"#222222"}}>
                    <p>My Favourites </p>
                </div>)}
                <div className={styles.searchBtn2} onClick={() => {onChange(""); setActiveTab('All Services')}} style={activeTab === "All Services" ? {backgroundColor:"#82027D", color:"#ffffff"} : {backgroundColor:"inherit", color:"#222222"}}>
                    <p>All Services</p>
                </div>
                <div className={styles.searchBtn2} onClick={() => {onChange("Makeup Artist") ; setActiveTab('Makeup')}} style={activeTab === "Makeup" ? {backgroundColor:"#82027D", color:"#ffffff"} : {backgroundColor:"inherit", color:"#222222"}}>
                    <p>Makeup</p>
                </div>
                <div className={styles.searchBtn2} onClick={() => {onChange("Event Planner") ; setActiveTab('Event Planner')}} style={activeTab === "Event Planner" ? {backgroundColor:"#82027D", color:"#ffffff"} : {backgroundColor:"inherit", color:"#222222"}}>
                    <p>Planner</p>
                </div>
                <div className={styles.searchBtn2} onClick={() => {onChange("Music & DJ") ; setActiveTab('Entertainment')}} style={activeTab === "Entertainment" ? {backgroundColor:"#82027D", color:"#ffffff"} : {backgroundColor:"inherit", color:"#222222"}}>
                    <p>Entertainment</p>
                </div>
                <div className={styles.searchBtn2} onClick={() => {onChange("Venue"); setActiveTab('Halls & venues')}} style={activeTab === "Halls & venues" ? {backgroundColor:"#82027D", color:"#ffffff"} : {backgroundColor:"inherit", color:"#222222"}}>
                    <p>Halls & venues</p>
                </div>
                <div className={styles.searchBtn2} onClick={() => {onChange("Photography"); setActiveTab('Photography')}} style={activeTab === "Photography" ? {backgroundColor:"#82027D", color:"#ffffff"} : {backgroundColor:"inherit", color:"#222222"}}>
                    <p>Photography</p>
                </div>
                <div className={styles.searchBtn2} onClick={() => {onChange("Decorations"); setActiveTab('Decorations')}} style={activeTab === "Decorations" ? {backgroundColor:"#82027D", color:"#ffffff"} : {backgroundColor:"inherit", color:"#222222"}}>
                    <p>Decorations</p>
                </div>
                {logedInUser && (<div className={logedInUser? styles.hidden:searchBtn2}>
                   <p>Drinks and wines</p>
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