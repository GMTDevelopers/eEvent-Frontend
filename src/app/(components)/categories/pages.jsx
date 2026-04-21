import Image from "next/image";
import styles from './categories.module.css';
    const data = [
        {
            "id": 1,
            "name": "Catering",
            "thumb": "/images/categories/catering.webp",
            "width": 169,
            "height": 125
        },
        {
            "id": 2,
            "name": "Rentals",
            "thumb": "/images/categories/rentals.webp",
            "width": 133,
            "height": 137
        },
        {
            "id": 3,
            "name": "Mc",
            "thumb": "/images/categories/mc.png",
            "width": 139,
            "height":102
        },
        {
            "id": 4,
            "name": "Dj",
            "thumb": "/images/categories/dj.png",
            "width": 159,
            "height": 102
        },
        {
            "id": 5,
            "name": "Muscian",
            "thumb": "/images/categories/entertainment.webp",
            "width": 160,
            "height": 144
        },
        {
            "id": 6,
            "name": "Halls & Venues",
            "thumb": "/images/categories/venues.webp",
            "width": 159,
            "height": 96
        },
        {
            "id": 7,
            "name": "Photography",
            "thumb": "/images/categories/photography.webp",
            "width": 152,
            "height": 115
        },
        {
            "id": 8,
            "name": "Decorations",
            "thumb": "/images/categories/decorations.png",
            "width": 170,
            "height": 139
        },
        {
            "id": 9,
            "name": "Drinks & Wines",
            "thumb": "/images/categories/drinks.webp",
            "width": 145,
            "height": 103
        },
        {
            "id": 10,
            "name": "Musician",
            "thumb": "/images/categories/musician.png",
            "width": 145,
            "height": 97
        }
    ]
const Categories = () => {
    return ( 
        <div className={styles.categories}>
           {data.map((data)=>(
            <div key={data.id} className={styles.categoriesCard}>
                <div className={styles.cardImg}>
                    <Image src={data.thumb} width={data.width} height={data.height} alt="categories"/>
                </div>
                <p>{data.name}</p>
            </div>
           ))}       
        </div>
    );
}
 
export default Categories;