import styles from './companies.module.css'
import CompaniesTable from './components/CompaniesTable'
import CompanyCard from './components/CompanyCard'
import Heading from './components/heading'
import Rating from './components/RatingComponent'
import RowElement from './components/rowElement'
import SearchBar from './components/SearchBar'
export default function Page() {
  return (
    <div  className={styles.container}>
      <div className={styles.section}>
        <Heading title="Companies" maintitle subTitle='Explore companies offersing internships and find your perfect match'></Heading>
        <SearchBar ></SearchBar>
      </div>
      <div className={styles.section}>
        <Heading title={'Featured Companies'}></Heading>
        <div className='flex flex-row gap-6 flex-wrap  items-center'>
          {[{ title: 'company 1', subTitle: 'comapny 1 sub title' }, { title: 'company 2', subTitle: 'comapny 2 sub title' }, { title: 'company 3', subTitle: 'comapny 3 sub title' }].map((item) =>

            <CompanyCard image='./Final-Logo-1.svg' subtitle={item.subTitle} title={item.title}></CompanyCard>)}

        </div>
      </div>
      <div className={styles.section}>
        <Heading title='All Companies'></Heading>
          <CompaniesTable></CompaniesTable>

      </div>
    </div>

  )
}
