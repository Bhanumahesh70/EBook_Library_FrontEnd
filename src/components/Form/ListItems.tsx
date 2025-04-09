import { Link } from 'react-router-dom';

interface Item {
  id: string;
  name?: string;
  categoryName?: string;
}
interface ListItemsProps<T extends Item> {
  items: T[];
  selectItem: (item: T) => void;
  urlTemplate: (id: string) => string;
}

const ListItems = <T extends Item>({
  items,
  selectItem,
  urlTemplate,
}: ListItemsProps<T>) => {
  return items.map((item) => (
    <li key={item.id} className="DropDownListItems">
      <button
        className="dropdown-item"
        type="button"
        onClick={() => selectItem(item)}
      >
        {item.name || item.categoryName}
      </button>
      <Link to={urlTemplate(item.id)} className="btn btn-outline-primary">
        view
      </Link>
    </li>
  ));
};

export default ListItems;
