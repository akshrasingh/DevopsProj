pipeline {
    agent any

    environment {
        SONARQUBE_TOKEN = credentials('token') // Jenkins credential of type "Secret text"
    }

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

       // stage('Run Tests') {
        //    steps {
         //       script {
          //          sh 'sleep 10'
          //          sh '''
          //              docker exec -t aksflora-backend sh -c "echo 'Current user is: $(whoami)'"
          //              docker exec -t aksflora-backend sh -c "npm run test" > backend/test_results.log
          //          '''
          //      }
          //  }
     //   }

        //stage('Save Test Results') {
         //   steps {
          //      script {
          //          sh 'mkdir -p test_results'
           //         sh 'cp backend/test_results.log test_results/test_results.log || echo "No test results found."'
           //         archiveArtifacts artifacts: 'test_results/test_results.log', allowEmptyArchive: true
           //     }
          //  }
       // }

        stage('SonarQube Analysis') {
            steps {
                dir('backend') {
                    withSonarQubeEnv('SonarQube') {
                        sh '''
                            sonar-scanner \
                            -Dsonar.projectKey=aksflora \
                            -Dsonar.projectName=AksFlora \
                            -Dsonar.sources=. \
                            -Dsonar.sourceEncoding=UTF-8
                        '''
                    }
                }
            }
        }

        // Commented out to avoid removing container on every run
        // stage('Cleanup') {
        //     steps {
        //         script {
        //             sh 'docker-compose -f docker-compose.yml down'
        //         }
        //     }
        // }
    }
}
