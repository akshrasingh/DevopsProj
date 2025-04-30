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
                    sh 'docker-compose -f docker-compose.yml build'  // Use docker-compose for better compatibility
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d'  // Same here for docker-compose
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'cd backend && npm run test'  // Ensure you're in the correct directory for your tests
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml down'  // Cleanup using docker-compose
                }
            }
        }
    }
}
