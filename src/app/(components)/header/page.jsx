import styles from './header.module.css';
const Header = ({img,header, subHeader}) => {
    return ( 
        <header className={styles.header}>
            <img className={styles.serviceHeaderImg} src={img} alt="Service Background"/>
            <div className={styles.headerTxt}>
            <h1>{header}</h1>
            <p className={styles.txtHeader}>{subHeader}</p>
            </div>
        </header>
    );
}
 
export default Header;