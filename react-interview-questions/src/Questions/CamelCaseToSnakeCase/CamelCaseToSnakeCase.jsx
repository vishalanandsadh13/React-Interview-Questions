import React from "react";
import { useState, useEffect} from "react";

export const CamelCaseToSnakeCase = () => {
  const [string, setstring] = useState("");
  const [convertedString, setConvertedString] = useState("");
  useEffect(() => {
    if (string) {
      convertToSnakeCase(string);
    } else {
      setConvertedString("");
    }
  }, [string]);
  
  const convertToSnakeCase = (camelCaseString) => {
    let snakeCaseString = camelCaseString
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .toLowerCase();
    setConvertedString(snakeCaseString);
  };
  return (
    <div>
      <h1>Camel Case to Snake Case Converter</h1>
      <input
        type="text"
        placeholder="Enter CamelCase string"
        onChange={(e) => setstring(e.target.value)}
        value={string}
      />
      <button onClick={convertToSnakeCase}>Convert</button>
      <p>Converted Snake_Case: {convertedString}</p>
    </div>
  );
};
