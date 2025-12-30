import { SiweMessage } from 'siwe'

export async function createSiweMessage(address: string, chainId: number, nonce: string) {
    const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
    })
    return message.prepareMessage()
}
