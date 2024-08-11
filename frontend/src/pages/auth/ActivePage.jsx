import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../util/base";

function ActivePage() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const activeToken = searchParams.get("token");

  useEffect(() => {
    const activateAccount = async function () {
      try {
        const res = await fetch(`${BASE_URL}/user/activation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ activeToken }),
        });

        const data = await res.json();
        console.log(data);
        if(data.status === 'failed'){
            throw new Error(data.message);
        }
        
      } catch (err) {
        setError(true);
      }
    };
    activateAccount();
  }, [activeToken]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p className="text-3xl">Token has expired!</p>
      ) : (
        <p className="text-3xl">Account Activated!Login now!</p>
      )}
    </div>
  );
}

export default ActivePage;
