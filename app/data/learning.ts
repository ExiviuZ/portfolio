export interface LearningItem {
  title: string
  description: string
}

export const learningItems: LearningItem[] = [
  { title: 'Testing', description: 'Unit and component tests with Vitest and Vue Test Utils, for code that stays reliable as it grows.' },
  { title: 'Git Workflow', description: 'Branching strategies, pull request review and conventional commits for smoother team collaboration.' },
  { title: 'CI/CD Basics', description: 'Automated build, test and deploy pipelines, currently practising with GitHub Actions.' },
  { title: 'Docker', description: 'Containerising applications and running consistent local development environments.' },
  { title: 'Java & Spring Boot', description: 'Server-side Java with Spring and Spring Boot — dependency injection, REST controllers and a stricter, statically typed backend.' },
  { title: 'React & Next.js', description: 'Expanding past Vue to broaden the toolkit and open up more kinds of work.' },
]
