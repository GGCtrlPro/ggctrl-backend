// models/Link.js
export default class Link {
  constructor(walletAddress) {
    this.walletAddress = walletAddress;
    this.createdAt = new Date();
  }
}
