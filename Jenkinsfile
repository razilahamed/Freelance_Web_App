pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('a14e7f40-a1bc-4b05-aa73-4457f299ff71')
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
                    def backendImage = docker.build("my-backend-image:latest", "-f backend/Dockerfile backend")
                    backendImage.inside {
                        // Backend specific commands, if any
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    def frontendImage = docker.build("my-frontend-image:latest", "-f frontend/Dockerfile frontend")
                    frontendImage.inside {
                        // Frontend specific commands, if any
                    }
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKER_HUB_CREDENTIALS') {
                        def backendImage = docker.image("my-backend-image:latest")
                        backendImage.push()
                    }
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKER_HUB_CREDENTIALS') {
                        def frontendImage = docker.image("my-frontend-image:latest")
                        frontendImage.push()
                    }
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                echo 'Deploying Backend...'
                // Add deployment script/command here
            }
        }

        stage('Deploy Frontend') {
            steps {
                echo 'Deploying Frontend...'
                // Add deployment script/command here
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
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
