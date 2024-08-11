import React from "react";
import { FaTrash } from "react-icons/fa";
import Table from "./Table";

const EventTable = ({ event, handleDelete, isAdmin }) => {
  return (
    <>
      {event.length > 0 ? (
        <div className="border border-solid border-gray-200 ml-2 md:ml-8 rounded-md text-xs md:text-sm text-black/[0.87] font-Roboto my-8">
          <Table
            extraStyles="hidden md:grid border-b border-solid font-semibold bg-gray-100"
            columns={"grid-cols-[0.5fr_0.6fr_0.3fr_0.3fr_0.2fr_0.1fr]"}
          >
            <div>Id</div>
            <div>Name</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Sold</div>

            <div></div>
          </Table>
          {event.map((evnt, id) => {
            return (
              <Table
                extraStyles=" border-b border-solid items-center"
                key={evnt._id}
                columns={
                  "grid-cols-1 md:grid-cols-[0.5fr_0.6fr_0.3fr_0.3fr_0.2fr_0.1fr]"
                }
              >
                <div className="flex md:block items-center justify-between gap-2 text-ellipsis md:w-[70%] lg:w-full max-w-full overflow-hidden">
                  <p className="font-medium text-sm inline-block md:hidden">
                    Id:
                  </p>
                  {evnt._id}
                </div>
                <div className="font-medium w-[95%] line-clamp-2 text-xs lg:text-sm flex items-center justify-between mt-3 md:mt-0">
                  <p className="font-medium text-sm inline-block md:hidden">
                    Name:
                  </p>
                  {evnt?.name}
                </div>
                <div className="font-medium flex items-center gap-6 md:mt-0 mt-3">
                  <p className="font-medium text-sm inline-block md:hidden">
                    Price:
                  </p>
                  ${evnt?.discountPrice}
                </div>
                <div className="font-medium my-3 md:my-0 flex items-center gap-6">
                  <p className="font-medium text-sm inline-block md:hidden">
                    Stock:
                  </p>
                  {evnt?.stock}
                </div>
                <div className="font-medium flex items-center gap-6">
                  <p className="font-medium text-sm inline-block md:hidden">
                    Sold:
                  </p>
                  {evnt?.sold_out}
                </div>

                {!isAdmin && (
                  <button
                    onClick={handleDelete.bind(null, evnt._id)}
                    className="flex justify-end md:justify-normal"
                  >
                    <FaTrash />
                  </button>
                )}
              </Table>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center text-lg h-full">
          <p>No event is happening at this moment!</p>
        </div>
      )}
    </>
  );
};

export default EventTable;
