import { useNavigate } from "react-router-dom";

interface DisplayTextInModalProps{
    isError: boolean;
    isEditing: boolean;
    entityName: string;

}
interface HandleModalClosingProps<T>{
    setShowModal:(value:boolean)=>void;
    isError: boolean;
    isEditing: boolean;
    url:string;
    setEntity:(value:T)=>void;
    entity:T
}
export  function textInModal({isError, isEditing, entityName}:DisplayTextInModalProps) {
    if (!isError) {
      return isEditing
        ? `${entityName} is updated successfully`
        : `${entityName} is added successfully`;
    } else {
      return isEditing ? `Error in updating ${entityName}` : `Error in adding ${entityName}`;
    }
  }

  
 export function handleModalClosing<T>({setShowModal,isError,isEditing,url,setEntity,entity}:HandleModalClosingProps<T>) {
  const navigate = useNavigate();
    setShowModal(false);

    if (!isError) {
        setEntity(entity);
        if (isEditing) {
            navigate(url);
        }
      
    }
  }