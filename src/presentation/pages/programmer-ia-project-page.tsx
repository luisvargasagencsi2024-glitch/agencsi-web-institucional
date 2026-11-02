import type { SiteContent } from '../../domain/entities/site-content'
import { SiteLayout } from '../layouts/site-layout'
import CourseLandingTemplate from './course-landing/CourseLandingTemplate'
import { programmerIaCourse, type CourseTemplateData } from './course-landing/course-catalog'

type ProgrammerIAProjectPageProps = Readonly<{
  content: SiteContent
  course?: CourseTemplateData
}>

export function ProgrammerIAProjectPage({
  content,
  course = programmerIaCourse,
}: ProgrammerIAProjectPageProps) {
  return (
    <SiteLayout content={content}>
      <CourseLandingTemplate course={course} />
    </SiteLayout>
  )
}
