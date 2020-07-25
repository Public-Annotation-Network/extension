import { sign as metamaskSign } from '../services/ethereum'

class Annotation {
    constructor({ content, issuerEthAddress, tweetAuthor, tweetId, payload }) {
        if (payload) {
            this.payload = payload
        } else {
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
    }
    async sign() {
        try {
            if (this.payload.proof.jws) {
                throw new Error("This annotation has already been signed")
            }
            const signed = await metamaskSign(this.payload)
            this.payload.proof.jws = signed
        } catch (e) {
            console.error(e)
        }
    }

    getContent() {
        return this.payload.credentialSubject.annotation
    }

    getAuthor() {
        return this.payload.issuer
    }

    getDate() {
        return new Date(this.payload.issuanceDate)
    }
}

export default Annotation