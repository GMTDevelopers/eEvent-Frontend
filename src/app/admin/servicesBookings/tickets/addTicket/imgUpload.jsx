'use client';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from '@/app/vendor/service/addService/(add-steps)/steps.module.css';

const ImgUpload = ({ galleryFiles, setGalleryFiles }) => {
    const { featuredFile, additionalFiles } = galleryFiles;

    // Update featured file
    const updateFeatured = (newFileObj) => {
        setGalleryFiles(prev => ({ ...prev, featuredFile: newFileObj }));
    };

    // Update additional files
    const updateAdditional = (newFiles) => {
        setGalleryFiles(prev => ({ ...prev, additionalFiles: newFiles }));
    };

    // Cleanup object URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            if (featuredFile?.preview) {
                URL.revokeObjectURL(featuredFile.preview);
            }
            additionalFiles.forEach((item) => {
                if (item?.preview) {
                    URL.revokeObjectURL(item.preview);
                }
            });
        };
    }, [featuredFile, additionalFiles]);

    // Remove file
    const removeFile = useCallback((type, index = null) => {
        if (type === 'featured') {
            if (featuredFile?.preview) URL.revokeObjectURL(featuredFile.preview);
            updateFeatured(null);
        } else if (type === 'additional' && index !== null) {
            const fileObj = additionalFiles[index];
            if (fileObj?.preview) URL.revokeObjectURL(fileObj.preview);

            const newFiles = [...additionalFiles];
            newFiles[index] = null;
            updateAdditional(newFiles);
        }
    }, [featuredFile, additionalFiles]);

    // Featured Image Dropzone
    const onFeaturedDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Featured image must be JPG or PNG only');
            return;
        }

        // Cleanup old preview
        if (featuredFile?.preview) URL.revokeObjectURL(featuredFile.preview);

        updateFeatured({
            file,
            preview: URL.createObjectURL(file)
        });
    }, [featuredFile]);

    const { getRootProps: getFeaturedRoot, getInputProps: getFeaturedInput, isDragActive: featuredDrag } = useDropzone({
        onDrop: onFeaturedDrop,
        accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
        multiple: false,
        maxFiles: 1
    });

    // Additional Files Dropzone
    const onAdditionalDrop = useCallback((index) => (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        // Cleanup old preview
        const oldFile = additionalFiles[index];
        if (oldFile?.preview) URL.revokeObjectURL(oldFile.preview);

        const newFiles = [...additionalFiles];
        newFiles[index] = {
            file,
            preview: (file.type.startsWith('image/'))
                ? URL.createObjectURL(file)
                : null
        };

        updateAdditional(newFiles);
    }, [additionalFiles]);

    const dropzones = additionalFiles.map((item, index) => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop: onAdditionalDrop(index),
            accept: {
                'image/*': ['.jpg', '.jpeg', '.png'],
            },
            multiple: false,
            maxFiles: 1
        });

        return { index, getRootProps, getInputProps, isDragActive, item };
    });

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.formDescription}>
                <p className={styles.title}>UPLOAD IMAGES</p>
            </div>

            {/* Featured Image */}
            <div
                {...getFeaturedRoot()}
                className={styles.cover}
                style={{
                    background: featuredDrag ? '#e6f3ff' : '#CFCFCF',
                    height: featuredFile ? 'auto' : '216px'
                }}
            >
                <input {...getFeaturedInput()} />

                {featuredFile ? (
                    <div className={styles.uploadPack}>
                        {featuredFile.preview && featuredFile.file.type.startsWith('image/') ? (
                            <img src={featuredFile.preview} alt="Featured preview" className={styles.previewImage} />
                        ) : (
                            <div>Selected: {featuredFile.file.name}</div>
                        )}
                        <button
                            className={styles.removeBtn}
                            onClick={(e) => { e.stopPropagation(); removeFile('featured'); }}
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        <h2>+</h2>
                        <div>Upload Featured Image</div>
                        <small>(.jpg, .jpeg, .png)</small>
                    </div>
                )}
            </div>

            {/* Additional 3 Slots */}
            <div className={styles.cover2}>
                {dropzones.map(({ index, getRootProps, getInputProps, isDragActive, item }) => (
                    <div
                        key={index}
                        {...getRootProps()}
                        className={styles.imagePack2}
                        style={{ background: isDragActive ? '#f0f8ff' : '#CFCFCF' }}
                    >
                        <input {...getInputProps()} />

                        {item ? (
                            <div className={styles.imageInnerPack2}>
                                {item.preview ? (
                                    item.file.type.startsWith('image/') ? (
                                        <img src={item.preview} alt="preview" className={styles.previewImage} />
                                    ) : (
                                        <div>File: {item.file.name}</div>
                                    )
                                ) : null}

                                <button
                                    className={styles.removeBtn}
                                    onClick={(e) => { e.stopPropagation(); removeFile('additional', index); }}
                                >
                                    ×
                                </button>
                            </div>
                        ) : (
                            <div className={styles.placeholder}>
                                <h2>+</h2>
                                <div>Upload File</div>
                                <small>(.jpg .jpeg .png)</small>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImgUpload;