import axios from 'axios'
import bcrypt from 'bcrypt'

interface User {
    email: string;
    password: string;
}

export const getUserFromDb = async (email: unknown, hashedPassword: unknown) => {
    if (typeof email !== "string") 
        throw new Error("email must be a string")
    
    if (typeof hashedPassword !== "string") 
        throw new Error("Password must be a string")

    let userData: User = {
        email: "",
        password: ""
    };

    axios.get(`/api/user/${email}`).then((res) => {  
        userData = res.data;
    }).catch((error) => {
        console.error("USER", error);
    });

    const isPasswordCorrect = await bcrypt.compare(hashedPassword, userData.password);

    if (isPasswordCorrect) {
        return userData;
    } else {
        throw new Error("Password is incorrect.")
    }
}
  