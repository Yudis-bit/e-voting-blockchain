const bcrypt = require('bcrypt');

const hashPassword = async () => {
    const password = '123';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);
};

hashPassword();