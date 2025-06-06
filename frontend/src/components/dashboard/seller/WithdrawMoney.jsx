import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { orderActions } from "../../../store/orderSlice";
import { useToast } from "../../hooks/useToast";
import { useHttp } from "../../hooks/useHttp";
import { sellerActions } from "../../../store/sellerSlice";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { seller, sellerToken } = useSelector((state) => state.seller);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: "",
    bankAddress: "",
  });

  const { success,error } = useToast();

  const [isLoading, fetchData] = useHttp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };

    try {
      const data = await fetchData(
        "shop",
        "PUT",
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${sellerToken}`,
        },
        JSON.stringify({ withdrawMethod })
      );

      dispatch(
        sellerActions.sellerRequestSuccess({
          seller: data.shop,
          sellerToken: data.token,
        })
      );
      localStorage.setItem(
        "seller",
        JSON.stringify({ seller: data.shop, sellerToken: data.token })
      );
      setPaymentMethod(false);
      success("Withdraw method added successfully");

      setBankInfo({
        bankName: "",
        bankCountry: "",
        bankSwiftCode: null,
        bankAccountNumber: null,
        bankHolderName: "",
        bankAddress: "",
      });
    } catch (err) {
      error(err.message);
    }
  };

  const deleteHandler = async () => {
    try {
      const data = await fetchData("shop", "DELETE", {
        authorization: `Bearer ${sellerToken}`,
      });

      dispatch(
        sellerActions.sellerRequestSuccess({
          seller: data.shop,
          sellerToken: data.token,
        })
      );
      localStorage.setItem(
        "seller",
        JSON.stringify({ seller: data.shop, sellerToken: data.token })
      );
      success("Withdraw method deleted successfully");
    } catch (err) {
      error(err.message);
    }
  };

  const withdrawHandler = async () => {
    const amount = withdrawAmount;

    if (amount < 50 || amount > seller?.availableBalance) {
      return error("You can not withdraw this amount");
    }

    try {
      const data = await fetchData(
        "withdraw",
        "POST",
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${sellerToken}`,
        },
        JSON.stringify({ amount })
      );
      dispatch(
        sellerActions.sellerRequestSuccess({
          seller: data.shop,
          sellerToken: data.token,
        })
      );
      localStorage.setItem(
        "seller",
        JSON.stringify({ seller: data.shop, sellerToken: data.token })
      );
      success(
        "Withdraw request is processing.It will take 3days to 7days for processing"
      );
    } catch (err) {
      error(err.message);
    }
  };

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: ${seller?.availableBalance?.toFixed(2)}
        </h5>
        <div
          className={`w-[150px] bg-black  my-3 flex items-center justify-center  cursor-pointer text-white !h-[42px] !rounded`}
          onClick={() =>
            seller?.availableBalance?.toFixed(2) < 50
              ? error("You dont have enough balance to withdraw")
              : setOpen(true)
          }
        >
          Withdraw
        </div>
      </div>
      {open && (
        <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow rounded ${
              paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            } min-h-[40vh] p-3`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className="cursor-pointer"
              />
            </div>
            {paymentMethod ? (
              <div>
                <h3 className="text-[22px] font-Poppins text-center font-[600]">
                  Add new Withdraw Method:
                </h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                      id=""
                      placeholder="Enter your Bank name!"
                      className={`w-full border p-1 rounded-[5px] mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      value={bankInfo.bankCountry}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                      id=""
                      required
                      placeholder="Enter your bank Country!"
                      className={`w-full border p-1 rounded-[5px] mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Swift Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      required
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                      placeholder="Enter your Bank Swift Code!"
                      className={`w-full border p-1 rounded-[5px] mt-2`}
                    />
                  </div>

                  <div className="pt-2">
                    <label>
                      Bank Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name=""
                      id=""
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      required
                      placeholder="Enter your bank account number!"
                      className={`w-full border p-1 rounded-[5px] mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      value={bankInfo.bankHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankHolderName: e.target.value,
                        })
                      }
                      id=""
                      placeholder="Enter your bank Holder name!"
                      className={`w-full border p-1 rounded-[5px] mt-2`}
                    />
                  </div>

                  <div className="pt-2">
                    <label>
                      Bank Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      id=""
                      value={bankInfo.bankAddress}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAddress: e.target.value,
                        })
                      }
                      placeholder="Enter your bank address!"
                      className={`w-full border p-1 rounded-[5px] mt-2`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer mb-3 text-white`}
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] font-Poppins">
                  Available Withdraw Methods:
                </h3>

                {seller && seller?.withdrawMethod ? (
                  <div>
                    <div className="800px:flex w-full justify-between items-center">
                      <div className="800px:w-[50%]">
                        <h5>
                          Account Number:{" "}
                          {"*".repeat(
                            seller?.withdrawMethod.bankAccountNumber.length - 3
                          ) +
                            seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>
                        <h5>Bank Name: {seller?.withdrawMethod.bankName}</h5>
                      </div>
                      <div className="800px:w-[50%]">
                        <AiOutlineDelete
                          size={25}
                          className="cursor-pointer"
                          onClick={() => deleteHandler()}
                        />
                      </div>
                    </div>
                    <br />
                    <h4>Available Balance: {seller?.availableBalance?.toFixed(2)}$</h4>
                    <br />
                    <div className="800px:flex w-full items-center">
                      <input
                        type="number"
                        placeholder="Amount..."
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="800px:w-[100px] w-[full] border 800px:mr-3 p-1 rounded"
                      />
                      <div
                        className={`w-[150px] bg-black my-3 flex items-center justify-center rounded-xl cursor-pointer !h-[42px] text-white`}
                        onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[18px] pt-2">
                      No Withdraw Methods available!
                    </p>
                    <div className="w-full flex items-center">
                      <div
                        className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-[#fff] text-[18px] mt-4`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add new
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
