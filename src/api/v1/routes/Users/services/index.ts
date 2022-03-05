import { prisma } from "../../../../../../src/config/db"

export const getAllUsers = async () => {
  return await prisma.app_user.findMany({ include: { posts: true, profile: true } })
}

export const createUserData = async (value: any) => {
  const { email, password, age, bday } = value

  return await prisma.app_user.create({
    data: {
      email,
      password,
      profile: {
        create: {
          age,
          bday
        }
      }
    }
  })
}
export const updateUserData = async (id: string, value: any, profileId: string) => {
  const { email, password, age, bday } = value
  return await prisma.app_user.update({
    where: { id },
    data: {
      email,
      password,
      profile: {
        update: { where: { id: profileId }, data: { age, bday } }
      }
    }
  })
}
export const getUser = async (id: string) => {
  return await prisma.app_user.findFirst({ where: { id }, include: { posts: true, profile: true } })
}
