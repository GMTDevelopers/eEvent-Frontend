import styles from '../../signUp.module.css'
import formStyles from '@/app/navbar/(signIn)/signIn.module.css';
import bStyles from '@/app/find-service/[id]/bookVendor/bookingVendor.module.css';
import { useEffect, useState } from 'react';
const BusinessStep = ({ formData, updateFormData, errors }) => {

    const [countries, setCountries] = useState([]);
    useEffect(() => {
    fetch("https://restcountries.com/v3.1/region/africa?fields=name")
        .then(res => res.json())
        .then(data => {
        const names = data
            .map(c => c.name.common)
            .sort((a, b) => a.localeCompare(b));

        setCountries(names);
        })
        .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
        updateFormData({ [name]: files[0] });
        } else {
        updateFormData({ [name]: value });
        }
    };

    return ( 
        <div className={`${formStyles.signInForm} ${bStyles.bookVendorForm}`}>
            <div>
                <input placeholder='Business name' type="text" name="businessName" value={formData.businessName} onChange={handleChange} />
                {errors.businessName && <p className={styles.error}>{errors.businessName}</p>}
            </div>
            <div>
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="" hidden disabled>Business category</option>
                    <option value="">Select category</option>
                    <option value="Catering">Catering</option>
                    <option value="Catering">Rentals</option>
                    <option value="Catering">Master of ceremony(Mc)</option>
                    <option value="Catering">Dj</option>
                    <option value="Catering">Muscian</option>
                    <option value="Catering">Halls & Venues</option>
                    <option value="Catering">Photography</option>
                    <option value="Catering">Decoration</option>
                    <option value="Catering">Security</option>
                    <option value="Catering">Entertainment</option>
                </select>
                {errors.category && <p className={styles.error}>{errors.category}</p>}
            </div>
            <div>
                <select name="registered" value={formData.registered} onChange={handleChange}>
                    <option value="" hidden disabled>Is your business registered?</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                </select>
                {errors.registered && <p className={styles.error}>{errors.registered}</p>}
            </div>
            {formData.registered === 'True' && (
                <div style={{textAlign:"left", color:"#636363"}}>
                    Upload business certificate 
                    <input placeholder='Upload business certificate' type="file" name="certificate" onChange={handleChange} accept="image/*,.pdf" />
                    {errors.certificate && <p className={styles.error}>{errors.certificate}</p>}
                </div>
            )}
            <div>
                
                <textarea placeholder='Business description' name="description" value={formData.description} onChange={handleChange} />
                {errors.description && <p className={styles.error}>{errors.description}</p>}
            </div>
            <div>
                <input placeholder='Years of experience' type="number" name="experience" value={formData.experience} onChange={handleChange} />
                {errors.experience && <p className={styles.error}>{errors.experience}</p>}
            </div>
            <div>
                <input placeholder='Business address' type="text" name="address" value={formData.address} onChange={handleChange} />
                {errors.address && <p className={styles.error}>{errors.address}</p>}
            </div>
            <div>
                <select name="country" value={formData.country} onChange={handleChange} required >
                    <option value="" disabled>Select country</option>
                    {countries.map(country => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>        
                {errors.country && <p className={styles.error}>{errors.country}</p>}
            </div>
            <div>
                <input placeholder='Operating states' type="text" name="states" value={formData.states} onChange={handleChange} />
                {errors.states && <p className={styles.error}>{errors.states}</p>}
            </div>
        </div>
    );
}
 
export default BusinessStep;