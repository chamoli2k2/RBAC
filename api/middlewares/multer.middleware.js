import multer from 'multer';

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Stores files in memory buffer
const upload = multer({ storage }).array('image', 5); // Accepts up to 5 images

export default upload;
