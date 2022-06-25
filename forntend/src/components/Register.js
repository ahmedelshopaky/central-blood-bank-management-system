import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./../network/axios";

export default function Register() {
  const navigate = useNavigate();

  const emailRegExp = /(.+)@(.+){2,}\.(.+){2,}/;
  const nameRegExp = /^[a-zA-Z ]+$/;
  const nationalIdRegExp =
    /(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/;
  const dateRegExp = /^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/;

  const [isValid, setIsValid] = useState(false);
  const [form, setForm] = useState({
    name: "",
    nationalId: "",
    email: "",
    city: "",
    lastDonation: "",
  });
  const [errors, setErrors] = useState({
    name: "This field is required",
    nationalId: "This field is required",
    email: "This field is required",
    city: "This field is required",
    lastDonation: "This field is required",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    switch (e.target.name) {
      case "name":
        setErrors({
          ...errors,
          name:
            e.target.value.length === 0
              ? "This field is required"
              : !e.target.value.match(nameRegExp) ||
                e.target.value.length < 5 ||
                e.target.value > 50
              ? "Invalid name"
              : null,
        });
        break;

      case "nationalId":
        setErrors({
          ...errors,
          nationalId:
            e.target.value.length === 0
              ? "This field is required"
              : !e.target.value.match(nationalIdRegExp)
              ? "Invalid national id"
              : null,
        });
        break;

      case "email":
        setErrors({
          ...errors,
          email:
            e.target.value.length === 0
              ? "This field is required"
              : !e.target.value.match(emailRegExp)
              ? "Invalid E-mail"
              : null,
        });
        break;

      case "city":
        setErrors({
          ...errors,
          city:
            e.target.value.length === 0
              ? "This field is required"
              : !e.target.value.match(nameRegExp) ||
                e.target.value.length < 5 ||
                e.target.value > 50
              ? "Invalid city name"
              : null,
        });
        break;

      case "lastDonation":
        setErrors({
          ...errors,
          lastDonation:
            e.target.value.length === 0
              ? "This field is required"
              : !e.target.value.match(dateRegExp)
              ? "Invalid date"
              : null,
        });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    Object.values(errors).forEach((err) => {
      if (err !== null) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    });
  }, [errors]);

  const sendRequest = () => {
    axiosInstance
      .post("register", form)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <div className="card w-75 mx-auto shadow p-5 mt-5">
      <div>
        <div className="form-group input-group mb-4">
          <div className="form-group input-group mb-4">
            <div className="input-group-prepend w-25">
              <span className="input-group-text">
                <i className="fa fa-user p-1 m-auto"></i>
              </span>
            </div>
            <input
              onChange={handleChange}
              name="name"
              className="form-control"
              placeholder="Name"
              type="text"
            />
          </div>
          <div className="input-group-prepend w-25">
            <span className="input-group-text">
              <i className="fa fa-solid fa-id-badge p-1 m-auto"></i>
            </span>
          </div>
          <input
            onChange={handleChange}
            name="nationalId"
            className="form-control"
            placeholder="National ID"
            type="number"
          />
        </div>
        <div className="form-group input-group mb-4">
          <div className="input-group-prepend w-25">
            <span className="input-group-text">
              <i className="fa fa-solid fa-envelope p-1 m-auto"></i>
            </span>
          </div>
          <input
            onChange={handleChange}
            name="email"
            className="form-control"
            placeholder="E-mail"
            type="email"
          />
        </div>
        <div className="form-group input-group mb-4">
          <div className="input-group-prepend w-25">
            <span className="input-group-text">
              <i className="fa fa-solid fa-home p-1 m-auto"></i>
            </span>
          </div>
          <input
            onChange={handleChange}
            name="city"
            className="form-control"
            placeholder="City"
            type="text"
          />
        </div>
        <div className="form-group input-group mb-4">
          <div className="input-group-prepend w-25">
            <span className="input-group-text">
              <span className="m-auto">Last Donation</span>
            </span>
          </div>
          <input
            onChange={handleChange}
            name="lastDonation"
            className="form-control"
            placeholder="Last Donation"
            type="date"
          />
        </div>
      </div>
      <div className="form-group text-center">
        <button
          type="submit"
          className="my-btn btn btn-dark w-100"
          onClick={handleClick}
          disabled={!isValid}
        >
          Register
        </button>
      </div>
    </div>
  );
}
