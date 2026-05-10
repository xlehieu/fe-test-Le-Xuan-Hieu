export const delay = async(delay:number=500)=>{
    return await new Promise((resolve) => setTimeout(resolve, delay));
}
export function normalizeText(str: string = ""): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}