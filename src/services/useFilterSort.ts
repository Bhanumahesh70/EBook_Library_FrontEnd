import { useState } from "react";

export type sortConfig = {
    sortBy: string;
    direction: 'asc' | 'desc';
}|null;
type SortAccessor<T> = Record<string, (item: T) => any>;

export const useFilterSort = <T>(
    data:T[], filters :Record<string, any>, 
    setFilters:React.Dispatch<React.SetStateAction<Record<string, any>>>,
    FilterFunction:Record<string,(item: T) => boolean>,
    sortAccessors: SortAccessor<T>)=>{
    const [sortConfig, setSortConfig] = useState<sortConfig>(null);

    const filteredData = data.filter((item)=> 
        Object.keys(FilterFunction).every((key)=> 
            filters[key]? FilterFunction[key](item) : true)
)
const sortedData =  filteredData.sort((a,b)=>{
    if(!sortConfig) return 0;

    const{sortBy, direction} = sortConfig;

    const aValue = sortAccessors[sortBy]?.(a);
    const bValue = sortAccessors[sortBy]?.(b);

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;


})  
const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.sortBy === key) {
        return { sortBy: key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { sortBy: key, direction: 'asc' };
    });
  };
  return { sortedData, sortConfig, handleSort };
}