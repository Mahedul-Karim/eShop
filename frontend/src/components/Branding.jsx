
import { brandingData } from "../util/data";
import Container from "../util/Container";

function Branding() {
  return (
    <Container>
      <div className={`hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full border-b-[1px] border-t-[1px] border-solid border-grey-200 bg-white p-8`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
}
export default Branding;
