import React from "react";

const DynamicTable = ({ columns = [], data = [], height = "400px" }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        {/* Scrollable table container */}
        <div className="overflow-y-auto" style={{ maxHeight: height }}>
          <table className="min-w-full border-collapse text-sm">
            {/* Table Header */}
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="text-left px-4 py-2 border-b font-semibold text-gray-700"
                    style={{ width: col.width || "auto" }}
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`hover:bg-gray-50 ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-2 border-b text-gray-700"
                      >
                        {col.render
                          ? col.render(row[col.dataIndex], row)
                          : row[col.dataIndex]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-4 text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
