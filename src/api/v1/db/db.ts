import { Pool } from "pg"
import { config } from "../../../../src/config/index"

const pool = new Pool(config.dev)
//   const query = `
//  SELECT json_build_object('id', parent.id, 'first_name', parent.first_name, 'child',

//     (
//       SELECT json_agg(json_build_object('id', child.id, 'child_name', child.first_name, 'parent_id',parent.id))
//      FROM child  WHERE parent.id = child.parent_id

//      )

//            )
// FROM parent

//   `

const getAllUserDataQuery = `
 SELECT json_build_object('id', app_user.id, 'email', app_user.email,'password',app_user.password, 'posts',

    (
      SELECT json_agg(json_build_object('id', posts.id, 'title', posts.title, 'msg',posts.message ,'app_user_id',app_user.id))
     FROM posts  WHERE app_user.id = posts.app_user_id
     
     ),

     'profile',

    (
      SELECT json_build_object('id', profile.id, 'age', profile.age, 'bday',profile.bday ,'app_user_id',app_user.id)
     FROM profile  WHERE app_user.id = profile.app_user_id
     
     )
     
           ) 
FROM app_user 
  
  `
const getUsers = async () => await pool.query(getAllUserDataQuery)
const getProfile = async () => await pool.query("SELECT * FROM profile ")

export const db = {
  getUsers,
  getProfile
}
