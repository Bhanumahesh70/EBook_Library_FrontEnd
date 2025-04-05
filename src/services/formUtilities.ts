interface HandelFormSubmitProps<T>{
    e: React.FormEvent<HTMLFormElement>; 
    isEditing:boolean;
    entity: T;
    id?: string| undefined;
    updateFunction:(id:string| undefined, entity:T)=>Promise<T>; 
    addFunction:(entity:T)=>Promise<T>;
    entityName:string;
    setIsError: (value: React.SetStateAction<boolean>) => void;
    setShowModal:(value: React.SetStateAction<boolean>) => void;
}
export async function handleFormSubmit<T>({e, isEditing, entity ,id,updateFunction, addFunction, entityName,setIsError,setShowModal}:HandelFormSubmitProps<T>){
    e.preventDefault();
    try {
      if (isEditing) {
        if (!id) throw new Error(`ID is required for updating ${entityName}`);
        const data = await updateFunction(id, entity);
        console.log(`${entityName} updated Successfully`, data);
      } else {
        const addedData = await addFunction(entity);
        console.log(`${entityName} added Successfully`, addedData);
      }
      setIsError(false);
    } catch (error) {
      console.error(`Error adding/updating ${entityName}:`, error);
      setIsError(true);
    } finally {
      setShowModal(true);
    }
}

export function handleInputOnChange<T>(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, setEntity: (value: React.SetStateAction<T>) => void, customKey?:keyof T) {
    console.log(e);
    const { id, value, type } = e.target;
    if(type==="checkbox" || type ==="radio"){
        const checked = (e.target as HTMLInputElement).checked;
        if(!checked) return
    }
    const key = customKey ?? (id as keyof T);  
    setEntity((prevData) => ({ ...prevData, [key]: value }));
  }
  

  