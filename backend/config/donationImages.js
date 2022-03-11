const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2

const donationImages = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = Date.now() + '-' + (file.originalname)
            const fileInfo = {
                public_id: filename,
                folder: 'donationImages',
                resource_type: "raw" //resource type: raw, to accept all file types
            }
            resolve(fileInfo)
        })
    }
})

module.exports = donationImages