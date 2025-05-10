const crypto = require('crypto');
const bcrypt = require('bcrypt');

//Encryption method
const { Buffer } = require('node:buffer')
const algorithm = 'aes-256-cbc';
const iv = Buffer.alloc(16, 0);
const key = crypto.randomBytes(32);

//Hashing method with salt
const salts = 10;

const Cipher = {
    createHash: async (message) => { 
        try {
            const hashed = await bcrypt.hash(message, salts);
            return hashed;
        } catch (error) {
            console.log(`Hashing error: ${error}`)
            throw error;
        }   
    },
    compare: async (message, message2) => {
        try {
            console.log(`Compairing passwords...., ${message} and ${message2}`)
            const result = await bcrypt.compare(message, message2);
            return result;   
        } catch (error) {
            console.log("Error comparing hashes.", error.message)
            return false;       
        }
    },
    encrypt: (message) => {
        let cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(message, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    },
    decrypt: (message) => {
        console.log(`Decrypting: ${message}`)
        let decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(message, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        console.log(`Done: ${decrypted}`)
        return decrypted;
    }
}

module.exports = Cipher;

//create hash

//update with message to be hashed

//digest it to something that can be used

