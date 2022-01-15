import { RepositoryItem } from "./RepositoryItem";

const repository = {
    name:"Nome",
    description: "Descrição",
    link:"http://google.com"
}

export function RepositoryList() {
    return <section>
        <h1>Repositórios</h1>

        <ul>
            <RepositoryItem repository={repository}/>
            <RepositoryItem repository={repository}/>
            <RepositoryItem repository={repository}/>
            <RepositoryItem repository={repository}/>
            <RepositoryItem repository={repository}/>
        </ul>
    </section>
}