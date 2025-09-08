import { notFound } from 'next/navigation'
import { supabase } from '../../../../src/lib/supabase'
import { ProjectDetail } from '../../../../src/components/capital-advisors/ProjectDetail'
import { CapitalAdvisorsProject } from '../../../../src/lib/types'

interface PageProps {
  params: {
    slug: string
  }
}

async function getCapitalAdvisorsProject(slug: string): Promise<CapitalAdvisorsProject | null> {
  
  const { data: deal, error } = await supabase
    .from('deals')
    .select('*')
    .eq('services', 'Capital Advisors')
    .eq('slug', slug)
    .single()

  if (error || !deal) {
    return null
  }

  // Validate that this is indeed a Capital Advisors project with required fields
  if (!deal.project_title || !deal.project_subtitle) {
    return null
  }

  return deal as CapitalAdvisorsProject
}

export async function generateMetadata({ params }: PageProps) {
  const project = await getCapitalAdvisorsProject(params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found - CBRE Capital Markets',
    }
  }

  return {
    title: `${project.project_title} - CBRE Capital Markets`,
    description: project.project_subtitle,
    openGraph: {
      title: project.project_title,
      description: project.project_subtitle,
      images: project.property_image_url ? [{ url: project.property_image_url }] : [],
      type: 'article',
    },
  }
}

export default async function CapitalAdvisorsProjectPage({ params }: PageProps) {
  const project = await getCapitalAdvisorsProject(params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}

export async function generateStaticParams() {
  
  // Get all Capital Advisors projects with slugs for static generation
  const { data: deals } = await supabase
    .from('deals')
    .select('slug')
    .eq('services', 'Capital Advisors')
    .not('slug', 'is', null)

  if (!deals) return []

  return deals.map((deal) => ({
    slug: deal.slug,
  }))
}