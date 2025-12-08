export default function RowElement({ele=''}){
    return (
                      <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {ele}
                </div>
              </td>
    )
}