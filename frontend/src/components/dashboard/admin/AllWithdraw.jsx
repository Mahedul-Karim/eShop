import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

import { useHttp } from "../../hooks/useHttp";
import { useSelector } from "react-redux";
import { useToast } from "../../hooks/useToast";
import Table from "../../layout/data-table/Table";
import { formatDate } from "../../../util/helpers";
import Loading from "../common/Loading";

const status = {
  processing: {
    bg: "bg-violet-100",
    text: "text-violet-700",
  },
  succeed: {
    bg: "bg-green-100",
    text: "text-green-700",
  },
};

const AllWithdraw = () => {
  const { token } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");

  const [isLoading, fetchData] = useHttp();

  const { success, error } = useToast();

  useEffect(() => {
    const getAllWithdraw = async function () {
      const withdrawData = await fetchData("withdraw", "GET", {
        authorization: `Bearer ${token}`,
      });
      setData(withdrawData.withdraw);
    };
    getAllWithdraw();
  }, []);

  

  const handleSubmit = async () => {
    try {
      const updateWithdraw = await fetchData(
        `withdraw/${withdrawData._id}`,
        "PATCH",
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        JSON.stringify({ sellerId: withdrawData.seller._id })
      );
      setData((prev) => [
        ...prev.filter((data) => data._id !== withdrawData._id),
        updateWithdraw.withdraw,
      ]);
      success("Payment status updated");
      setOpen(false);
    } catch (err) {
      error(err.message);
    }
  };

  
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pt-5">
          {data?.length > 0 ? (
            <div className="border border-solid border-gray-200 rounded-md text-xs md:text-sm text-black/[0.87] font-Roboto">
              <Table
                extraStyles="hidden lg:grid border-b border-solid font-semibold bg-gray-100"
                columns={"grid-cols-[0.2fr_0.3fr_0.1fr_0.2fr_0.2fr_0.1fr]"}
              >
                <div>Shop Name</div>
                <div>Withdraw Id</div>
                <div>Amount</div>
                <div>Requested At</div>
                <div>Status</div>
                <div />
              </Table>
              {data.map((req, id) => {
                const { bg, text } = status[req?.status?.toLowerCase()];
                return (
                  <Table
                    extraStyles="border-b border-solid items-center gap-3 lg:gap-0"
                    key={req._id}
                    columns={
                      "lg:grid-cols-[0.2fr_0.3fr_0.1fr_0.2fr_0.2fr_0.1fr]"
                    }
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm inline-block lg:hidden">
                        Name:
                      </p>
                      <p>{req?.seller?.name}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm inline-block lg:hidden">
                        Id:
                      </p>
                      {req?._id}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm inline-block lg:hidden">
                        Amount:
                      </p>
                      ${req?.amount}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm inline-block lg:hidden">
                        At:
                      </p>
                      {formatDate(req?.createdAt)}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm inline-block lg:hidden">
                        Status:
                      </p>
                      <p
                        className={`flex items-center justify-center uppercase font-semibold w-fit px-2 md:px-4 rounded-full py-[0.5px] md:py-1 text-[10px] md:text-[11px] ${bg} ${text} whitespace-nowrap max-w-full`}
                      >
                        {req?.status?.toLowerCase()}
                      </p>
                    </div>
                    <button
                      onClick={() => setOpen(true) || setWithdrawData(req)}
                      className={`${
                        req?.status?.toLowerCase() === "succeed"
                          ? "hidden"
                          : "flex"
                      } items-center justify-end lg:justify-normal`}
                    >
                      <BsPencil />
                    </button>
                  </Table>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center text-lg h-full">
              <p>No users were found!</p>
            </div>
          )}

          {open && (
            <div className="w-full fixed h-screen top-0 left-0 bg-[#00000031] z-[9999] flex items-center justify-center">
              <div className="w-[50%] min-h-[40vh] bg-white rounded shadow p-4">
                <div className="flex justify-end w-full cursor-pointer">
                  <RxCross1 size={25} onClick={() => setOpen(false)} />
                </div>
                <h1 className="text-[25px] text-center font-Poppins">
                  Update Withdraw status
                </h1>
                <br />
                <select
                  name=""
                  id=""
                  onChange={(e) => setWithdrawStatus(e.target.value)}
                  className="w-[200px] h-[35px] border rounded"
                >
                  <option value={withdrawStatus}>{withdrawData.status}</option>
                  <option value={withdrawStatus}>Succeed</option>
                </select>
                <button
                  type="submit"
                  className={`w-[150px] bg-black my-3 flex items-center justify-center rounded-xl cursor-pointer text-white !h-[42px] mt-4 text-[18px]`}
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllWithdraw;
