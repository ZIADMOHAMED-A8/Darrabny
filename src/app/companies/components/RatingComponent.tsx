export default function Rating({rating=0,reviews=0}){
    return (
                                 <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {rating}
                  </span>
                  <span className="text-sm text-gray-400">
                    ({reviews})
                  </span>
                </div>
              </td>
    )
}