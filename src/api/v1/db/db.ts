/* eslint-disable camelcase */
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

const getUsers = async () => {
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
  return await pool.query(getAllUserDataQuery)
}
const getUser = async (id: number) => {
  const getUserData = `
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
FROM app_user where id=$1
  
  `
  return await pool.query(getUserData, [id])
}

const getProfile = async () => {
  return await pool.query("SELECT * FROM profile ")
}

const findUser = async (email: string) => {
  return await pool.query("SELECT * FROM app_user WHERE email=$1", [email])
}
const createUser = async (email: string, password: string) => {
  const query = `insert into app_user (email, password) values ($1,$2)`

  return await pool.query(query, [email, password])
}

const createProfile = async (age: string, bday: string, app_user_id: number) => {
  const query = `insert into profile (age, bday, app_user_id) values ($1,$2,$3)`

  return await pool.query(query, [age, bday, app_user_id])
}

const updateUser = async (email: string, password: string, id: number) => {
  const query = `UPDATE app_user SET email=$1, password=$2 WHERE id=$3`

  return await pool.query(query, [email, password, id])
}
const updateProfile = async (age: string, bday: string, id: number) => {
  const query = `UPDATE profile SET age=$1, bday=$2 WHERE id=$3`

  return await pool.query(query, [age, bday, id])
}
export const db = {
  getUsers,
  getUser,
  getProfile,
  createUser,
  findUser,
  createProfile,
  updateUser,
  updateProfile
}
