import * as argon2 from "argon2";
import * as crypto from "crypto";

// based on: https://supertokens.com/blog/password-hashing-salting
 
const hashingConfig = { // based on OWASP cheat sheet recommendations (as of March, 2022)
    parallelism: 1,
    memoryCost: 64000, // 64 mb
    timeCost: 3 // number of itetations
}
 
export async function hashPassword(password: string) {
    const salt = crypto.randomBytes(16);
    return await argon2.hash(password, {
        ...hashingConfig,
        salt,
    })
}
 
export async function verifyPasswordWithHash(password: string, hash: string) {
    return await argon2.verify(hash, password, hashingConfig);
}
 