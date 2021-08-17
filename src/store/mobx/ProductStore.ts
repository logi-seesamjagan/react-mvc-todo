import { makeAutoObservable } from "mobx";
import { apiGetTiers } from "../../ajax";
import { IProductStore, ProductStoreStatus, Tiers } from "../../types";

class ProductStore implements IProductStore {
  tiers: Tiers | null = null;
  status: ProductStoreStatus = ProductStoreStatus.IDLE;
  message: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getTiers() {
    if (this.status === ProductStoreStatus.LOADING_TIERS) {
      return false;
    }
    this.status = ProductStoreStatus.LOADING_TIERS;
    return apiGetTiers()
      .then((tiers) => {
        this.tiers = tiers;
        this.status = ProductStoreStatus.IDLE;
        this.message = null;
        return tiers;
      })
      .catch((error) => {
        this.status = ProductStoreStatus.LOADING_TIERS_FAILED;
        this.tiers = null;
        this.message = error.message;
        return null;
      });
  }
}

const productStore = new ProductStore();

export default productStore;
