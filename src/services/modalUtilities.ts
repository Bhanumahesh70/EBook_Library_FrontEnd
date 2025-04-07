import { NavigateFunction, useNavigate } from "react-router-dom";

interface DisplayTextInModalProps{
    isError: boolean;
    isEditing: boolean;
    entityName: string;
    customText?: string;

}
interface HandleModalClosingProps<T>{
    setShowModal:(value:boolean)=>void;
    isError: boolean;
    isEditing: boolean;
    url:string;
    setEntity:(value:T)=>void;
    entity:T
    navigate:NavigateFunction
    customNavigateUrl?:string
    
}
export  function textInModal({isError, isEditing, entityName,customText}:DisplayTextInModalProps) {
    if (!isError) {
      if(customText){
        return customText
      }
      return isEditing
        ? `${entityName} is updated successfully`
        : `${entityName} is added successfully`;
    } else {
      return isEditing ? `Error in updating ${entityName}` : `Error in adding ${entityName}`;
    }
  }

  
 export function handleModalClosing<T>({setShowModal,isError,isEditing,url,setEntity,entity, navigate,customNavigateUrl}:HandleModalClosingProps<T>) {

    setShowModal(false);

    if (!isError) {
        setEntity(entity);
        if(customNavigateUrl){
          console.log("Navigating to:",customNavigateUrl)
            navigate(customNavigateUrl);
        }
        else if (isEditing) {
          console.log("Navigating to:",url)
            navigate(url);
        }
      
    }
  }