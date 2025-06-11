import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState("");
  const [operation, setOperation] = useState("");
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === "") {
      setPreviousValue(inputValue.toString());
    } else if (operation) {
      const currentValue = parseFloat(previousValue);
      const result = calculate(currentValue, inputValue, operation);

      setDisplay(result.toString());
      setPreviousValue(result.toString());
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "^":
        return Math.pow(firstValue, secondValue);
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue && operation) {
      const currentValue = parseFloat(previousValue);
      const result = calculate(currentValue, inputValue, operation);

      setDisplay(result.toString());
      setPreviousValue("");
      setOperation("");
      setWaitingForNewValue(true);
    }
  };

  const performFunction = (func: string) => {
    const value = parseFloat(display);
    let result: number;

    switch (func) {
      case "sin":
        result = Math.sin(value);
        break;
      case "cos":
        result = Math.cos(value);
        break;
      case "tan":
        result = Math.tan(value);
        break;
      case "log":
        result = Math.log10(value);
        break;
      case "ln":
        result = Math.log(value);
        break;
      case "√":
        result = Math.sqrt(value);
        break;
      case "x²":
        result = value * value;
        break;
      case "1/x":
        result = 1 / value;
        break;
      case "π":
        result = Math.PI;
        break;
      case "e":
        result = Math.E;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setWaitingForNewValue(true);
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue("");
    setOperation("");
    setWaitingForNewValue(false);
  };

  const clearEntry = () => {
    setDisplay("0");
    setWaitingForNewValue(false);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Scientific Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={display}
          readOnly
          className="text-right text-2xl font-mono bg-gray-50 dark:bg-gray-800"
        />
        
        <div className="grid grid-cols-5 gap-2">
          {/* Function buttons */}
          <Button variant="outline" size="sm" onClick={() => performFunction("sin")}>sin</Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("cos")}>cos</Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("tan")}>tan</Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("log")}>log</Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("ln")}>ln</Button>
          
          <Button variant="outline" size="sm" onClick={() => performFunction("π")}>π</Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("e")}>e</Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("√")}>√</Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("x²")}>x²</Button>
          <Button variant="outline" size="sm" onClick={() => inputOperation("^")}>xʸ</Button>
          
          {/* Memory and clear buttons */}
          <Button variant="destructive" size="sm" onClick={clear}>C</Button>
          <Button variant="outline" size="sm" onClick={clearEntry}>CE</Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("1/x")}>1/x</Button>
          <Button variant="outline" size="sm" onClick={() => inputOperation("×")}>×</Button>
          <Button variant="outline" size="sm" onClick={() => inputOperation("÷")}>÷</Button>
          
          {/* Number pad */}
          <Button variant="outline" size="sm" onClick={() => inputNumber("7")}>7</Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber("8")}>8</Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber("9")}>9</Button>
          <Button variant="outline" size="sm" onClick={() => inputOperation("-")}>-</Button>
          <Button variant="outline" size="sm" onClick={() => inputOperation("+")}>+</Button>
          
          <Button variant="outline" size="sm" onClick={() => inputNumber("4")}>4</Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber("5")}>5</Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber("6")}>6</Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber("1")}>1</Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber("2")}>2</Button>
          
          <Button variant="outline" size="sm" onClick={() => inputNumber("3")}>3</Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber("0")}>0</Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber(".")}>.</Button>
          <Button variant="default" size="sm" onClick={performCalculation} className="col-span-2">=</Button>
        </div>
      </CardContent>
    </Card>
  );
}
