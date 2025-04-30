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
                    sh '$HOME/docker-compose -f docker-compose.yml build'  // Use the full path to docker-compose
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    sh '$HOME/docker-compose -f docker-compose.yml up -d'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'cd backend && npm run test'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    sh '$HOME/docker-compose -f docker-compose.yml down'
                }
            }
        }
    }
}
