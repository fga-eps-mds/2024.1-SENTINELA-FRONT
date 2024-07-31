import json
import sys
import urllib.request
from datetime import datetime

def generate_metrics():
    # url base do sonar, inicio da rota que devolverá as métricas
    base_url = "https://sonarcloud.io/api/measures/component_tree?component="
    # prefixo da disciplina, identificador da organização no sonarcloud
    prefix = "fga-eps-mds"
    # todas as métricas que serão requisitadas para o sonarcloud
    metrics = [
        "files",
        "functions",
        "complexity",
        "comment_lines_density",
        "duplicated_lines_density",
        "coverage",
        "ncloc",
        "tests",
        "test_errors",
        "test_failures",
        "test_execution_time",
        "security_rating"
    ]

    # nome do repositório, vem como argumento no release.yml
    repository_name = sys.argv[1]
    # nome da branch onde foi chamada o script, vem de argumento no release.yml
    branch = sys.argv[2]
    # url montada
    # base url = api do sonar
    # prefix = id da org da disciplina
    # repository_name = nome do repositorio (unido com prefix separado por _ é o identificador do projeto no sonar)
    # o join do metrics une as métricas a serem solicitadas como parâmetros
    # branch = específica o nome da branch para pegar as métricas daquela branch em específicp
    url = f'{base_url}{prefix}_{repository_name}&metricKeys={",".join(metrics)}&branch={branch}'

    with urllib.request.urlopen(url) as res:
        data = json.load(res)
        date = datetime.now()
        date_padrao_hilmer = f"{date.month}-{date.day}-{date.year}-{date.hour}-{date.minute}-{date.second}"

        underlined_repo_name = repository_name[:16] + \
            repository_name[16:].replace('-', "_")

        filename = f"{prefix}-{underlined_repo_name}-{date_padrao_hilmer}-{branch}.json"
        print(filename)
        with open(filename, "w") as file:
            json.dump(data, file)


if __name__ == "__main__":
    generate_metrics()
