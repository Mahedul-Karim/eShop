import { useEffect, useState } from "react";

function CountDown({ eventFinishDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(eventFinishDate?.endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <div className="400px:flex 400px:items-center grid grid-cols-2 gap-4">
      <div className="flex flex-col justify-center items-center gap-2">
        <span className="w-[55px] flex items-center justify-center bg-primary text-white p-3 text-xl rounded-sm">
          {timeLeft?.days}
        </span>
        <span className="text-[10px] text-dot">Days</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <span className="w-[55px] flex items-center justify-center bg-primary text-white p-3 text-xl rounded-sm">
          {timeLeft?.hours}
        </span>
        <span className="text-[10px] text-dot">Hours</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <span className="w-[55px] flex items-center justify-center bg-primary text-white p-3 text-xl rounded-sm">
          {timeLeft?.minutes}
        </span>
        <span className="text-[10px] text-dot">Minutes</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <span className="bg-primary text-white p-3 text-xl rounded-sm w-[55px] flex items-center justify-center">
          {timeLeft?.seconds}
        </span>
        <span className="text-[10px] text-dot">seconds</span>
      </div>
    </div>
  );
}
export default CountDown;
