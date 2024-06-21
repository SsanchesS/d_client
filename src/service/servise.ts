import { ISneaker } from "../types/types";
export const get_sneakers_basket_full=(sneakers:ISneaker[],sneakers_basket:number[])=>sneakers.filter(obj=>sneakers_basket?.includes(obj.id))

export const JSON_stringify=(data:Array<any>)=>{
   try {
      const data_parse = JSON.stringify(data)
      return data_parse 
   } catch (error:any) {
      console.error("Error parsing JSON:", error);
   }   
}