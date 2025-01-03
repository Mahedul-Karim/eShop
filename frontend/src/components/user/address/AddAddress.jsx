import { Country, State } from "country-state-city";
import React from "react";

const AddAddress = ({
  handleSubmit,
  country,
  setCountry,
  city,
  setCity,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
  addressType,
  setAddressType,
  addressTypeData,
  isLoading,
}) => {
  return (
    <>
      <h1 className="text-center text-[25px] font-Poppins">Add New Address</h1>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full block p-4">
            <div className="w-full pb-2">
              <label className="block pb-2">Country</label>
              <select
                name=""
                id=""
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-[95%] border h-[40px] rounded-[5px]"
              >
                <option value="" className="block border pb-2">
                  choose your country
                </option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option
                      className="block pb-2"
                      key={item.isoCode}
                      value={item.isoCode}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="w-full pb-2">
              <label className="block pb-2">Choose your City</label>
              <select
                name=""
                id=""
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-[95%] border h-[40px] rounded-[5px]"
              >
                <option value="" className="block border pb-2">
                  choose your city
                </option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option
                      className="block pb-2"
                      key={item.isoCode}
                      value={item.isoCode}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="w-full pb-2">
              <label className="block pb-2">Address 1</label>
              <input
                type="address"
                className={`w-full border p-1 rounded-[5px]`}
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </div>
            <div className="w-full pb-2">
              <label className="block pb-2">Address 2</label>
              <input
                type="address"
                className={`w-full border p-1 rounded-[5px]`}
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>

            <div className="w-full pb-2">
              <label className="block pb-2">Zip Code</label>
              <input
                type="number"
                className={`w-full border p-1 rounded-[5px]`}
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            <div className="w-full pb-2">
              <label className="block pb-2">Address Type</label>
              <select
                name=""
                id=""
                value={addressType}
                onChange={(e) => setAddressType(e.target.value)}
                className="w-[95%] border h-[40px] rounded-[5px]"
              >
                <option value="" className="block border pb-2">
                  Choose your Address Type
                </option>
                {addressTypeData &&
                  addressTypeData.map((item) => (
                    <option
                      className="block pb-2"
                      key={item.name}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className=" w-full pb-2">
              <button
                className={`w-full border border-solid border-border bg-primary text-white disabled:bg-primary/[0.4] p-1 rounded-[5px] mt-5`}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAddress;
