import { useContext, useEffect } from "react"
import { AuthContext, signOut } from "../contexts/AuthContext"
import { useCan } from "../hooks/useCan"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  const userCanSeeMetrics = useCan({
    // permissions: ['metrics.list']
    roles: ['administrator']
  })

  useEffect(() => {
    api.get('/me')
      .then(response => console.log('dashboard', response))
      .catch((error) => console.log('dashboard-error', error))
  }, [])

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 10px'
      }}>
        <h1>Dashboard: { user?.email }</h1>
        <div>
          <button onClick={signOut}>Sair</button>
        </div>
      </div>
      { userCanSeeMetrics && <div>Métricas</div> }
    </>
  )
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