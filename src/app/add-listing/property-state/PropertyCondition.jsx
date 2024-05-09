import styles from './index.module.css'
import { Square, CheckSquare } from 'lucide-react'

export default function PropertyCondition({data, isChecked, toggleSelection}) {
  return (
    <div className={`${styles.socpe_item}`} onClick={()=>toggleSelection(data['title']) }>
        {
          isChecked
            ? <CheckSquare className={`${styles.icon} `}/>
            : <Square className={`${styles.icon} `}/>
        }
        <h3 className={`${styles.scope_title}`}>{data['title']}</h3>
        <p className={`${styles.details}`}>{data['description']}</p>
    </div>
  )
}
