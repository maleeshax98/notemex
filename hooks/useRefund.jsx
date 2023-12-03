// import axios from "axios";
// import React from "react";
// import toast from "react-hot-toast";

// export default function useRefund() {
//   const refund = async (id, name, number, bName, email, pNumber) => {
//     try {
//       const promise = toast.promise(
//         axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pay/refund`, {
//           orderId: id,
//           aName: name,
//           aNumber: number,
//           bName: bName,
//           email: email,
//           pNumber: pNumber,
//         }),
//         {
//           loading: "Checking...",
//           success: "Success",
//           error: "Somthing went wrong",
//         }
//       );
//       const res = await promise;
//       console.log(res);
//       const resData = res?.data;

//       if (resData.success) {
//         toast.success(resData.success);
//         window.location.reload();
//       }
//     } catch (err) {
//       console.log(err);
//       if (err?.response?.data?.error) {
//         toast.error(err?.response?.data?.error);
//         return;
//       } else {
//         toast.error("Somthing went wrong!");
//         return;
//       }
//     }
//   };
//   return { refund };
// }
