import { useForm } from "react-hook-form";
import axios from "axios";

const { VITE_APP_API_BASE, VITE_APP_API_PATH } = import.meta.env;

const ShoppingForm = ({
  cart,
  getCart,
  loadingCartId,
  setIsLoading,
  toast,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "percy",
      email: "test123@gmail.com",
      tel: "123456789",
      address: "123",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const url = `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/order`;
      if (!cart.carts.length) {
        toast.error("購物車沒有商品！");
        return;
      }
      await axios.post(url, { data: { user: data, message: data.message } });
      reset();
      getCart();
      toast.success("訂單提交成功！");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {" "}
      <div className="my-5 row justify-content-center">
        <form onSubmit={handleSubmit(onSubmit)} className="col-md-6">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              收件人姓名
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              placeholder="請輸入姓名"
              {...register("name", {
                required: "請輸入收件人姓名。",
                minLength: {
                  value: 2,
                  message: "姓名最少兩個字",
                },
              })}
            />
            {errors.name && (
              <p className="text-danger mt-3">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="請輸入 Email"
              {...register("email", {
                required: "請輸入 Email。",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email 格式不正確。",
                },
              })}
            />
            {errors.email && (
              <p className="text-danger mt-3">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="tel" className="form-label">
              收件人電話
            </label>
            <input
              id="tel"
              name="tel"
              type="tel"
              className="form-control"
              placeholder="請輸入電話"
              {...register("tel", {
                required: "請輸入收件人電話。",
                minLength: {
                  value: 8,
                  message: "電話號碼至少需要 8 碼。",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "電話號碼格式不正確，僅限數字。",
                },
              })}
            />
            {errors.tel && (
              <p className="text-danger mt-3">{errors.tel.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              收件人地址
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="form-control"
              placeholder="請輸入地址"
              {...register("address", { required: "請輸入收件人地址。" })}
            />
            {errors.address && (
              <p className="text-danger mt-3">{errors.address.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              留言
            </label>
            <textarea
              id="message"
              name="message"
              className="form-control"
              placeholder="留言"
              rows="3"
              {...register("message")}
            />
          </div>

          <div className="text-end">
            <button
              type="submit"
              className="btn btn-danger"
              disabled={loadingCartId !== null ? true : false}
            >
              送出訂單
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShoppingForm;
