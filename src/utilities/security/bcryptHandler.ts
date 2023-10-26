import * as bcrypt from 'bcrypt'

export async function generateHash(plainPassword: string): Promise<string> {
    const hash = await bcrypt.hash(plainPassword, 8);
    return hash;
}

export async function validateUser(plainPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hash);
}