// Install the node-rsa library: npm install node-rsa

const NodeRSA = require('node-rsa');

// Generate RSA key pair
const key = new NodeRSA({ b: 512 }); // 512-bit key, you can adjust the key size

// Get the public and private keys in PEM format
const publicKey = key.exportKey('public');
const privateKey = key.exportKey('private');

console.log('Public Key:\n', publicKey);
console.log('Private Key:\n', privateKey);

// Encrypt a message using the public key
const plaintextMessage = 8;
const encryptedMessage = key.encrypt(plaintextMessage, 'base64');

console.log('Encrypted Message:\n', encryptedMessage);

// Decrypt the message using the private key
const decryptedMessage = key.decrypt(encryptedMessage, 'utf8');

console.log('Decrypted Message:\n', decryptedMessage);
