import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me')
      .then(response => console.log('dashboard', response))
      .catch((error) => console.log('dashboard-error', error))
  }, [])

  return <h1>Dashboard: { user?.email }</h1>
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  // Como usar a api (com contexto dos cookies) no backend
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')
  
  console.log('dashboard server side', response.data)

  return {
    props: {}
  }
})