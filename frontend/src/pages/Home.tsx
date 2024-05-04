export default function Home() {
  const iframeStyle = {
    width: "100%",
    height: "calc(100vh - 96px)", // 注意，值需要是一个字符串
    border: "none", // 可选: 也可以在这里添加其他样式规则
  };
  return (
    <iframe
      src="https://catw1thu-detect-llm-text.hf.space/?__theme=light"
      style={iframeStyle}
      title="Gradio interface"
    ></iframe>
  );
}

// import { useState } from "react";
// import MyLottieControlComponent from "../components/MyLottie";
// import axios from "axios";

// export default function Home() {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const [text, setText] = useState<string>("");
//   const [pred, setPred] = useState<string>("?");
//   const [prob, setProb] = useState<string>("?");

//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setText(e.target.value);
//   };

//   const handleClear = () => {
//     setText("");
//     setPred("?");
//     setProb("?");
//     setErrorMessage("");
//     setLoading(false);
//   };

//   const handlePredict = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setErrorMessage("");
//     if (text === "") return setErrorMessage("请输入文本");

//     setLoading(true);
//     setPred("?");
//     setProb("?");

//     try {
//       const response = await axios.post("/predict", {
//         text: text,
//       });
//       if (response.status === 200) {
//         setPred(
//           response.data.result[0] === "Human Written"
//             ? "人工书写"
//             : "大模型生成"
//         );
//         setProb((response.data.result[1] * 100).toFixed(2) + "%");
//       }
//     } catch (e) {
//       setErrorMessage("预测失败，请稍后再试。");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="">
//       <h1 className="font-semibold text-4xl mt-1">
//         LLMs or Human Text Detection 🤖
//       </h1>
//       <h4 className="text-xl mt-5">
//         Enter a piece of text and the model will tell you if it was written by
//         LLMs or a Human.
//       </h4>
//       <div className="flex justify-between px-10">
//         <textarea
//           className="textarea textarea-bordered textarea-lg w-full mt-5 flex-auto shadow-xl"
//           rows={5}
//           placeholder="在这里输入文本..."
//           value={text}
//           onChange={handleChange}
//           disabled={loading}
//         ></textarea>
//         <div className="card card-compact bg-base-100 shadow-xl mt-5 flex-auto ml-24">
//           <button
//             className="btn btn-primary btn-outline btn-wide mx-10 mt-8"
//             disabled={loading}
//             onClick={handleClear}
//           >
//             清空 ⚠️
//           </button>
//           <button
//             className="btn btn-success btn-outline btn-wide mx-10 mt-8"
//             disabled={loading}
//             onClick={handlePredict}
//           >
//             预测 🤖
//           </button>
//           <div className="mt-8">
//             <MyLottieControlComponent loading={loading} />
//           </div>

//           <div className="mockup-window border bg-base-300 mx-10 my-12">
//             <div className="flex justify-center px-4 bg-base-200">
//               {errorMessage ? (
//                 <div
//                   role="alert"
//                   className="alert alert-error w-40 mx-4 mt-8 my-12"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="stroke-current shrink-0 h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <span>{errorMessage}</span>
//                 </div>
//               ) : (
//                 <div className="stat stats-vertical shadow">
//                   <div className="stat">
//                     <div className="stat-title">预测结果</div>
//                     <div className="stat-value text-2xl">{pred}</div>
//                   </div>
//                   <div className="stat">
//                     <div className="stat-title">概率</div>
//                     <div className="stat-value text-2xl">{prob}</div>
//                   </div>
//                 </div>
//               )}{" "}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
