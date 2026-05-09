export const delay = async(delay:number=500)=>{
    return await new Promise((resolve) => setTimeout(resolve, delay));
}