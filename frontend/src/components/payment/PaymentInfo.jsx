import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import CreditCard from "./payment-type/CreditCard";
import SelectType from "./payment-type/SelectType";
import Paypal from "./payment-type/Paypal";
import Cod from "./payment-type/Cod";

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  codHandler,
  isLoading,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md  py-8">
     
      <div>
        <SelectType
          select={select}
          setSelect={() => setSelect(1)}
          value={1}
          title={"Pay with Debit/credit card"}
        />

        {select === 1 && (
          <CreditCard
            user={user}
            paymentHandler={paymentHandler}
            isLoading={isLoading}
          />
        )}
      </div>

      <br />

      <div>
        <SelectType
          select={select}
          setSelect={() => setSelect(2)}
          value={2}
          title={"Pay with Paypal"}
        />

        {select === 2 && (
          <Paypal
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            isLoading={isLoading}
          />
        )}
      </div>

      <br />
    
      <div>
        <SelectType
          title={"Cash on Delivery"}
          select={select}
          setSelect={() => setSelect(3)}
          value={3}
        />

      
        {select === 3 && (
          <Cod
            setOpen={setOpen}
            isLoading={isLoading}
            codHandler={codHandler}
          />
        )}
      </div>
    </div>
  );
};
export default PaymentInfo;
