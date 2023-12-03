"use client";
import { Card, Typography } from "@/Context/ThemeContext/ThemeContext";
import Link from "next/link";
import { useEffect, useState } from "react";
const TABLE_HEAD = ["Id", "status", "Type", "Amount", "Status"];

export default function TransactionCradList({ TABLE_ROWS, state }) {
  const [filteredRows, setFilteredRows] = useState(TABLE_ROWS);

  useEffect(() => {
    if (state !== "None") {
      const filteredData = TABLE_ROWS.filter((d) => {
        return d.type === state;
      });
      setFilteredRows(filteredData);
    } else {
      setFilteredRows(TABLE_ROWS);
    }
  }, [state, TABLE_ROWS]);

  return (
    <div>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map(
              ({ id, createdAt, type, amount, status }, index) => {
                const isLast = index === filteredRows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {createdAt}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {type || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {amount} LKR
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color={
                          status === "DONE" || status === "APPROVED"
                            ? "green"
                            : status === "REJECTED" ? "red" : "blue"
                        }
                        className="font-semibold"
                      >
                        {status}{" "}
                        {/* <Link href={`/wallet/refund/${id}`}>
                          <p className="text-red-600 m-[5px] underline">
                            {type === "Expense" && status !== "REFUNDED" ? "Refund" : ""}
                          </p>
                        </Link> */}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
