import CountDown from "../CountDown";
import { Link } from "react-router-dom";
import Container from "../../util/Container";
import Heading from "../ui/Heading";

function EventCard({ active }) {
 

 
  const bgImg = "/assets/bg-1.jpg";
  return (
    <Container styles={"my-4"}>
      <Heading>Deals and outlets</Heading>
      <div
        className={`bg-cover bg-no-repeat py-4 px-2 400px:py-[36px] 400px:px-[40px] flex flex-col gap-6 mt-4`}
        style={{ backgroundImage: `url(${bgImg})`,backgroundSize:'cover' }}
      >
        <div>
          <h3 className="text-xl font-[500] text-secondary">
            Deal of the Day.
          </h3>
          <p className="text-[12px] text-dot">Limited quantities.</p>
        </div>
        <div>
          <h4 className="text-[16px] max-w-[210px]">
            Home Smart Speaker with Google Assistant
          </h4>
          <p>
            <span className="text-[22px] font-[500] text-secondary">
              $129.00
            </span>
            <span className="text-[22px] font-[500] text-grey-200">
              Was $150.99
            </span>
          </p>
          <Link className="text-sm text-primary">
            Shop now <span>&rarr;</span>
          </Link>
        </div>
        <CountDown eventFinishDate={{ endDate: "2030-10-31T10:07:13.000Z" }} />
      </div>
    </Container>
  );
}
export default EventCard;
