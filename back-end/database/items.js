const sqlite = require('sqlite');
const SQL = require('sql-template-strings');

const joinSQLStatementKeys = (keys, values, delimiter , keyValueSeparator='=') => {
    return keys
      .map(propName => {
        const value = values[propName];
        if (value !== null && typeof value !== "undefined") {
          return SQL``.append(propName).append(keyValueSeparator).append(SQL`${value}`);
        }
        return false;
      }).filter(Boolean)
      .reduce((prev, curr) => prev.append(delimiter).append(curr));
  };
  


const dataBase =async ()=>{
    const db = await sqlite.open('./database/Rinnova')

    const getItems = async ()=>{
        const rows = await db.all('SELECT * FROM items');
        return rows;
    }
    const addItem = async props => {
        const {item_name, item_image, item_desc, item_price} = props;
        if (!props || !item_name || !item_image || !item_desc || !item_price ) {
            throw new Error("you must provide a item to add");
          }
       
        try {
          const result = await db.run(
            SQL`INSERT INTO items (item_name, item_image, item_desc,item_price) Values (${item_name}, ${item_image}, ${item_desc}, ${item_price})`
          );
      
          return {result:result,item:props}
        } catch (err) {
            console.log('err', err)
          throw new Error("cannot insert this combination of name and email");
        }
      };
      const deleteItem = async (item_id)  => {
    
        try {
          const result = await db.run(
            SQL`Delete from items where item_id = ${item_id} `
          );
          if (result.stmt.changes === 0) {
            throw new Error(`could not delete item with id=${item_id}`);
          }
          return {success:true,item_id:item_id};
        } catch (err) {
            
          throw new Error("could not delete item");
        }
      };
      const updateItem = async (props) => {
         
        const {item_id,item_name, item_image, item_desc, item_price} = props;
   
        if (!props || !item_id || !item_name || !item_image || !item_desc || !item_price ) {
          throw new Error("you must provide the item details you wanna update");
        }
        try {
          const stmt = SQL`UPDATE items SET `
          .append( joinSQLStatementKeys( ["item_name", "item_image", "item_desc","item_price"], props, ", " ))
          .append(SQL` WHERE `)
          .append(joinSQLStatementKeys(["item_id"],
              {item_id:props.item_id }, " AND ")
          );
    
          
          const result = await db.run(stmt);
          if (result.stmt.changes === 0) {
            throw new Error(`could not update the item with id = ${item_id}`);
          }
          return {success:true,item_updated:props};
        } catch (err) {
            console.log('the eror is ',err)
          throw new Error(`could not update the item with id = ${item_id}` + err.message);
        }
      };
    const controller = {
        getItems,
        addItem,
        deleteItem,
        updateItem
    }
    return controller;
}

module.exports = dataBase;    