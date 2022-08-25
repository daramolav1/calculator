import React from "react";
import { useState, useEffect } from "react";
import "./styles.css";
import NumberFormat from "react-number-format";

function Calculator() {
  const [previous, setPrevious] = useState("");
  const [current, setCurrent] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  useEffect(() => {
    setInput(current);
  }, [current]);

  useEffect(() => {
    setInput("0");
  }, []);

  const inputNum = (e) => {
    if (current.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPrevious("");
    }

    current
      ? setCurrent((pre) => pre + e.target.innerText)
      : setCurrent(e.target.innerText);

    setTotal(false);
  };

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);

    if (current === "") return;
    if (previous !== "") {
      equals();
    } else {
      setPrevious(current);
      setCurrent("");
    }
  };

  const equals = (e) => {
    if (e.target.innerText === "=") {
      setTotal(true);
    }

    let cal;

    switch (operator) {
      case "/":
        cal = String(parseFloat(previous) / parseFloat(current));
        break;

      case "x":
        cal = String(parseFloat(previous) * parseFloat(current));
        break;

      case "+":
        cal = String(parseFloat(previous) + parseFloat(current));
        break;

      case "-":
        cal = String(parseFloat(previous) - parseFloat(current));
        break;

      default:
        return;
    }

    setInput("");
    setPrevious(cal);
    setCurrent("");
  };

  const minusPlus = (e) => {
    if (current.charAt(0) === "-") {
      setCurrent(current.substring(1));
    } else {
      setCurrent("-" + current);
    }
  };

  const percent = (e) => {
    previous
      ? setCurrent(String((parseFloat(current) / 100) * previous))
      : setCurrent(String(parseFloat(current) / 100));
  };

  const reset = (e) => {
    setPrevious("");
    setCurrent("");
    setInput("0");
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          {input !== "" || input === "0" ? (
            <NumberFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumberFormat
              value={previous}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
        <div className="btn light-gray" onClick={reset}>
          AC
        </div>
        <div className="btn light-gray" onClick={percent}>
          %
        </div>
        <div className="btn light-gray" onClick={minusPlus}>
          +/-
        </div>
        <div className="btn orange" onClick={operatorType}>
          /
        </div>
        <div className="btn" onClick={inputNum}>
          7
        </div>
        <div className="btn" onClick={inputNum}>
          8
        </div>
        <div className="btn" onClick={inputNum}>
          9
        </div>
        <div className="btn orange" onClick={operatorType}>
          x
        </div>
        <div className="btn" onClick={inputNum}>
          4
        </div>
        <div className="btn" onClick={inputNum}>
          5
        </div>
        <div className="btn" onClick={inputNum}>
          6
        </div>
        <div className="btn orange" onClick={operatorType}>
          +
        </div>
        <div className="btn" onClick={inputNum}>
          1
        </div>
        <div className="btn" onClick={inputNum}>
          2
        </div>
        <div className="btn" onClick={inputNum}>
          3
        </div>
        <div className="btn orange" onClick={operatorType}>
          -
        </div>
        <div className="btn zero" onClick={inputNum}>
          0
        </div>
        <div className="btn" onClick={inputNum}>
          .
        </div>
        <div className="btn" onClick={equals}>
          =
        </div>
      </div>
    </div>
  );
}

export default Calculator;
