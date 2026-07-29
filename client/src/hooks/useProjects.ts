import { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '../types';

// Mocked local dataset based on user requirements
const PROJECTS_DATA: Project[] = [
  {
    id: 'speech-emotion-recognition',
    title: 'Speech Emotion Recognition',
    slug: 'speech-emotion-recognition',
    tagline: 'Real-time emotion detection from human speech.',
    description: 'A deep learning application that detects human emotions from speech in real time using a CNN-LSTM architecture with an optimized audio preprocessing pipeline.',
    architectureDetails: 'Leverages MFCC for audio feature extraction fed into a hybrid CNN-LSTM neural network. The inference engine is exposed via a robust Flask REST API capable of handling concurrent requests.',
    technologies: ['Python', 'TensorFlow', 'CNN', 'LSTM', 'Flask', 'REST API', 'MFCC', 'NumPy'],
    category: 'AI',
    featured: true,
    githubUrl: 'https://github.com/Yesh-219/Speech-emotion-Recognition',
    displayOrder: 1,
  },
  {
    id: 'recipe-sharing-platform',
    title: 'Recipe Sharing Platform',
    slug: 'recipe-sharing-platform',
    tagline: 'Discover, create, and manage culinary recipes.',
    description: 'A full-stack web application allowing users to create, discover, and manage recipes with secure authentication and a dedicated administrative dashboard.',
    architectureDetails: 'Built on a Flask backend connected to a MySQL relational database. The frontend is vanilla JavaScript, HTML, and CSS interacting seamlessly with a backend REST API.',
    technologies: ['Flask', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'REST API'],
    category: 'Full Stack',
    featured: true,
    githubUrl: 'https://github.com/Yesh-219/receipe-management-system',
    displayOrder: 2,
  },
];

export function useProjects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulated loading state for premium feel
  const [isLoading, setIsLoading] = useState(false);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
  }, [activeCategory, searchQuery]);

  const simulateLoading = (callback: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      callback();
      setIsLoading(false);
    }, 400); // 400ms premium micro-loading delay
  };

  const setCategory = (category: ProjectCategory) => {
    if (category !== activeCategory) {
      simulateLoading(() => setActiveCategory(category));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return {
    projects: filteredProjects,
    activeCategory,
    searchQuery,
    isLoading,
    setCategory,
    handleSearch,
  };
}
