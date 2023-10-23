import styles from "../../util/style";
import CountDown from "../CountDown";
import { useSelector } from "react-redux";

function EventCard({ active }) {
  const { event } = useSelector((state) => state.event);

  const maxSale = event && event.find((e) => Math.max(e.sold_out));

  return (
    <>
      {maxSale ? (
        <div
          className={`w-full block bg-white rounded-lg ${
            active ? "unset" : "mb-12"
          } lg:flex p-2`}
        >
          <div className="w-full lg:-w[50%] m-auto">
            <img src={maxSale.images.at(0).url} alt="" />
          </div>
          <div className="w-full lg:[w-50%] flex flex-col justify-center">
            <h2 className={`${styles.productTitle}`}>{maxSale.name} </h2>
            <p>{maxSale.description}</p>
            <div className="flex py-2 justify-between">
              <div className="flex">
                <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                  {maxSale.originalPrice}$
                </h5>
                <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                  {maxSale.discountPrice}$
                </h5>
              </div>
              <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                {maxSale.sold_out} sold
              </span>
            </div>
            <CountDown eventFinishDate={maxSale} />
            <br />
            {/* <div className="flex items-center">
              <Link to={`/product/${data._id}?isEvent=true`}>
                <div className={`${styles.button} text-[#fff]`}>See Details</div>
              </Link>
              <div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(data)}>Add to cart</div>
            </div> */}
          </div>
        </div>
      ) : (
        "No events right now"
      )}
    </>
  );
}
export default EventCard;
