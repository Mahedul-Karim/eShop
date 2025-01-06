import { brandingData } from "../../util/data";
import Container from "../../util/Container";

function Branding() {
  return (
    <div className="bg-white my-12">
      <Container>
        <div
          className={`branding grid sm:grid-cols-2  gap-y-6 md:grid-cols-4 w-full py-8`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-center" key={index}>
                <div>
                  <img src={i.icon} loading="lazy" alt="" width={'40px'} height={"40px"}/>
                </div>
                <div className="px-3">
                  <h3 className="font-semibold">{i.title}</h3>
                  <p className="text-xs lg:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}
export default Branding;
