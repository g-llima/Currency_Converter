import React from "react";
import "./CSS/CurrencyInput.css";

function CurrencyInput({ currencies, currency, title, change }) {
  return (
    <div className="currencyInput">
      <label htmlFor="moeda1">{title}</label>
      <select id="moeda1" name="moeda1" value={currency} onChange={change}>
        {currencies.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyInput;
