import React from "react";

interface TableRow {
  label: string;
  value: string | boolean | number | null;
  icon: React.ElementType;
  iconColorClass: string;
}

interface ProfileDetailsTableProps {
  title: string;
  rows: TableRow[];
}

const ProfileDetailsTable: React.FC<ProfileDetailsTableProps> = ({
  title,
  rows,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{title}</h2>
      <table className="w-full text-left">
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="py-2 w-2/5">
                <div className="flex items-center space-x-2">
                  <row.icon
                    className={`w-6 h-6 ${row.iconColorClass} flex-shrink-0`} // Fixed width and height
                  />
                  <span className="font-medium">{row.label}:</span>
                </div>
              </td>
              <td className="py-2 w-3/5">
                {row.value ? row.value : "Not provided"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileDetailsTable;
