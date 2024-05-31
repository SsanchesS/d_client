import {IUser} from "../types/types"

export const parseData=(user:IUser)=>{
   if (typeof user.sneakers_basket === "string") {
      try {
         user.sneakers_basket = JSON.parse(user.sneakers_basket)
      } catch (error) {
         console.error("Error parsing sneakers_basket JSON:", error);
      }      
   }
   return user 
}