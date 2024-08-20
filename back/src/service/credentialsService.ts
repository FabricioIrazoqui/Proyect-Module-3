
import Credentials from "../entities/Credentials"
import { CredentialsRepository } from "../repositories/CredentialsRepository"

export const validateCredential = async (credentials: {username: string, password: string}) => {
    
    const {username, password} = credentials
    
    try {
        const foundCredential = await CredentialsRepository.findOneBy({ username })

        if (!foundCredential || password !== foundCredential.password) throw new Error('Credenciales incorrectas')
        
        return foundCredential
    } catch (error) {
        throw new Error('Error al intentar validar al usuario')
    }
}

export const createCredential = async (credentialData: Credentials) => {
    
    try {
        const credential = CredentialsRepository.create(credentialData);
        const result = await CredentialsRepository.save(credential);
        return result;

    } catch (error) {
        throw new Error('Error al crear las credenciales')
    }
}
