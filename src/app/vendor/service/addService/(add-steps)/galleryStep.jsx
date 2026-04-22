'use client'
import styles from './steps.module.css'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const GalleryStep = ({ formData, updateFormData, errors }) => {
    console.log(errors)
    const [featuredFile, setFeaturedFile] = useState(null)     // for preview only
    const [additionalFiles, setAdditionalFiles] = useState([null, null, null]) // for preview only

    // Upload file to backend and return URL string
    const uploadFile = async (file) => {
        const token = localStorage.getItem("access_token");
        const uploadFormData = new FormData();
        uploadFormData.append("files", file);

        try {
            const res = await fetch("https://eevents-srvx.onrender.com/v1/upload/media", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: uploadFormData,
            });

            if (!res.ok) {
                throw new Error("Upload failed");
            }

            const data = await res.json();
            console.log("gallery url", data.data[0].url)
            return data.data[0].url;   // backend returns string URL
        } catch (error) {
            console.error("File upload error:", error);
            alert("Failed to upload file. Please try again.");
            return null;
        }
    };

    const createPreview = (file) => {
        if (!file) return null;
        return URL.createObjectURL(file);
    };

    const removeFile = useCallback((type, index = null) => {
        if (type === 'featured') {
            if (featuredFile?.preview) {
                URL.revokeObjectURL(featuredFile.preview);
            }
            setFeaturedFile(null);

            updateFormData({
                media: ""
                
            });
        } else if (type === 'additional' && index !== null) {
            const fileToRemove = additionalFiles[index];
            if (fileToRemove?.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }

            const newAdditionalFiles = [...additionalFiles];
            newAdditionalFiles[index] = null;
            setAdditionalFiles(newAdditionalFiles);

            // Remove URL from formData
            const updatedGallery = formData.media.filter((_, i) => i !== index);

            updateFormData({
                media: updatedGallery
            });
        }
    }, [featuredFile, additionalFiles, formData, updateFormData]);

    // Featured Image Drop & Upload
    const onFeaturedDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        // Upload to backend
        const uploadedUrl = await uploadFile(file);
        if (!uploadedUrl) return;

        // Set preview locally
        setFeaturedFile({
            file,
            preview: URL.createObjectURL(file)
        });

        // Save only URL string to formData
        const updatedFeature = [...formData.media];
        updatedFeature[3] = uploadedUrl;

        updateFormData({
            media: updatedFeature.filter(Boolean)                
            
        });
    }, [formData, updateFormData]);

    const { getRootProps: getFeaturedRoot, getInputProps: getFeaturedInput, isDragActive: featuredDrag } = useDropzone({
        onDrop: onFeaturedDrop,
        accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
        multiple: false,
        maxFiles: 1
    });

    // Additional Files Drop & Upload
    const onAdditionalDrop = useCallback((index) => async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        // Upload to backend
        const uploadedUrl = await uploadFile(file);
        if (!uploadedUrl) return;

        // Update preview
        const newAdditionalFiles = [...additionalFiles];
        newAdditionalFiles[index] = {
            file,
            preview: createPreview(file)
        };
        setAdditionalFiles(newAdditionalFiles);

        // Save URL string to formData.gallery array
        const updatedGallery = [...formData.media];
        updatedGallery[index] = uploadedUrl;
/*         const updatedGallery = [...formData.media];
        updatedGallery[index] = uploadedUrl; */

        updateFormData({
            media: updatedGallery.filter(Boolean)     
        });
    }, [additionalFiles, formData, updateFormData]);

    const dropzones = additionalFiles.map((item, index) => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop: onAdditionalDrop(index),
            accept: {
                'image/*': ['.jpg', '.jpeg', '.png'],
                'video/mp4': ['.mp4']
            },
            multiple: false,
            maxFiles: 1
        });

        return { index, getRootProps, getInputProps, isDragActive, item };
    });

    return (
        <div >
        
            <div className={styles.formDescription}>
                <p style={{fontWeight:700}}>UPLOAD IMAGES AND VIDEOS</p>
                <p >PLEASE NOTE: High-quality images attract more clients and increase your chances of getting booked. Your service photos create the first impression of your work, so ensure you upload clear, well-lit, and professional-looking pictures that truly represent your service. Avoid blurry, dark, or watermarked images, as they can affect how clients perceive your brand. Vendors with quality visuals receive up to three times more views and bookings on eEvents. Please note that a minimum of three (3) pictures is required to publish your service.</p>
            </div>
            <p style={{color:'#E50909'}}>{errors?.media}</p>
            <br />
            <div {...getFeaturedRoot()} className={styles.cover} style={{ background: featuredDrag ? '#e6f3ff' : '#CFCFCF', height: featuredFile ? 'auto' : '216px'}}>
                
                <input {...getFeaturedInput()} />

                {featuredFile ? 
                    (
                        <div className={styles.uploadPack}>
                            {
                                featuredFile.preview && featuredFile.file.type.startsWith('image/') ? (
                                <img src={featuredFile.preview} alt="Featured preview" />
                                ) : (
                                <div>Selected: {featuredFile.file.name}</div>
                                )
                            }

                            {/* Remove button */}
                            <button className={styles.removeBtn} onClick={(e) => { e.stopPropagation()
                            removeFile('featured')
                            }}> × </button>
                        </div>
                    ) : (
                        <div>
                            <h2>+</h2>
                            <div>Upload Featured Image</div>
                            <small>(.jpg, .jpeg, .png)</small>
                            <small>image size should not be bigger than 1mb</small>
                        </div>
                    )
                }
            </div>
            <div className={styles.cover2}>
                {dropzones.map(({ index, getRootProps, getInputProps, isDragActive, item }) => (
                <div className={styles.imagePack2} key={index} {...getRootProps()} style={{ background: isDragActive ? '#f0f8ff' : '#CFCFCF',}}>
                    <input {...getInputProps()} />
                    {item ? (
                        <div className={styles.imageInnerPack2}>
                            {item.preview ? (
                                item.file.type.startsWith('image/') ? (
                                    <img src={item.preview} alt="preview" />
                                ) : item.file.type.startsWith('video/') ? (
                                    <video src={item.preview} controls />
                                ) : (
                                        <div >
                                        File: {item.file.name}
                                        <br />
                                        <small>{(item.file.size / 1024 / 1024).toFixed(1)} MB</small>
                                    </div>
                                )
                            ) : null}

                            {/* Remove button */}
                            <button onClick={(e) => { e.stopPropagation(); removeFile('additional', index) }} className={styles.removeBtn} > × </button>

                        </div>
                    ) : (
                    <div>
                        <h2>+</h2>
                        <div>Upload File</div>
                        <small>(.jpg .jpeg .png .mp4)</small>
                         <small>image size should not be bigger than 1mb</small>
                    </div>
                    )}
                </div>
            ))}</div>  
            <br />
             <p style={{color:'#E50909'}}>{errors?.media}</p>
            
            
      
        </div>
    );
};

export default GalleryStep;