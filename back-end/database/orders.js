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

    const getOrders = async ()=>{
        const rows = await db.all('SELECT * FROM orders');
        return rows;
    }
    const addOrder = async props => {
        const {user_id,status} = props;
        console.log(props)
        if (!props || !user_id || !status) {
            throw new Error("you must provide a order");
          }
       
        try {
          const result = await db.run(
            SQL`INSERT INTO orders (user_id,status) Values ( ${user_id}, ${status})`
          );
      
          return {result:result,order:props}
        } catch (err) {
            console.log('err', err)
          throw new Error("cannot insert this combination of name and email");
        }
      };
      const deleteOrder = async (order_id)  => {
    
        try {
          const resultOrders = await db.run(
            SQL`Delete from orders where order_id = ${order_id}`
            );
            const resultOrderItems = await db.run( 
              SQL`Delete from order_items where order_id = ${order_id}`)
          if (result.stmt.changes === 0) {
            throw new Error(`could not delete order with id=${order_id}`);
          }
          return {success:true,order_id:order_id};
        } catch (err) {
            console.log(err)
         
        }
      };
      const updateOrder = async (props) => {
         console.log(props)
        const {order_id,user_id,status} = props;
   
        if (!props || !order_id || !user_id || !status) {
          throw new Error("you must provide the item details you wanna update");
        }
        try {
          const stmt = SQL`UPDATE orders SET `
          .append( joinSQLStatementKeys( ["order_id", "user_id", "status"], props, ", " ))
          .append(SQL` WHERE `)
          .append(joinSQLStatementKeys(["order_id"],
              {order_id:props.order_id }, " AND ")
          );
    
          
          const result = await db.run(stmt);
          if (result.stmt.changes === 0) {
            throw new Error(`could not update the order with id = ${order_id}`);
          }
          return {success:true,order_updated:props};
        } catch (err) {
            console.log('the eror is ',err)
          throw new Error(`could not update the order with id = ${order_id}` + err.message);
        }
      };
    const controller = {
     getOrders,
     deleteOrder,
     updateOrder,
     addOrder
    }
    return controller;
}

module.exports = dataBase;    