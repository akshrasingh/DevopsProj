pipeline {
    agent any

    stages {
        
        stage('Checkout') {
            steps {
                git 'https://github.com/akshrasingh/DevopsProj.git'
            }
        }
        stage('Cleanup Before Start') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml down || true'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Run docker-compose build
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    // Run docker-compose up to start containers
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run tests inside the backend container and save output to a file
                    sh 'cd backend && npm run test > test_results.log'
                }
            }
        }

        stage('Save Test Results') {
            steps {
                script {
                    // Save the test results to a file (you can use an artifact or a custom location)
                    sh 'cp backend/test_results.log ./test_results/test_results.log'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    
                    sh 'docker-compose -f docker-compose.yml down'
                }
            }
        }
    }
}
