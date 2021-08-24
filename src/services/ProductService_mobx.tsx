import { autorun } from "mobx";
import { useState } from "react";
import { useEffect } from "react";
import { useXStore } from "store";

//--------------------------------------
// #region Product Service Middleware
//--------------------------------------
export function useXProductService() {
  const { productStore } = useXStore();

  const [store, setStore] = useState({ ...productStore });

  const getTiers = productStore.getTiers;

  useEffect(() => {
    return autorun(() => {
      setStore({ ...productStore });
    });
  }, [productStore]);

  return { productStore: store, getTiers };
}

//--------------------------------------
// #endregion
//--------------------------------------
