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

    const getUsers = async ()=>{
        const rows = await db.all('SELECT * FROM users');
        return rows;
    }
    const addUser = async props => {
        const { user_name, user_lastname, user_email, user_password, user_role} = props;
        if (!props ||!user_name || !user_lastname || !user_email || !user_password || !user_role) {
            throw new Error("you must provide a name and email");
          }
       
        try {
          const result = await db.run(
            SQL`INSERT INTO users (user_name, user_lastname, user_email,user_password, user_role) Values (${user_name}, ${user_lastname}, ${user_email},${user_password}, ${user_role})`
          );
      
          return {result:result,user:props}
        } catch (err) {
            console.log('err', err)
          throw new Error("cannot insert this combination of name and email");
        }
      };
      const deleteUser = async (user_id)  => {
    
        try {
          const result = await db.run(
            SQL`Delete from users where user_id = ${user_id} `
          );
          if (result.stmt.changes === 0) {
            throw new Error(`could not delete user with id=${user_id}`);
          }
          return {success:true,user_id:user_id};
        } catch (err) {
            console.log(err)
          throw new Error("could not delete contact",err);
        }
      };
      const updateUser = async (props) => {
          console.log('the props is ',props)
        const {user_id, user_name, user_lastname, user_email, user_password, user_role} = props;
        if (!props ||!user_id || !user_name || !user_lastname || !user_email || !user_password  || !user_role ) {
          throw new Error("you must provide the user details you wanna update");
        }
        try {
          const stmt = SQL`UPDATE users SET `
          .append( joinSQLStatementKeys( ["user_name", "user_lastname", "user_email","user_password","user_role"], props, ", " ))
          .append(SQL` WHERE `)
          .append(joinSQLStatementKeys(["user_id"],
              {user_id:props.user_id }, " AND ")
          );
    
          
          const result = await db.run(stmt);
          if (result.stmt.changes === 0) {
            throw new Error(`could not update the user with id = ${user_id}`);
          }
          return {success:true,user_updated:props};
        } catch (err) {
            console.log('the eror is ',err)
          throw new Error(`could not update the user with id = ${user_id}` + err.message);
        }
      };
      const findUser= async props=>{

        const {user_email, user_password} = props;
        try{
          const stmt = SQL`SELECT * FROM users WHERE user_email = ${user_email} AND user_password = ${user_password}`;
          const rows = await db.all(stmt);
          const user = rows[0]
          if(!user){
            throw new Error('Incorrect username or password!')
          }
          else
          return user;
    
        }
        catch(err)
        {
          throw new Error('Could not perform operation!')
        }
      }
    const controller = {
        getUsers,
        addUser,
        deleteUser,
        updateUser,
        findUser
    }
    return controller;
}

module.exports = dataBase;    