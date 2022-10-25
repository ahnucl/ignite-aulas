import { signOut } from "../contexts/AuthContext"
import { setupAPIClient } from "../services/api"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Metrics() {

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 10px'
      }}>
        <h1>Metrics</h1>
        <div>
          <button onClick={signOut}>Sair</button>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')
  

  return {
    props: {}
  }
},{
  permissions: ['metrics.list'],
  roles: ['administrator'],
})