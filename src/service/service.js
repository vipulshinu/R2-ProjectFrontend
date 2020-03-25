import httpService from "./httpService";

export function login(body){
    return httpService.post('login',body)
}
export function getVouchers(){
    return httpService.get('getVouchers')
}

export function getConsumerVouchers(body){
    return httpService.post('consumerVouchers', body)
}
export function assignVouchers(body){
    return httpService.post('assignVoucher', body)
}

export function redeemVouchers(body){
    return httpService.post('redeemVoucher', body)
}