import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ShopDashboardHeader({ isAdmin }) {
  const { seller } = useSelector((state) => state.seller);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex py-2 items-center justify-end shadow-sm pr-6">
      {!isAdmin ? (
        <Link to={`/shop-home/${seller._id}`}>
          <img
            src={`${seller.avatar?.url}`}
            alt=""
            className="w-[40px] h-[40px] rounded-full object-contain border border-solid"
          />
        </Link>
      ) : (
        <img
          src={`${user?.avatar?.url}`}
          alt=""
          className="w-[40px] h-[40px] rounded-full object-contain border border-solid"
        />
      )}
    </div>
  );
}
export default ShopDashboardHeader;
