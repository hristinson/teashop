type TableProps<T extends object> = {
  data: T[];
  columns: (keyof T)[];
  deleteItem?: (id: string) => void;
};

const Table = <T extends object>({
  data,
  columns,
  deleteItem,
}: TableProps<T>) => {
  if (!data.length) return <p>No data to display.</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col as string}
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                backgroundColor: "#f5f5f5",
                textAlign: "left",
              }}
            >
              {String(col).toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td
                key={col as string}
                style={{ border: "1px solid #ccc", padding: "8px" }}
              >
                {String(row[col])}
                {col === "id" && deleteItem ? (
                  <button onClick={() => deleteItem(String(row[col]))}>
                    X
                  </button>
                ) : (
                  <></>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
