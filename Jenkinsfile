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
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'sleep 10'
                    sh '''
                    docker exec -t --user root aksflora-backend sh -c "npm run test" > backend/test_results.log
                    '''
                }
            }
        }

        stage('Save Test Results') {
            steps {
                script {
                    sh 'mkdir -p test_results'
                    sh 'cp backend/test_results.log test_results/test_results.log'
                    archiveArtifacts artifacts: 'test_results/test_results.log', allowEmptyArchive: true
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
