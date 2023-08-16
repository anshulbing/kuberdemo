pipeline {
    environment {
        dockerimagename = "anshulbing/kuberdemo"
        dockerimage = ""
    }

    agent any

    stages {

        stage('Checkoit Source'){
            steps {
                git branch: 'feature', url: 'https://github.com/anshulbing/kuberdemo.git'
            }
        }

        stage('Build Docker Image'){
            steps{
                script{
                    dockerImage = docker.build dockerimagename
                }
            }
        }

        stage('Push DockerImage to DockerHub'){
            environment{
                dockerHubCredentials = 'dockerhubcreds'
            }

            steps{
                script{
                    docker.withRegistry('http://registry.hub.docker.com', dockerHubCredentials){
                        dockerImage.push("latest")
                    }
                }
            }
        }

        stage("Deploying App in to KUBERNETES"){
            steps {
                script {
                    def kubeConfig = credentials('kubernetesconfig')
                    def namespace = 'kuberdemo'
                    def deploymentYaml = readFile("deployment.yml")

                    sh "kubectl --kubeconfig=${kubeConfig} apply -n ${namespace} -f - <<EOF\n${deploymentYaml}\nEOF"
                    kubernetesDeploy(configs: "deployment.yml", kubeconfigId: "kubernetesconfig")
                }
            }
        }
    }

}