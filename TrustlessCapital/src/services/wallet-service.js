import WalletUtils from './wallet-utils';
import * as zksync from '../lib/zksync/build-src/index';

export default class WalletService {

  constructor() {}

  static myInstance = null;
  /**
   * @returns {WalletService}
   */
  static getInstance() {
    if (WalletService.myInstance == null) {
      WalletService.myInstance = new WalletService();
    }

    return this.myInstance;
  }

  setPk(pk) {
    this.pk = pk;
  }

  getProvider = async () => {
    this.syncProvider = await zksync.getDefaultProvider("rinkeby");
  }

  getSyncWallet = async (pk) => {
    try {
      await this.getProvider();
      const ethWallet = WalletUtils.createWallet(pk);
      this.syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, this.syncProvider);
    } catch(e){
        console.log("Failed to get syncWallet:: ", e, e.stack)
    }
    return this.syncWallet; 
  }

  getAccountState = async (pk) => {
    await this.getSyncWallet(pk);
    return this.syncWallet.getAccountState();
  }
}
