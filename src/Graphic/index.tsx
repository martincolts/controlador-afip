import React, { useState } from "react";
import Papa, { ParseResult } from "papaparse"
 
type Data = {
    date: string
    type: string
    sellPoint: string
    numberFrom: string
    numberTo: string
    updateCod: string
    authorization: string
    typeReceptorCode: string
    docReceptor: string
    receptorDenomination: string
    changeType: string
    currency: string
    taxNet: string
    noTaxNet: string
    impNoExenras: string
    iva: number
    total: number
  }
  
  type Values = {
    data: Data[]
  }

  function Loader() {
    // State to store parsed data
    const [parsedData, setParsedData] = useState([]);
    const [ total, setTotal ] = useState(0)
    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);
  
    //State to store the values
    const [values, setValues] = useState([]);
  
    const changeHandler = (event) => {
        console.log('TARGET', event.target.files)
      // Passing file data (event.target.files[0]) to parse using Papa.parse
      const files = event.target.files
      const rowsArray = [];
      const valuesArray = [];
      let total = 0
      for (const f of files) {
        console.log(f)
        Papa.parse(f, {
            header: true,
            skipEmptyLines: true,
            complete: function (results: ParseResult<Data>) {

            
              // Iterating data to get column name and their values
              results.data.map((d) => {
                console.log('d', d)
                rowsArray.push(Object.keys(d));
                valuesArray.push(Object.values(d));
                console.log('d[15]', d['Imp. Total'])
                console.log('parseFloat(d[15])',parseFloat(d['Imp. Total']))
                total = total + parseFloat(d['Imp. Total'])
              });
      
              // Parsed Data Response in array format
              setParsedData([parsedData]);
      
              // Filtered Column Names
              setTableRows(rowsArray[0]);
      
              console.log(valuesArray)
              // Filtered Values
              setValues(valuesArray);
              setTotal(total)
            },
          });
      }

    };

    const clear = () => {
        setParsedData([])
        setTableRows([])
        setValues([])
        setTotal(0)
    }

    function currencyFormat(num: number) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }
  
    return (

      <div>
        {currencyFormat(total)}
        {/* File Uploader */}
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          multiple
          style={{ display: "block", margin: "10px auto" }}
        />
        <br />
        <br />
        {/* Table */}
        {tableRows && values && tableRows.length > 0 && values.length > 0 &&
        <table>
          <thead>
            <tr>
              {tableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return <td key={i}>{val}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
  }
        <button onClick={clear}>clear</button>
      </div>
    );
  }

  export default Loader