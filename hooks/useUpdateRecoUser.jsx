import axios from "axios";
import React from "react";

export default function useUpdateRecoUser() {
  const update = async (searches, tags) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update`, {
            searches,
            tags
        }
      );

      console.log(res)
    } catch (err) {
      console.log(err);
    }
  };

  return { update };
}
