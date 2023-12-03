import axios from "axios";
import toast from "react-hot-toast";

export async function generateHash(note_id) {
  try {
    const getHash = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/pay/hash`,
      {
        merchant_id: process.env.NEXT_PUBLIC_MID,
        note_id,
        payhere_currency: "LKR",
      }
    );

    const data = getHash.data;
    if (data.hash && data.order_id && data.payhere_amount) {
      return data;
    } else {
      toast.error("Somthing went wrong!");
    }
  } catch (err) {
    if (err?.response?.data?.error) {
      return toast.error(err?.response?.data?.error);
    } else {
      return toast.error("Somthing went wrong!");
    }
  }
}
