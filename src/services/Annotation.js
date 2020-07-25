import { sign as metamaskSign } from './ethereum'

class Annotation {
    constructor({ content, issuerEthAddress, tweetAuthor, tweetId }) {
        this.payload = {
            ["@context"]: ["https://pan.network/annotation/v1"],
            issuanceDate: new Date().toJSON(),
            issuer: `urn:ethereum:${issuerEthAddress}`,
            credentialSubject: {
                annotation: content,
                content: `uri:tweet:${tweetAuthor}/${tweetId}`
            },
            proof: {
                created: this.issuanceDate,
                proofPurpose: "PANSubmission",
                type: "EthereumECDSA",
                verificationMethod: "urn:ethereum:messageHash"
            },
            type: ["VerifiableCredential", "PANCredential"]
        }
    }
    async sign() {
        try {
            const signed = await metamaskSign(this.payload)
            this.payload.proof.jws = signed
        } catch (e) {
            console.error(e)
        }
    }
}

export default Annotation