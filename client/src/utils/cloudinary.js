export const cloudinaryUrl = (publicId, width, height) => {
    const cloudName = import.meta.env.VITE_CLOUD_NAME
    let size = '';
    if (width || height) {
        size = [
            width ? `w_${width}` : '',
            height ? `h_${height}` : '',
            width && height ? 'c_fill' : 'c_limit'
        ].filter(Boolean).join(',');
    }
    return `https://res.cloudinary.com/${cloudName}/image/upload/${size},c_fill,q_auto,f_auto/${publicId}.jpg`;
}