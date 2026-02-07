import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { Modal } from "bootstrap";
import Loading from "../../components/Loading";
import PicModal from "../../components/PicModal";

const { VITE_APP_API_BASE, VITE_APP_API_PATH } = import.meta.env;

const Product = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const modalRefPic = useRef(null);
  const myModalPic = useRef(null);
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bm90JTIwZm91bmR8ZW58MHx8MHx8fDA%3D",
  );

  const getMoreInfo = async (id) => {
    navigate(`/product/${id}`);
    // try {
    //   setIsLoading(true);
    //   const res = await axios.get(
    //     `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/product/${id}`,
    //   );
    //   navigate(`/product/${id}`, { state: { productData: res.data } });
    // } catch (error) {
    //   toast.error(`取得產品資料失敗 ${error}`);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/products`,
        );
        setProducts(res.data.products);
      } catch (error) {
        toast.error(`取得產品資料失敗 ${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
    myModalPic.current = new Modal(modalRefPic.current);
  }, []);

  const getSinglePic = (url) => {
    setPhotoUrl(url);
    if (photoUrl !== "") {
      myModalPic.current.show();
    }
  };

  return (
    <div className="container mt-4">
      <Toaster />
      <Loading isLoading={isLoading} />
      <PicModal modalRef={modalRefPic} photoUrl={photoUrl} />
      <div className="row">
        {products?.map((product) => (
          <div className="col-md-4 mb-3" key={product.id}>
            <div className="card">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.title}
                onClick={() => getSinglePic(product.imageUrl)}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>
                    <del>價格:{product.origin_price} </del>元
                  </strong>
                </p>
                <p className="h4 card-text">
                  <strong>價格:</strong> {product.price} 元
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => getMoreInfo(product.id)}
                >
                  查看更多
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
