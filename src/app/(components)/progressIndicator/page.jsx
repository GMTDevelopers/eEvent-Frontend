import styles from './progress.module.css';

const ProgressIndicator  = ({ currentStep, steps }) => {
    return ( 
        <div className={styles.progressContainer}>
            {steps?.map((step, index) => (
                <div key={step.id} className={styles.stepWrapper}>
                <div
                    className={`${styles.stepCircle} ${
                    currentStep >= step.id ? styles.active : ''
                    } ${currentStep > step.id ? styles.completed : ''}`}
                >
                    {currentStep > step.id ? '✓' : step.id}
                </div>
                <span
                    className={`${styles.stepLabel} ${
                    currentStep >= step.id ? styles.activeLabel : ''
                    }`}
                >
                    {step.label}
                </span>
                {index < steps.length - 1 && <div className={styles.line} />}
                </div>
            ))}
        </div>
    );
}
 
export default ProgressIndicator ;

