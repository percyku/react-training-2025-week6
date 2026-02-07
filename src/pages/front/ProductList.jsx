import { RotatingLines } from "react-loader-spinner";
import { currency } from "../../utils/filter";

const ProductList = ({
  products,
  loadingProductId,
  loadingCartId,
  openModal,
  addCart,
}) => {
  return (
    <>
      {" "}
      <table className="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>產品名稱</th>
            <th>價錢</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ width: "200px" }}>
                <div
                  style={{
                    height: "100px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(${product.imageUrl})`,
                  }}
                />
              </td>
              <td>{product.title}</td>
              <td>
                <del className="h6">
                  原價： {currency(product.origin_price)} 元
                </del>
                <div className="h5">特價： {currency(product.price)} 元</div>
              </td>
              <td>
                <div className="btn-group btn-group-sm">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => openModal(product.id)}
                    // disabled={loadingProductId === product.id}
                    disabled={loadingCartId !== null ? true : false}
                  >
                    {loadingProductId === product.id ? (
                      <RotatingLines color="grey" width={80} height={16} />
                    ) : (
                      "查看更多"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => addCart(product.id, 1)}
                    disabled={loadingCartId !== null ? true : false}
                  >
                    {
                      // loadingCartId === product.id ?
                      loadingCartId ? (
                        <RotatingLines color="grey" width={80} height={16} />
                      ) : (
                        "加入購物車"
                      )
                    }
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;
