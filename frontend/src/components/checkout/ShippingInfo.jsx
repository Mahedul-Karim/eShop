import { useState } from "react";
import { Country, State } from "country-state-city";

const ShippingInfo = ({
  user,
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
}) => {
  return (
    <div className="w-full bg-white rounded-md">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex flex-col 400px:flex-row pb-3 gap-4">
          <div className="400px:w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={user && user.name}
              disabled
              required
              className={`border p-1 rounded-[5px] w-full`}
            />
          </div>
          <div className="400px:w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={user && user.email}
              disabled
              required
              className={`w-full border p-1 rounded-[5px]`}
            />
          </div>
        </div>

        <div className="w-full flex flex-col 400px:flex-row pb-3 gap-4">
          <div className="400px:w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className={`border p-1 rounded-[5px] w-full`}
            />
          </div>
          <div className="400px:w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`w-full border p-1 rounded-[5px]`}
            />
          </div>
        </div>

        <div className="w-full flex flex-col 400px:flex-row pb-3 gap-4">
          <div className="400px:w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-full border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="400px:w-[50%]">
            <label className="block pb-2">City</label>
            <select
              className="w-full border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex flex-col 400px:flex-row pb-3 gap-4">
          <div className="400px:w-[50%]">
            <label className="block pb-2">Address1</label>
            <input
              type="address"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`border p-1 rounded-[5px] w-full`}
            />
          </div>
          <div className="400px:w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              type="address"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={`w-full border p-1 rounded-[5px]`}
            />
          </div>
        </div>
      </form>
      {user.addresses.length !== 0 && (
        <>
          <h5
            className="text-[18px] cursor-pointer inline-block"
          >
            Choose From saved address
          </h5>

          <div>
            {user.addresses.map((item, index) => (
              <div className="w-full flex mt-1 items-center" key={index}>
                <input
                  type="radio"
                  className="mr-3 w-4 h-4 accent-primary"
                  id={`address-${index}`}
                  name={`address`}
                  value={item.addressType}
                  onClick={() =>
                    setAddress1(item.address1) ||
                    setAddress2(item.address2) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                
                <label htmlFor={`address-${index}`} className="cursor-pointer text-lg">
                  {item.addressType}
                </label>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default ShippingInfo;
