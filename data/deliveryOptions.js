import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOptions[0];
}

/*work is needed here */

export function getDeliveryDateString(deliveryOption){

    const today = dayjs()
    var todayDAY = parseInt(today.format("d"));

    let countDayDifferentFromWeekend = 0;
    const deliveryDays = deliveryOption.deliveryDays;
    let deliveryDay;

    if(todayDAY + deliveryDays > 6){
        deliveryDay = todayDAY + deliveryDays - 6 - 1;
    }else{
        deliveryDay = todayDAY + deliveryDays;
    }

    while ((deliveryDay == 6) || (deliveryDay  == 0)){
        deliveryDay++;
        countDayDifferentFromWeekend++;
    }

    const deliveryDate = today.add(
        deliveryOption.deliveryDays + countDayDifferentFromWeekend,
        'days'
    );

    const dateString = deliveryDate.format(
        'dddd, MMMM D'
    );

    return dateString;
}
