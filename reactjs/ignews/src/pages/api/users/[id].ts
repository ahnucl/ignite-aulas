/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.query)

  const users = [
    { id: 1, name: `Leonardo` },
    { id: 2, name: `Larissa` },
    { id: 3, name: `Gabriel` },
    { id: 4, name: `Laíza` },
  ]

  const user = users.find(user => user.id === Number(request.query.id as string))

  return response.json(user)
}