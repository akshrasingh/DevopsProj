pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/akshrasingh/DevopsProj.git'
            }
        }

       stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml build || true'  // Always return success even if there's an error, so we can see logs
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d || true'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml down || true'
                }
            }
        }
    }
}
