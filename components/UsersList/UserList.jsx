"use state";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/preview`
      );
      if (res?.data?.users) {
        setUsers(res?.data?.users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex flex-col justify-center m-10 gap-[10px] p-10 max-w-[1200px]">
        <p className="text-sm text-gray-500">Here are some recent users </p>

      <div className="userList flex gap-[15px] w-[80vw] p-2 justify-center overflow-x-auto  max-w-[1200px]">
        {users.map((u) => (
          <div className="user flex items-center justify-start gap-[5px]" key={u.id}>
            <div className="min-w-[40px] min-h-[40px] overflow-hidden relative rounded-full">
              <Image
                src={
                  u?.image
                }
                alt="User Image"
                fill
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-light text-xs text-gray-500">
            {u?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
