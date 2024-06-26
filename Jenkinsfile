pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('a14e7f40-a1bc-4b05-aa73-4457f299ff71')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/razilahamed/Freelance_sample.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    docker.build('freelance_project_backend', './backend')
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    docker.build('freelance_project_frontend', './frontend')
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKER_HUB_CREDENTIALS') {
                        docker.image('freelance_project_backend').push('latest')
                    }
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKER_HUB_CREDENTIALS') {
                        docker.image('freelance_project_frontend').push('latest')
                    }
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                script {
                    sh 'docker run -d -p 5000:5000 freelance_project_backend:latest'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                script {
                    sh 'docker run -d -p 80:80 freelance_project_frontend:latest'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker system prune -f'
        }
    }
}
