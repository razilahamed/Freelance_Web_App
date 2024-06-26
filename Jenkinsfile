pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/razilahamed/Freelance_sample.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    docker.build('backend', './backend')
                    docker.build('frontend', './frontend')
                }
            }
        }
        stage('Run Docker Containers') {
            steps {
                script {
                    dockerCompose.up()
                }
            }
        }
    }
}
