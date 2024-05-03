import { useState, FormEvent, ChangeEvent } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  interface formState {
    usernameOrEmail: string;
    password: string;
  }
  interface ErrorResponse {
    detail: string;
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [form, setForm] = useState<formState>({
    usernameOrEmail: "",
    password: "",
  });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.post("/login", {
        usernameOrEmail: form.usernameOrEmail,
        password: form.password,
      });
      if (response.status === 200) {
        setLoading(false);
        setTimeout(() => {
          navigate("/app/home");
        }, 500);
      }
    } catch (error) {
      setLoading(false);
      const axiosError = error as AxiosError<ErrorResponse>;
      if (
        axiosError &&
        axiosError.response &&
        axiosError.response.status === 400
      ) {
        return setErrorMessage(axiosError.response.data.detail);
      }
      setErrorMessage("登录失败，请稍后再试。");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-2xl shadow-xl bg-base-100 rounded-xl">
        <div className="py-24 px-10">
          <h2 className="text-2xl font-semibold mb-2 text-center">登录</h2>
          <form onSubmit={handleLogin}>
            <label className="input input-bordered flex items-center gap-2 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                name="usernameOrEmail"
                value={form.usernameOrEmail}
                onChange={handleFormChange}
                placeholder="用户名或邮箱"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                name="password"
                value={form.password}
                onChange={handleFormChange}
                placeholder="密码"
              />
            </label>
            {/* <div className="text-right text-primary mt-4">
              <Link to="/forgetPassword">
                <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                  忘记密码？
                </span>
              </Link>
            </div> */}
            {errorMessage && (
              <div role="alert" className="alert alert-error mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {loading ? (
              <span className="loading loading-spinner text-primary mt-4"></span>
            ) : (
              <button type="submit" className="btn mt-4 w-full btn-primary">
                登录
              </button>
            )}

            <div className="text-center mt-4">
              没有帐号？
              <Link to="/register">
                <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer">
                  去注册
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
