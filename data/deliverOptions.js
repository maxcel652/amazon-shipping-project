import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; 

export const deliveryOptions = [{
    id:'1',
    deliveryDays:7,
    priceCents:0
},{
    id:'2',
    deliveryDays:3,
    priceCents:499
},{
    id:'3',
    deliveryDays:1,
    priceCents:999
}]

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach((option)=>{
        if(option.id === deliveryOptionId){
            deliveryOption = option;
        }
    })

    return deliveryOption || deliveryOptions[0];
}


function weekendDaysCount(initialDeliveryDays) {
    let weekendDaysCount = 0
    const weekendDays = ['Saturday', 'Sunday']
    const today = dayjs()
    for (let i = 1; i <= initialDeliveryDays + weekendDaysCount; i++) {
      const check = today.add(i, 'days').format('dddd')
      if (weekendDays.includes(check)) {
        weekendDaysCount++
      }
    }
    return weekendDaysCount
  }

    export function calculateDeliveryDate(deliveryOption) {
        let initialDeliveryDays = deliveryOption.deliveryDays
        let addWeekendDays = 0
        addWeekendDays = weekendDaysCount(initialDeliveryDays)
        const today = dayjs()
        const deliveryDays = initialDeliveryDays + Number(addWeekendDays)
        const deliveryDate = today.add(deliveryDays, 'days')
        const dateString = deliveryDate.format('dddd, MMMM D')
        return dateString
    }