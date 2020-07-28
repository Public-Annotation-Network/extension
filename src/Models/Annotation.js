import { sign as metamaskSign } from '../services/ethereum'

class Annotation {
    constructor({ content, issuerEthAddress, tweetAuthor, tweetId, payload }) {
        if (payload) {
            this.payload = payload
            console.log("✅", this)
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
                    created: new Date().toJSON(),
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
        return JSON.stringify(this.payload.credentialSubject.annotation)
    }

    getAuthor() {
        return this.payload.issuer
    }

    getShortAuthor() {
        return this.payload.issuer.split(':')[2].slice(0,8)+"..."
    }

    getDate() {
        return JSON.stringify(new Date(this.payload.issuanceDate))
    }

    getShortDate() {
        return new Date(this.payload.issuanceDate).toLocaleDateString()
    }
}

export default Annotation