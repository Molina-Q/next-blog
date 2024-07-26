import bcrypt from 'bcrypt'

export const saltAndHashPassword = async (password: unknown) => {
    if (typeof password !== "string") {
        throw new Error("Password must be a string")
    }

    const hashedPassword = await bcrypt.hash(password, 10) ;
    return hashedPassword;
}
  