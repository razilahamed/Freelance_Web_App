pipeline {
    agent any 

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('a14e7f40-a1bc-4b05-aa73-4457f299ff71')
        DOCKER_HUB_USER = 'razilahamed'
        BACKEND_IMAGE = 'razilahamed/backend'
        FRONTEND_IMAGE = 'razilahamed/frontend'
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
                    docker.build("${BACKEND_IMAGE}:${env.BUILD_NUMBER}", '-f backend/Dockerfile backend')
                }
            }
        }
        stage('Build Frontend Image') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}:${env.BUILD_NUMBER}", '-f frontend/Dockerfile frontend')
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKER_HUB_CREDENTIALS') {
                        sh "docker login -u ${DOCKER_HUB_USER} -p ${DOCKER_HUB_PASS}"
                    }
                }
            }
        }
        stage('Push Backend Image') {
            steps {
                script {
                    docker.image("${BACKEND_IMAGE}:${env.BUILD_NUMBER}").push()
                }
            }
        }
        stage('Push Frontend Image') {
            steps {
                script {
                    docker.image("${FRONTEND_IMAGE}:${env.BUILD_NUMBER}").push()
                }
            }
        }
        stage('Deploy Backend') {
            steps {
                script {
                    // Stop and remove any existing container
                    sh 'docker stop backend || true && docker rm backend || true'
                    // Run the backend container
                    sh "docker run -d --name backend -p 8080:8080 ${BACKEND_IMAGE}:${env.BUILD_NUMBER}"
                }
            }
        }
        stage('Deploy Frontend') {
            steps {
                script {
                    // Stop and remove any existing container
                    sh 'docker stop frontend || true && docker rm frontend || true'
                    // Run the frontend container
                    sh "docker run -d --name frontend -p 3000:80 ${FRONTEND_IMAGE}:${env.BUILD_NUMBER}"
                }
            }
        }
    }
    post {
        always {
            echo 'Cleaning up...'
            sh 'docker logout'
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
