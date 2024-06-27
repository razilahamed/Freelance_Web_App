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
        stage('Build Backend Image') {
            steps {
                script {
                    bat "docker build -t ${BACKEND_IMAGE}:${env.BUILD_NUMBER} -f backend/Dockerfile backend"
                }
            }
        }
        stage('Build Frontend Image') {
            steps {
                script {
                    bat "docker build -t ${FRONTEND_IMAGE}:${env.BUILD_NUMBER} -f frontend/Dockerfile frontend"
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_HUB_CREDENTIALS) {
                        bat "docker login -u ${env.DOCKER_HUB_CREDENTIALS_USR} -p ${env.DOCKER_HUB_CREDENTIALS_PSW}"
                    }
                }
            }
        }
        stage('Push Backend Image') {
            steps {
                script {
                    bat "docker push ${BACKEND_IMAGE}:${env.BUILD_NUMBER}"
                }
            }
        }
        stage('Push Frontend Image') {
            steps {
                script {
                    bat "docker push ${FRONTEND_IMAGE}:${env.BUILD_NUMBER}"
                }
            }
        }
        stage('Deploy Backend') {
            steps {
                script {
                    // Stop and remove any existing container
                    bat 'docker stop backend || true && docker rm backend || true'
                    // Run the backend container
                    bat "docker run -d --name backend -p 8080:8080 ${BACKEND_IMAGE}:${env.BUILD_NUMBER}"
                }
            }
        }
        stage('Deploy Frontend') {
            steps {
                script {
                    // Stop and remove any existing container
                    bat 'docker stop frontend || true && docker rm frontend || true'
                    // Run the frontend container
                    bat "docker run -d --name frontend -p 3000:80 ${FRONTEND_IMAGE}:${env.BUILD_NUMBER}"
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
