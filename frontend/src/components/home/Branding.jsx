import { brandingData } from "../../util/data";
import Container from "../../util/Container";

function Branding() {
  return (
    <div className="bg-white my-12 hidden sm:block">
      <Container>
        <div
          className={`branding  grid grid-cols-2 place-items-center gap-y-6 md:grid-cols-4 w-full py-8`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm lg:text-base">{i.title}</h3>
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
