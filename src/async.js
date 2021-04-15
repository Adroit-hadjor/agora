


export const Store = async(name,value)=>{
    await localStorage.setItem(name,value);
    
}
export const Get = async(name)=>{
    const values = await localStorage.getItem(name);
    return values
}

export const Remove = async(name)=>{
    await localStorage.setItem(name,"");
  
}
