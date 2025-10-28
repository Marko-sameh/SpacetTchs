import { FeatureGridClient } from './FeatureGridClient'
import { BrainCircuit, Megaphone, Rocket, SmartphoneCharging } from 'lucide-react'

export function FeatureGrid({ title = "Services" }) {
  const features = [
    {
      title: 'Web Development',
      description:
        'Modern, high-performance web applications built with cutting-edge technologies and clean architecture for scalability and speed.',
      icon: <Rocket />,
    },
    {
      title: 'Mobile App Development',
      description:
        'We create innovative, high-performance mobile applications for iOS and Android platforms, enhancing user engagement and accessibility.',
      icon: <SmartphoneCharging />,
    },
    {
      title: 'Artificial Intelligence',
      description:
        'We develop intelligent AI-powered solutions, including chatbots, machine learning models, and data analysis tools to optimize your business operations and decision-making processes.',
      icon: <BrainCircuit />,
    },
    {
      title: 'Digital Marketing',
      description:
        'We craft data-driven digital marketing strategies — from SEO and social media campaigns to brand positioning — designed to increase visibility, attract qualified leads, and drive real growth.',
      icon: <Megaphone />,
    },
  ]


  return (
    <FeatureGridClient
      title={title}
      features={features}
    />
  )
}