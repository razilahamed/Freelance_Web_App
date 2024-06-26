pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Arshad-Codes/freelancing_Project.git'
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
