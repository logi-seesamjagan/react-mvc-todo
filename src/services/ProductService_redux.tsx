import { useDispatch, useSelector } from "react-redux";
import { apiGetTiers } from "ajax";
import {
  FSA,
  IAppStore,
  IProductStore,
  ProductStoreStatus,
  Tiers,
} from "types";

//--------------------------------------
// #region Action Creatore
//--------------------------------------
function actionLoadingTiers(): FSA<null, ProductStoreStatus> {
  return { type: ProductStoreStatus.LOADING_TIERS, payload: null };
}

function actionLoadTiersSuccess(tiers: Tiers): FSA<Tiers, ProductStoreStatus> {
  return { type: ProductStoreStatus.LOADING_TIERS_SUCCESS, payload: tiers };
}

function actionLoadTiersFailed(
  message: string
): FSA<string, ProductStoreStatus> {
  return { type: ProductStoreStatus.LOADING_TIERS_SUCCESS, payload: message };
}

//--------------------------------------
// #endregion Action Creatore
//--------------------------------------

//--------------------------------------
// #region Product Service Middleware
//--------------------------------------
export function useReduxProductService() {
  const productStore: IProductStore = useSelector<IAppStore, IProductStore>(
    (state) => state.productStore
  );

  const dispatch = useDispatch();

  const getTiers = async function getTiers() {
    if (productStore.status === ProductStoreStatus.LOADING_TIERS) {
      return false;
    }
    dispatch(actionLoadingTiers());
    return apiGetTiers()
      .then((tiers) => {
        dispatch(actionLoadTiersSuccess(tiers));
        return tiers;
      })
      .catch((error) => {
        dispatch(actionLoadTiersFailed(error.message));
        return null;
      });
  };

  return { productStore, getTiers };
}

//--------------------------------------
// #endregion
//--------------------------------------
