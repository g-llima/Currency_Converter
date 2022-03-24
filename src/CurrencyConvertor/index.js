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
      //getCurrencyConvertor();
    }
  }, []);

  return (
    <div className="convertor">
      <div className="convertor__header">
        <p1>Taxa de Câmbio</p1>
        <h1>$27.77</h1>
      </div>

      <div className="convertor__body">
        <form className="convertor__body__form">
          <label for="valor">Valor</label>
          <input type="number" id="valor" name="valor" />

          <div className="convertor__body__form__currencies">
            <label for="moeda1">De</label>
            <select id="moeda1" name="moeda1">
              <option value="USD">USD</option>
              <option value="BRL">BRL</option>
              <option value="EUR">EUR</option>
            </select>

            <i className="fa-solid fa-arrow-right-arrow-left"></i>

            <label for="moeda2">Para</label>
            <select id="moeda2" name="moeda2">
              <option value="USD">USD</option>
              <option value="BRL" selected>
                BRL
              </option>
              <option value="EUR">EUR</option>
            </select>

            {/*  */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Convertor;
