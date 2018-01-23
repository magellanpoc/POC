node {
  git url: 'https://github.com/sreenivasd/configserver.git'
  def mvnHome = tool 'M3'
  bat "${mvnHome}/bin/mvn -B -Dmaven.test.failure.ignore verify"
  step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])
   step([$class: 'JUnitResultArchiver', testResults: '**/target/surefire-reports/TEST-*.xml'])
  bat "${mvnHome}/bin/mvn org.sonarsource.scanner.maven:sonar-maven-plugin:3.2:sonar"
  bat "${mvnHome}/bin/mvn sonar:sonar -Dsonar.host.url=http://localhost:9000"
}