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
                    def backendImage = docker.build("my-backend-image:latest", "./backend")
                    backendImage.inside {
                        sh 'yarn install'
                        sh 'yarn run build' // Adjust if 'build' script is different
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    def frontendImage = docker.build("my-frontend-image:latest", "-f frontend/Dockerfile .")
                    frontendImage.inside {
                        sh 'yarn install'
                        sh 'yarn run dev' // Adjust if 'dev' script is different
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
                // Example deployment command for backend (replace with your actual deployment steps):
                sh 'ssh user@server "cd /path/to/backend && yarn install && yarn start"'
            }
        }

        stage('Deploy Frontend') {
            steps {
                echo 'Deploying Frontend...'
                // Example deployment command for frontend (replace with your actual deployment steps):
                sh 'rsync -avz frontend/dist/ user@webserver:/var/www/html'
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
