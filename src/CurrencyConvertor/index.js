import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/index.css";
import CurrencyInput from "../Components/CurrencyInput";

function Convertor() {
  const [data, setData] = useState({
    amount: 1,
    convertFrom: "USD",
    convertTo: "BRL",
    result: "",
  });
  const [rates, setRates] = useState([]);

  // GET API EXCHANGE RATES & ADD IT TO THE 'RATES' USESTATE
  const getCurrencyConvertor = async () => {
    const response = await axios.get(
      `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_EXCHANGERATEAPI_KEY}&format=1`
    );
    setRates(response.data.rates);
  };

  // GET THE VALUE TO BE DISPLAYED
  const getAmount = () => {
    const amountResult =
      (rates[data.convertTo] / rates[data.convertFrom]) * data.amount;
    let decimals = 2;
    while (amountResult.toFixed(decimals) == 0) {
      decimals += 1;
    }
    return amountResult.toFixed(decimals).replace(".", ",");
  };

  // SWAP THE TWO CURRENCIES
  function swapCurrencies() {
    let valUp = data.convertFrom;
    let valDown = data.convertTo;
    setData({ ...data, convertTo: valUp, convertFrom: valDown });
  }

  useEffect(() => {
    getCurrencyConvertor();
  }, []);

  return (
    <div className="convertor">
      {/* HEADER */}
      <div className="convertor__header">
        <p>{data.convertTo}</p>
        <h1 style={{ fontSize: getAmount().length >= 14 ? "20px" : "32px" }}>
          {getAmount()}
        </h1>
      </div>

      {/* BODY */}
      <div className="convertor__body">
        <form className="convertor__body__form">
          <label htmlFor="valor">Valor</label>
          <input
            type="number"
            id="valor"
            name="valor"
            value={data.amount}
            onChange={(e) => {
              if (e.target.value <= 0 || e.target.value === undefined) {
                setData({ ...data, amount: 1 });
                return;
              }
              setData({ ...data, amount: e.target.value });
            }}
          />

          {/* CURRENCIES INPUTS */}
          <div className="convertor__body__form__currencies">
            <CurrencyInput
              currencies={Object.keys(rates)}
              title="De"
              currency={data.convertFrom}
              change={(e) => setData({ ...data, convertFrom: e.target.value })}
            />

            {/* SWAP ICON */}
            <i
              className="fa-solid fa-arrow-right-arrow-left"
              onClick={() => swapCurrencies()}
            ></i>

            <CurrencyInput
              currencies={Object.keys(rates)}
              title="Para"
              currency={data.convertTo}
              change={(e) => setData({ ...data, convertTo: e.target.value })}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Convertor;
