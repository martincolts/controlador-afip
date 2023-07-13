
interface DataTableProps {
    tableRows: any[]
    values: any[]
}
const DataTable: React.FC<DataTableProps> = ({ tableRows, values }) => {
    
    return <table>
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

export default DataTable