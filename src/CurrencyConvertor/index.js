import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/index.css";
import CurrencyInput from "../Components/CurrencyInput";

function Convertor() {
  const [data, setData] = useState({
    amount: 10,
    convertFrom: "USD",
    convertTo: "BRL",
    result: "",
  });
  const [rates, setRates] = useState([]);

  const getCurrencyConvertor = async () => {
    const response = await axios.get(
      `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_EXCHANGERATEAPI_KEY}&format=1`
    );
    console.log(response.data);
    setRates(response.data.rates);
    console.log(data);
    console.log(rates);
  };
  const getAmount = () => {
    const amountResult =
      (rates[data.convertTo] / rates[data.convertFrom]) * data.amount;
    let decimals = 2;
    while (amountResult.toFixed(decimals) == 0) {
      decimals += 1;
    }
    return amountResult.toFixed(decimals);
  };

  useEffect(() => {
    if (data.amount === isNaN) {
      return;
    } else {
      getCurrencyConvertor();
    }
  }, []);

  return (
    <div className="convertor">
      <div className="convertor__header">
        <p>{data.convertTo}</p>
        <h1>{getAmount()}</h1>
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
              currencies={Object.keys(rates)}
              title="De"
              currency={data.convertFrom}
              change={(e) =>
                setData({ ...data, ["convertFrom"]: e.target.value })
              }
            />
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
            <CurrencyInput
              currencies={Object.keys(rates)}
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
