'use client'
import styles from './steps.module.css'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
const GalleryStep = ({ formData, updateFormData, errors }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };
    // file uploader items
    const [featuredFile, setFeaturedFile] = useState(null)     // { file, preview }
    const [additionalFiles, setAdditionalFiles] = useState([null, null, null]) // array of 3

    // Helper to create preview URL
    const createPreview = (file) => {
        if (!file) return null
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            return URL.createObjectURL(file)
        }
        return null // non-media → show filename only
    }

    // Remove file helper
    const removeFile = useCallback((type, index = null) => {
        if (type === 'featured') {
            if (featuredFile?.preview) URL.revokeObjectURL(featuredFile.preview)
            setFeaturedFile(null)
        } else if (type === 'additional' && index !== null) {
            const file = additionalFiles[index]
            if (file?.preview) URL.revokeObjectURL(file.preview)
            const newFiles = [...additionalFiles]
            newFiles[index] = null
            setAdditionalFiles(newFiles)
        }
    }, [featuredFile, additionalFiles])

    // Featured Image Dropzone
    const onFeaturedDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]
            if (!file) return

            // Optional: only images for featured
            if (!file.type.startsWith('image/')) {
            alert('Featured image must be jpg/png')
            return
        }

        // Cleanup old preview if replacing
        if (featuredFile?.preview) URL.revokeObjectURL(featuredFile.preview)

        setFeaturedFile({
            file,
            preview: URL.createObjectURL(file)
        })
    }, [featuredFile])

    const { getRootProps: getFeaturedRoot, getInputProps: getFeaturedInput, isDragActive: featuredDrag } = useDropzone({
        onDrop: onFeaturedDrop,
        accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
        multiple: false,
        maxFiles: 1
    })

    // Additional File Dropzone (for each slot)
    const onAdditionalDrop = useCallback((index) => (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (!file) return

        // Cleanup old preview if replacing
        const oldFile = additionalFiles[index]
        if (oldFile?.preview) URL.revokeObjectURL(oldFile.preview)

        const newFiles = [...additionalFiles]
        newFiles[index] = {
            file,
            preview: createPreview(file)
        }
        setAdditionalFiles(newFiles)
    }, [additionalFiles])

    const dropzones = additionalFiles.map((item, index) => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop: onAdditionalDrop(index),
            accept: {
                'image/*': ['.jpg', '.jpeg', '.png'],
                'video/mp4': ['.mp4']
                // add more if needed
            },
            multiple: false,
            maxFiles: 1
        })

        return { index, getRootProps, getInputProps, isDragActive, item }
    })

    // Cleanup all previews on unmount
    useCallback(() => {
        return () => {
            if (featuredFile?.preview) URL.revokeObjectURL(featuredFile.preview)
            additionalFiles.forEach(f => f?.preview && URL.revokeObjectURL(f.preview))
        }
    }, [featuredFile, additionalFiles])

    return ( 
        <div >
            <div className={styles.formDescription}>
                <p style={{fontWeight:700}}>UPLOAD IMAGES AND VIDEOS</p>
                <p >PLEASE NOTE: High-quality images attract more clients and increase your chances of getting booked. Your service photos create the first impression of your work, so ensure you upload clear, well-lit, and professional-looking pictures that truly represent your service. Avoid blurry, dark, or watermarked images, as they can affect how clients perceive your brand. Vendors with quality visuals receive up to three times more views and bookings on eEvents. Please note that a minimum of three (3) pictures is required to publish your service.</p>
            </div>
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
                    </div>
                    )}
                </div>
            ))}
        </div>
           
            
            
            
        </div>
    );
}
 
export default GalleryStep;