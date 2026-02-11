import { useState, useEffect, useRef, useCallback } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import * as bootstrap from "bootstrap";

import ProductList from "./ProductList";
import Cart from "./Cart";

import ShoppingForm from "../../components/ShoppingForm";
import SingleProductModal from "../../components/SingleProductModal";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

const { VITE_APP_API_BASE, VITE_APP_API_PATH } = import.meta.env;

function Checkout() {
  const [loadingCartId, setLoadingCartId] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [pagination, setPagination] = useState({});
  const [cart, setCart] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const productModalRef = useRef(null);

  // 取得全部產品
  const getProducts = async (page = 1) => {
    try {
      const url = `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/products?page=${page}`;
      const res = await axios.get(url);
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error(`取得產品失敗 ${error.response.data}`);
    }
  };

  // 取得單一產品
  const getProduct = async (id) => {
    setLoadingProductId(id);
    try {
      const url = `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/product/${id}`;
      const response = await axios.get(url);
      setProduct(response.data.product);
    } catch (error) {
      toast.error(`取得單一產品失敗 ${error.response.data}`);
    } finally {
      setLoadingProductId(null);
    }
  };

  // 加入購物車
  const addCart = async (id, num) => {
    setLoadingCartId(id);
    const data = {
      product_id: id,
      qty: num,
    };
    try {
      const url = `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/cart`;
      await axios.post(url, { data });

      getCart();
      toast.success(`加入產品成功 `);
    } catch (error) {
      toast.error(`加入購物車失敗 ${error.response.data}`);
    } finally {
      setLoadingCartId(null);
      productModalRef.current.hide();
    }
  };

  // 取得購物車列表
  const getCart = async () => {
    try {
      const url = `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/cart`;
      const res = await axios.get(url);
      setCart(res.data.data);
    } catch (error) {
      toast.error(`取得購物車失敗 ${error.response.data}`);
    }
  };

  // 開啟產品資訊
  const openModal = async (id) => {
    productModalRef.current.show();
    setCartQuantity(1);
    getProduct(id);
  };

  // 關閉產品資訊
  const closeModal = () => {
    productModalRef.current.hide();
  };

  //處理Pagination page 當前數值
  const changePage = useCallback((e, page) => {
    e.preventDefault();
    getProducts(page);
  }, []);

  useEffect(() => {
    productModalRef.current = new bootstrap.Modal("#productModal", {
      keyboard: false,
      backdrop: "static",
    });

    // Modal 關閉時移除焦點
    document
      .querySelector("#productModal")
      .addEventListener("hide.bs.modal", () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });
    getProducts();
    getCart();
  }, []);

  return (
    <div className="container mt-5">
      <Toaster />
      <Loading isLoading={isLoading} />
      {/* Product Modal */}
      <SingleProductModal
        product={product}
        setCartQuantity={setCartQuantity}
        cartQuantity={cartQuantity}
        addCart={addCart}
        closeModal={closeModal}
      />

      {/* 產品列表 */}
      <ProductList
        products={products}
        loadingProductId={loadingProductId}
        loadingCartId={loadingCartId}
        openModal={openModal}
        addCart={addCart}
      />
      {/* 分頁 */}
      <div className="d-flex justify-content-center">
        <Pagination
          pagination={pagination}
          changePage={changePage}
          loadingProductId={loadingProductId}
        />
      </div>

      {/* 購物車列表 */}
      <Cart
        cart={cart}
        loadingCartId={loadingCartId}
        setIsLoading={setIsLoading}
        getCart={getCart}
        toast={toast}
      />

      {/* 表單資料 */}

      <ShoppingForm
        cart={cart}
        getCart={getCart}
        loadingCartId={loadingCartId}
        setIsLoading={setIsLoading}
        toast={toast}
      />
    </div>
  );
}

export default Checkout;
