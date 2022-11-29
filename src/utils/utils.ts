
export function trimText(text:string,maximum:number):string{

    if (text.length <= maximum){
        return text
    }
    else{
        return `${text.substring(0,maximum)}..`
    }
}