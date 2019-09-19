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

    const getOrderItems = async ()=>{
        const rows = await db.all('SELECT * FROM order_items');
        return rows;
    }
    const addOrderItems = async props => {
        const {order_id,item_id,order_item_qty} = props;
        console.log(props)
        if (!props || !order_id || !item_id || !order_item_qty ) {
            throw new Error("you must provide a order items to add");
          }
          let allItems =[];
       for(let i = 0;i<item_id.length;i++){
        try {
          const result = await db.run(
            SQL`INSERT INTO order_items (order_id, item_id, order_item_qty) Values (${order_id}, ${item_id[i]}, ${order_item_qty[i]})`
          );
          allItems = [...allItems,result]
         
        } catch (err) {
            console.log('err', err)
          throw new Error("cannot insert this combination of name and email");
        }
       }
       return {result:allItems,order_items:props}
      };
      const deleteOrderItem = async (order_item_id)  => {
    
        try {
          const result = await db.run(
            SQL`Delete from order_items where order_item_id = ${order_item_id} `
          );
          if (result.stmt.changes === 0) {
            throw new Error(`could not delete order_items with order_item_id=${order_item_id}`);
          }
          return {success:true,order_item_id:order_item_id};
        } catch (err) {
      
          throw new Error("could not delete order_item");
        }
      };
      const updateOrderItem = async (props) => {
         
        const {order_item_id,order_id,item_id,order_item_qty} = props;
   
        if (!props || !order_item_id || !order_id || !item_id || !order_item_qty ) {
          throw new Error("you must provide the item details you wanna update");
        }
        try {
          const stmt = SQL`UPDATE items SET `
          .append( joinSQLStatementKeys( ["order_id", "item_id", "order_item_qty"], props, ", " ))
          .append(SQL` WHERE `)
          .append(joinSQLStatementKeys(["order_item_id"],
              {item_id:props.item_id }, " AND ")
          );
    
          
          const result = await db.run(stmt);
          if (result.stmt.changes === 0) {
            throw new Error(`could not update the item with id = ${order_item_id}`);
          }
          return {success:true,order_item_updated:props};
        } catch (err) {
            console.log('the eror is ',err)
          throw new Error(`could not update the item with order_item_id = ${order_item_id}` + err.message);
        }
      };
    const controller = {
       addOrderItems,
       getOrderItems,
       deleteOrderItem,
       updateOrderItem
    }
    return controller;
}

module.exports = dataBase;    