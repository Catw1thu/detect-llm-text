import { useState, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

export default function Register() {
  const navigate = useNavigate();
  interface formState {
    username: string;
    password: string;
    email: string;
  }
  interface ErrorResponse {
    detail: string;
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [form, setForm] = useState<formState>({
    username: "",
    password: "",
    email: "",
  });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (form.username.trim().length < 3)
      return setErrorMessage("用户名至少5个字符");
    if (form.username.trim().length > 32)
      return setErrorMessage("用户名至多32个字符");
    if (form.password.trim().length < 6)
      return setErrorMessage("密码至少6个字符");
    if (form.password.trim().length > 32)
      return setErrorMessage("密码至多32个字符");
    if (!form.email.includes("@"))
      return setErrorMessage("请提供有效的电子邮件地址");

    setLoading(true);

    const user = {
      username: form.username,
      password: form.password,
      email: form.email,
    };

    try {
      const response = await axios.post("/register", user);
      if (response.status === 201) {
        setLoading(false);
        setErrorMessage("");
        setSuccessMessage("注册成功,即将跳转到登录页面...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      const axiosError = error as AxiosError<ErrorResponse>;
      console.log(axiosError.response);
      if (
        axiosError &&
        axiosError.response &&
        axiosError.response.status === 400
      ) {
        return setErrorMessage(axiosError.response.data.detail);
      }
      setErrorMessage("注册失败，请稍后再试。");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-2xl shadow-xl bg-base-100 rounded-xl">
        <div className="py-24 px-10">
          <h2 className="text-2xl font-semibold mb-2 text-center">注册</h2>
          <form onSubmit={handleRegister}>
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
                name="username"
                value={form.username}
                onChange={handleFormChange}
                placeholder="用户名"
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
            <label className="input input-bordered flex items-center gap-2 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                name="email"
                value={form.email}
                onChange={handleFormChange}
                placeholder="邮箱"
              />
            </label>
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
            {successMessage && (
              <div role="alert" className="alert alert-success mt-4">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}

            {loading ? (
              <span className="loading loading-spinner text-primary mt-4"></span>
            ) : (
              <button type="submit" className="btn mt-4 w-full btn-primary">
                注册
              </button>
            )}

            <div className="text-center mt-4">
              已有帐号？
              <Link to="/login">
                <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer">
                  去登录
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
