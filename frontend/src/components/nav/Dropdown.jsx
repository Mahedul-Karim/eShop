import styles from "../../util/style";
import { useNavigate } from "react-router-dom";

function Dropdown({ categoryData, setDropdown }) {
    const navigate=useNavigate();

    const submitHandle = (category) => {
        navigate(`/products?category=${category.title}`);
        setDropdown(false);
      };
 
    return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categoryData &&
        categoryData.map((category, index) => (
          <div
            key={index}
            className={`${styles.noramlFlex}`}
            onClick={() => submitHandle(category)}
          >
            <img
              src={category.image_Url}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            />
            <h3 className="m-3 cursor-pointer select-none">{category.title}</h3>
          </div>
        ))}
    </div>
  );
}
export default Dropdown;
