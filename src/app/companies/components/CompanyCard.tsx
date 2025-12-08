import Heading from "./heading"
import Image from "next/image";
import styles from '../companies.module.css'

interface CompanyCardProps {
    image: string;
    title: string;
    subtitle: string;
}

export default function CompanyCard({ image, title, subtitle }: CompanyCardProps) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 w-full md:basis-full lg:basis-[calc(33.333333%-16px)]">
            <div className="h-48 relative bg-gradient-to-br from-blue-50  to-indigo-100 flex items-center justify-center">
                <Image 
                
                    width={120}
                    height={120} 
                    src={image} 
                    alt={title}
                    className="object-contain"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
        </div>
    )
}