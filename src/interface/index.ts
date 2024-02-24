interface myCar{
    id?: string
    name: string
    phone: string
    price:number
    num:number
    date?:Date
    imgUrl?: string
    CarouselImg1?: string
    CarouselImg2?: string
    CarouselImg3?: string
    description?: string
}
interface carList{
    productList:myCar[]
    total:number
}


const defaults: Pick<myCar, 'num'> = {
    num: 0
};

interface onlyProduct{
    id:string
}

interface onlyOrder{
    id:string
}

interface myCarProduct{
    id?:string

    product:onlyProduct

    num:number

    price:number

    order:onlyOrder
}

interface myOrder{
    id?:string
    
    carproducts?:carProduct[]
    
    user:myUser

    address:string

    consigneeName:string

    consigneePhoneNumber:string

    totalprice:number

    pay:boolean
}

interface myProduct{
    id: string
    name: string
    phone: string
    price:number
    date?:Date
    imgUrl?: string
    CarouselImg1?: string
    CarouselImg2?: string
    CarouselImg3?: string
    description?: string
    num?:number
}

interface myUser{
    number:string
    password?:string
    name:string
    authority:number
    myAuthority?:string
    userAvaterUrl?:string
    description?:string
    orders?:Order[]
}