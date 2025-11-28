import styles from "./statscard.module.css";

const StatsCard = ({title, data, icon: Icon}) => {

    return ( 
        <div className={styles.card}>
            <p className={styles.cardTitle}>{title}</p>
            <div className={styles.statPack}>
                <h1 style={{fontStyle:'normal'}}>{data}</h1>
                <div className={styles.icon}>
                   <Icon />
                </div>
            </div>
        </div>
    );
}
 
export default StatsCard;