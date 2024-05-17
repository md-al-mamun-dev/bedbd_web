import styles from './index.module.css';
import LucidIcon from '@/components/LucidIcon';

const Facilities = ({data}) => {

    const {roomCount, guestCount } =  data

    // const _count = guestCount.map(item => (parseInt(item.split(' ')[0])) )
    // const totalGuestnumber = _count.reduce((acc, curr) => acc + curr, 0)
    // const minGuestCount = Math.max(..._count);

    const minGuestCount = guestCount.find(obj => obj.type === 'Adult')['count']
    const maxGuestCount =  guestCount.map(obj => obj.count).reduce((acc, val) => acc + val, 0)

    
    // let guestText = ''
    // if(_count.length > 1){
    //     _count.
    // }

    // console.log(_count)

    // console.log(guestCount)
    const icons =    [
        {
            title:'bedroom',
            iconType:'lucidicon',
            iconName:'bed-double',
        },
        {
            title:'washroom',
            iconType:'lucidicon',
            iconName:'bath',
        },
        {
            title:'guests',
            iconType:'lucidicon',
            iconName:'users',
        },
        {
            title:'diningroom',
            iconType:'lucidicon',
            iconName:'utensils',
        },
        {
            title:'others',
            iconType:'lucidicon',
            iconName:'swatch-book',
        },
    ]

    return  <div className={`${styles.facilities_services}`}>
                {
                    roomCount.map(
                        item => {
                            const icon = icons.find(i => i['title']=== item['name'].replace(/ /g, '').toLowerCase())

                            return ( 
                                <div className={`${styles.service_item}`} >
                                    {
                                        icon 
                                            && ((icon['iconType'] === 'lucidicon') 
                                            &&  <LucidIcon className='opacity-0_70' name={icon['iconName']} size={32} />)
                                        // (icon['iconType'] === 'lucidicon')
                                        // && <LucidIcon name={icon['iconName']} size={32} />
                                        // (srv.icon.type === 'lucidicon') 
                                        // &&  <LucidIcon name={srv.icon.iconName} size={32} />
                                    }
                                    <h1>{item['count']+' '+item['name']}</h1>
                                </div>
                            )}
                        )
                }
                {
                    <div className={`${styles.service_item}`} >

                        <LucidIcon name='users-round' size={32} />
                    <h1>{minGuestCount+'/'+maxGuestCount+' Guests'}</h1>
                </div>
                }
            </div>
        
}

export default Facilities