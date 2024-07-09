import { Link } from "react-router-dom";
import { useReducer, useState } from "react";
import styles from "../../util/style";
import loginReducer from "../../reducers/formReducer";
import { BASE_URL } from "../../util/base";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [state, dispatchFn] = useReducer(loginReducer, initialState);

  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const handleFormSubmit = async function (e) {
    e.preventDefault();

    try {
      dispatch(userActions.userRequest());
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.email, password: state.password }),
      });

      const data = await res.json();
      if (data.status === "failed") {
        
        throw new Error(data.message);
      }

      dispatchFn({ type: "EMPTY_FORM" });
      dispatch(
        userActions.userRequestSuccess({ user: data.user, token: data.token })
      );
      navigate("/");
      localStorage.setItem(
        "user",
        JSON.stringify({ user: data.user, token: data.token })
      );
    } catch (err) {
      dispatch(userActions.userRequestFailed());
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com/test@gmail.com"
                  autoComplete="email"
                  required
                  value={state.email}
                  onChange={(e) =>
                    dispatchFn({ type: "EMAIL_INPUT", payload: e.target.value })
                  }
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="test1234"
                  value={state.password}
                  onChange={(e) =>
                    dispatchFn({
                      type: "PASSWORD_INPUT",
                      payload: e.target.value,
                    })
                  }
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 accent-primary border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-primary"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to="/signup" className="text-primary pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
