import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/index.css";

function Convertor() {
  const [data, setData] = useState({
    currencies: ["USD", "SGD", "PHP", "EUR", "INR"],
    amount: "",
    converTo: "BRL",
    result: "",
    date: "",
  });

  const getCurrencyConvertor = async () => {
    const response = await axios.get(
      `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_EXCHANGERATEAPI_KEY}&format=1`
    );
    console.log(response.data);
  };

  useEffect(() => {
    if (data.amount === isNaN) {
      return;
    } else {
      getCurrencyConvertor();
    }
  }, []);

  return <div className="convertor">index</div>;
}

export default Convertor;
