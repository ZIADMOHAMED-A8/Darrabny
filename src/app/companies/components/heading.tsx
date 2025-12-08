import styles from '../companies.module.css'

export default function Heading({title='',subTitle='',maintitle=false}){
    return (<>
            <h1 className={maintitle ? 'text-4xl font-bold mb-1' : 'text-3xl font-bold mb-4'  } >{title}</h1>
            {subTitle && <p className={styles.sub_title}>{subTitle}</p>}
            </>
    )
}