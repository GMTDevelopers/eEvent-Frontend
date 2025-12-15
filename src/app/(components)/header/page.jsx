import styles from './header.module.css';
const Header = ({img}) => {
    return ( 
        <header className={styles.header}>
            <img className={styles.serviceHeaderImg} src='/images/servicePage/serviceBG.png' alt="Service Background"/>
            <div className={styles.headerTxt}>
            <h1>Find trusted event services near you.</h1>
            <p className={styles.txtHeader}>Your next great event starts here.</p>
            </div>
        </header>
    );
}
 
export default Header;