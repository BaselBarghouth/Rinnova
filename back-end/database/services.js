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

    const getServices = async ()=>{
        const rows = await db.all('SELECT * FROM services');
        return rows;
    }
    const addService = async props => {
        const { service_name, service_desc, service_image} = props;
        if (!props || !service_desc || !service_image || !service_name ) {
            throw new Error("you must provide a service to add");
          }
       
        try {
          const result = await db.run(
            SQL`INSERT INTO services (service_name, service_desc, service_image) Values (${service_name}, ${service_desc}, ${service_image})`
          );
      
          return {result:result,service:props}
        } catch (err) {
            console.log('err', err)
          throw new Error("cannot insert this combination of name and email");
        }
      };
      const deleteService = async (service_id)  => {
    
        try {
          const result = await db.run(
            SQL`Delete from services where service_id = ${service_id} `
          );
          if (result.stmt.changes === 0) {
            throw new Error(`could not delete service with id=${service_id}`);
          }
          return {success:true,user_id:service_id};
        } catch (err) {
            
          throw new Error("could not delete service");
        }
      };
      const updateService = async (props) => {
         
        const {service_id,service_name, service_desc, service_image} = props;
        if (!props || !service_id || !service_desc || !service_image || !service_name ) {
          throw new Error("you must provide the user details you wanna update");
        }
        try {
          const stmt = SQL`UPDATE services SET `
          .append( joinSQLStatementKeys( ["service_name", "service_desc", "service_image"], props, ", " ))
          .append(SQL` WHERE `)
          .append(joinSQLStatementKeys(["service_id"],
              {service_id:props.service_id }, " AND ")
          );
    
          
          const result = await db.run(stmt);
          if (result.stmt.changes === 0) {
            throw new Error(`could not update the service with id = ${service_id}`);
          }
          return {success:true,service_updated:props};
        } catch (err) {
            console.log('the eror is ',err)
          throw new Error(`could not update the user with id = ${user_id}` + err.message);
        }
      };
    const controller = {
        getServices,
        addService,
        deleteService,
        updateService
    }
    return controller;
}

module.exports = dataBase;    