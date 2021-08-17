import { useXProductService } from "./ProductService_mobx";
import { useReduxProductService } from "./ProductService_redux";

export const useProductService =
  process.env.REACT_APP_STORE === "mobx"
    ? useXProductService
    : useReduxProductService;
