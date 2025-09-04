// src/components/DataTable.jsx
export default function DataTable({ columns = [], data = [] }) {
  return (
    <div className="card">
      <div className="card-body overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className="th-base">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map(col => (
                  <td key={col.key} className="td-base">
                    {typeof col.render === 'function' ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
