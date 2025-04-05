interface HandelFormSubmitProps<T>{
    e: React.FormEvent<HTMLFormElement>; 
    isEditing:boolean;
    entity: T;
    id?: string| undefined;
    updateFunction:(entity:T,id:string| undefined)=>Promise<T>; 
    addFunction:(entity:T)=>Promise<T>;
    entityName:string;
    setIsError: (value: React.SetStateAction<boolean>) => void;
    setShowModal:(value: React.SetStateAction<boolean>) => void;
}
export async function handelFormSubmit<T>({e, isEditing, entity ,id,updateFunction, addFunction, entityName,setIsError,setShowModal}:HandelFormSubmitProps<T>){
    e.preventDefault();
    try {
      if (isEditing) {
        if (!id) throw new Error(`ID is required for updating ${entityName}`);
        const data = await updateFunction(entity, id);
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

export function handleInputOnChange<T>(e: React.ChangeEvent<HTMLInputElement>, setEntity: (value: React.SetStateAction<T>) => void) {
    console.log(e);
    const { id, value } = e.target;
    setEntity((prevData) => ({ ...prevData, [id]: value }));
  }
  