import cloudinary from './cloudinary.js';
import { PassThrough } from 'stream';

const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const uploadParams = {
            folder: 'rbac-images',
            resource_type: 'image',
            timeout: 120000, // Set a 60-second timeout
        };

        const stream = cloudinary.uploader.upload_stream(uploadParams, (error, result) => {
            if (error) {
                console.error('Cloudinary Upload Error:', error);
                return reject(error);
            }
            resolve(result.secure_url);
        });

        const passThroughStream = new PassThrough();
        passThroughStream.end(file.buffer);
        passThroughStream.pipe(stream);
    });
};

export default uploadImageToCloudinary;