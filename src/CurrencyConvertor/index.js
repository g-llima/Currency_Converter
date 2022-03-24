import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/index.css";
import CurrencyInput from "../Components/CurrencyInput";

const currencies = ["USD", "SGD", "PHP", "EUR", "INR"];

function Convertor() {
  const [data, setData] = useState({
    currencies: ["USD", "SGD", "PHP", "EUR", "INR"],
    amount: "",
    convertFrom: "USD",
    converTo: "BRL",
    result: "",
  });

  const getCurrencyConvertor = async () => {
    const response = await axios.get(
      `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_EXCHANGERATEAPI_KEY}&format=1`
    );
    console.log(response.data);
  };
  function exchange(from, to, valor) {}

  useEffect(() => {
    if (data.amount === isNaN) {
      return;
    } else {
      //getCurrencyConvertor();
    }
  }, []);

  return (
    <div className="convertor">
      <div className="convertor__header">
        <p>Taxa de Câmbio</p>
        <h1>$27.77</h1>
      </div>

      <div className="convertor__body">
        <form className="convertor__body__form">
          <label htmlFor="valor">Valor</label>
          <input
            type="number"
            id="valor"
            name="valor"
            value={data.amount}
            onChange={(e) => setData({ ...data, ["amount"]: e.target.value })}
          />

          <div className="convertor__body__form__currencies">
            {/*  */}
            <CurrencyInput
              currencies={currencies}
              title="De"
              currency={data.convertFrom}
              change={(e) =>
                setData({ ...data, ["convertFrom"]: e.target.value })
              }
            />
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
            <CurrencyInput
              currencies={currencies}
              title="Para"
              currency={data.convertTo}
              change={(e) =>
                setData({ ...data, ["convertTo"]: e.target.value })
              }
            />

            {/*  */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Convertor;
