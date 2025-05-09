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
    onAfterSubmit: (entity: T, id: string | undefined) => Promise<void>;

}
export async function handleFormSubmit<T>({e, isEditing, entity ,id,updateFunction, addFunction, entityName,setIsError,setShowModal,onAfterSubmit}:HandelFormSubmitProps<T>){
    e.preventDefault();
    let submittedEntity: T | undefined = undefined;
    try {
      if (isEditing) {
        if (!id) throw new Error(`ID is required for updating ${entityName}`);
         submittedEntity = await updateFunction(id, entity);
        console.log(`${entityName} updated Successfully`, submittedEntity);
      } else {
         submittedEntity = await addFunction(entity);
        console.log(`${entityName} added Successfully`, submittedEntity);
      }
      if (submittedEntity) {
        console.log("calling onAfter Submit");
        await onAfterSubmit(submittedEntity, id);
      }
      setIsError(false);
    } catch (error) {
      console.error(`Error adding/updating ${entityName}:`, error);
      setIsError(true);
    } finally {
      setShowModal(true);
    }
}

export function handleInputOnChange<T>(e: React.ChangeEvent<any>, setEntity: (value: React.SetStateAction<T>) => void, customKey?:keyof T) {
    console.log(e);
    const { id, value, type } = e.target;
    if(type==="checkbox" || type ==="radio"){
        const checked = (e.target as HTMLInputElement).checked;
        if(!checked) return
    }
    if (typeof value === 'object') {
      console.log('Handling complex value:', value);
    }
    const key = customKey ?? (id as keyof T);  
    console.log('Updating entity with key:', key, 'and value:', value);
    setEntity((prevData) => ({ ...prevData, [key]: value }));
  }
  

  