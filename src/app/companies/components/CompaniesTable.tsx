import Rating from "./RatingComponent"
import RowElement from "./rowElement"


export default function CompaniesTable() {
    return (
        <div className="w-full overflow-x-auto bg-white rounded-lg shadow">

            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        {['Company', 'Industry', 'Location', 'Rating'].map((item) =>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                {item}
                            </th>)}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {companies.map((company, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                            {[company.name, company.location, company.industry].map((item) =>
                                <RowElement ele={item}></RowElement>
                            )}
                            <Rating rating={company.rating} reviews={company.reviews}></Rating>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

const companies = [
    {
        name: "Tech Innovators Inc.",
        industry: "Technology",
        location: "San Francisco, CA",
        rating: 4.8,
        reviews: 251
    },
    {
        name: "Global Solutions Ltd.",
        industry: "Consulting",
        location: "New York, NY",
        rating: 4.7,
        reviews: 189
    },
    {
        name: "Creative Minds Co.",
        industry: "Design",
        location: "Los Angeles, CA",
        rating: 4.9,
        reviews: 302
    },
    {
        name: "Data Dynamics Corp.",
        industry: "Data Science",
        location: "Chicago, IL",
        rating: 4.6,
        reviews: 156
    },
    {
        name: "Software Solutions Inc.",
        industry: "Software",
        location: "Austin, TX",
        rating: 4.8,
        reviews: 215
    },
    {
        name: "Finance First Group",
        industry: "Finance",
        location: "London, UK",
        rating: 4.7,
        reviews: 193
    }
];
