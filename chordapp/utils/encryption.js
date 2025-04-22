const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const Cipher = {
    encrypt: (message) => {
        let cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(message, 'utf8', 'hex');
        encrypted += cipher.final('hex');
    
        return encrypted;
    },
    decrypt: (message) => {
        let decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(message1, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
    
        return decrypted;
    }
}

module.exports = Cipher;
/*
var password = 'Hello can you see me';
var encryptedP = encrypt(password)
var decryptedP = decrypt(encryptedP)
var decryptedP = decrypt(encryptedP)


console.log(`Encrypted: ${encryptedP}`);
console.log(`Decrypted: ${decryptedP}`);
*/

//create hash

//update with message to be hashed

//digest it to something that can be used

