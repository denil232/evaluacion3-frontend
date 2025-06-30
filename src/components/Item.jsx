import React from "react"; 

//Componente funcional Item que recibe tres props:
//item: objeto que representa el ítem a mostrar
//deleteItem: función que se encarga de eliminar un ítem
//editItem: función que se encarga de editar un ítem
function Item({ item, deleteItem, editItem }) {
    return (
        <li>
        {item.value}
        <button onClick={() => editItem(item)}>Editar</button>
        <button onClick={() => deleteItem(item.id)}>Eliminar</button>
        </li>
    );
}

//Exporta el componente Item para que pueda ser utilizado en otros archivos
export default Item;