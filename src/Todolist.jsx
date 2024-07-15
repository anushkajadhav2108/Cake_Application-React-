import { useState } from 'react';

const Todolist = () => {
  let [inputText, setInputText] = useState('');
  let [items, setItems] = useState([]);
  let [idCounter, setIdCounter] = useState(1);

  const handleClick = () => {
    let obj = {
      id: idCounter,
      itemText: inputText,
    };
    setItems([...items, obj]);
    console.log('Item is ' + items);
    setIdCounter(idCounter + 1);
    setInputText('');
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleDelete = (idToDelete) => {
    console.log('Delete buton got clicked ' + idToDelete);
    let updatedItems = items.filter((item) => {
      return item.id != idToDelete;
    });
    setItems(updatedItems);
  };

  const handleEdit = (idToEdit) => {

    let newItemEditedText = prompt('Enter task updated');
  
    let updatedItemList = items.map((item) => {
      if (item.id === idToEdit) {
   
        return {
          id: item.id,
          itemText: newItemEditedText,
        };
      } else {
        return item;
      }
    });
    console.log(updatedItemList);
    setItems(updatedItemList);
  };
  
  return (
    <>
      <div className='main-container'>
        <h1>To-Do List</h1>
        <input
          type='text'
          placeholder='Enter Item to add'
          value={inputText}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Add</button>
        <ul>
          {items.map((item) => {
            return (
              <div style={{ display: 'flex' }} key={item.id}>
                <li>{item.itemText}</li>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Todolist;