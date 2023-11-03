import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineGift } from 'react-icons/ai';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { FiShoppingBag,FiPackage } from 'react-icons/fi';
import { BiMessageSquareDetail } from 'react-icons/bi';
import Logo from '../../ui/Logo';

function ShopDashboardHeader(){

    const { seller } = useSelector(state=>state.seller);

    return <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
    <Logo />
    <div className="flex items-center">
      <div className="flex items-center mr-4">
        <Link to="/dashboard/cupouns" className="800px:block hidden">
          <AiOutlineGift
            color="#555"
            size={30}
            className="mx-5 cursor-pointer"
          />
        </Link>
        <Link to="/dashboard-events" className="800px:block hidden">
          <MdOutlineLocalOffer
            color="#555"
            size={30}
            className="mx-5 cursor-pointer"
          />
        </Link>
        <Link to="/dashboard-products" className="800px:block hidden">
          <FiShoppingBag
            color="#555"
            size={30}
            className="mx-5 cursor-pointer"
          />
        </Link>
        <Link to="/dashboard-orders" className="800px:block hidden">
          <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
        </Link>
        <Link to="/dashboard-messages" className="800px:block hidden">
          <BiMessageSquareDetail
            color="#555"
            size={30}
            className="mx-5 cursor-pointer"
          />
        </Link>
        <Link to={`/shop-home/${seller._id}`}>
          <img
            src={`${seller.avatar?.url}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </Link>
      </div>
    </div>
  </div>
}
export default ShopDashboardHeader;