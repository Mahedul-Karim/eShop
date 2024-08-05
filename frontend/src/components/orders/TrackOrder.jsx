import { useSelector } from "react-redux";
import Table from "../layout/data-table/Table";
import TableBody from "../layout/data-table/TableBody";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);

  return (
    <>
      {orders.length > 0 ? (
        <div className="border border-solid border-gray-200 ml-2 md:ml-8 rounded-md text-xs md:text-sm text-black/[0.87] font-Roboto">
          <Table extraStyles="md:grid hidden border-b border-solid font-semibold bg-gray-100">
            <div>Order Id</div>
            <div>Status</div>
            <div className="md:block hidden">Quantity</div>
            <div>Total</div>
            <div></div>
          </Table>
          {orders.map((order, id) => {
            

            return (
              <Table
                extraStyles="border-b border-solid items-center"
                key={order._id}
              >
                <TableBody
                  order={order}
                  link={`/user/track/order/${order._id}`}
                />
              </Table>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center text-lg h-full">
          <p>You have not placed any order!</p>
        </div>
      )}
    </>
  );
};
export default TrackOrder;
