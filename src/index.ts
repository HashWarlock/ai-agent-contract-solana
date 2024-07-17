import { Request, Response, route } from './httpSupport'
import { renderHtml } from './uiSupport'
import '@phala/sidevm-env'
import { Keypair } from "@solana/web3.js"

function getEd25519Account(salt: string) {
    // const derivedKey = pink.deriveSecret(salt);
    // console.log(derivedKey);
    const keypair = Keypair.fromSecretKey(
      Uint8Array.from([174, 47, 154, 16, 202, 193, 206, 113, 199, 190, 53, 133, 169, 175, 31, 56,
          222, 53, 138, 189, 224, 216, 117, 173, 10, 149, 53, 45, 73, 251, 237, 246,
          15, 185, 186, 82, 177, 240, 148, 69, 241, 227, 167, 80, 141, 89, 240, 121,
          121, 35, 172, 247, 68, 251, 226, 218, 48, 63, 176, 109, 168, 89, 238, 135,]));
    console.log(keypair.publicKey.toBase58());
    return keypair.publicKey.toBase58();
}

// async function signData(account: PrivateKeyAccount, data: string): Promise<string> {
//     const publicKey = account.address;
//     console.log(`Signing data [${data}] with Account [${publicKey}]`);
//     const signature = await account.signMessage({
//         message: data,
//     });
//     console.log(`Signature: ${signature}`);
//     return `\nSigner Public Key: [${publicKey}]\nData Signed: [${data}]\nSignature: [${signature}]`;
// }
//
// async function verifyData(account: PrivateKeyAccount, data: string, signature: any): Promise<string> {
//     const publicKey = account.address;
//     console.log("Verifying Signature with PublicKey ", publicKey);
//     const valid = await verifyMessage({
//         address: publicKey,
//         message: data,
//         signature,
//     });
//     console.log("Is signature valid? ", valid);
//     return `\nSigner Public Key: [${publicKey}]\nData to Verify: [${data}]\nSignature: [${signature}]\nIs Valid? ${valid}`
// }

async function GET(req: Request): Promise<Response> {
    const secret = req.queries?.key ?? '';
    //const secretSalt = req.secret?.secretSalt as string;
    //const getType = (req.queries.type) ? req.queries.type[0] as string : '';
    const account = getEd25519Account("secretSalt");
    // let data = (req.queries.data) ? req.queries.data[0] as string : '';
    // let result = '';
    // try {
    //     if (getType == 'sign') {
    //         result = await signData(account, data)
    //     } else if (getType == 'verify') {
    //         result = await verifyData(account, data, req.queries.signature[0] as string);
    //     } else {
    //         result = `Your derived ECDSA Public Key: [${account.address}]`
    //     }
    // } catch (error) {
    //     console.error('Error:', error);
    //     result = error;
    // }

    return new Response(renderHtml(account));
}

async function POST(req: Request): Promise<Response> {
    return new Response('Not Implemented')
}

export default async function main(request: string) {
    return await route({ GET, POST }, request)
}
