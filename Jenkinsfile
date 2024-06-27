pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('DOCKER_HUB_CREDENTIALS')
        DOCKER_HUB_USER = 'razilahamed'
        BACKEND_IMAGE = "${DOCKER_HUB_USER}/backend"
        FRONTEND_IMAGE = "${DOCKER_HUB_USER}/frontend"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Build Images') {
            steps {
                script {
                    bat 'docker-compose build'
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_HUB_CREDENTIALS) {
                        // Authentication is handled by docker.withRegistry
                    }
                }
            }
        }
        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_HUB_CREDENTIALS) {
                        bat "docker-compose push"
                    }
                }
            }
        }
        stage('Deploy Services') {
            steps {
                script {
                    bat 'docker-compose down || true'
                    bat 'docker-compose up -d'
                }
            }
        }
    }
    post {
        always {
            echo 'Cleaning up...'
            bat 'docker logout'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
