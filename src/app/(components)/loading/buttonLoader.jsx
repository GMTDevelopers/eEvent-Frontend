import styles from "./buttonLoader.module.css";

export default function ButtonLoader() {
  return (
    <span className={styles.wrapper}>
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </span>
  );
}
