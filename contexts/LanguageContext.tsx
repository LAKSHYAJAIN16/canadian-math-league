'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.season': '2025 Season',
    'nav.competitions': 'Competitions',
    'nav.resources': 'Resources',
    'nav.contact': 'Contact',
    'nav.joinNow': 'Join Now',
    
    // Season Page
    'season.title': '2025 Season',
    'season.days': 'days',
    'season.hours': 'hours',
    'season.minutes': 'minutes',
    'season.seconds': 'seconds',
    
    // Tabs
    'tabs.brackets': 'Brackets',
    'tabs.schedule': 'Schedule',
    'tabs.leaderboard': 'Leaderboard',
    'tabs.statistics': 'Statistics',
    
    // Schedule
    'schedule.groupStage': 'Group Stage',
    'schedule.regionalStage': 'Regional Stage',
    'schedule.nationalChampionships': 'National Championships',
    'schedule.day1': 'Day 1',
    'schedule.day2': 'Day 2',
    'schedule.westernChampionships': 'Western Championships',
    'schedule.ontarioChampionships': 'Ontario Championships',
    'schedule.canadianChampionship': 'Canadian Championship',
    'schedule.detailedSoon': 'Detailed Schedule coming soon!',
    
    // Messages
    'message.seasonNotStarted': 'Season hasn\'t started yet! Check back when it does!',
    
    // Championships
    'championship.western': 'Western Championships',
    'championship.ontario': 'Ontario Championships',
    'championship.canadian': 'Canadian Championship',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.season': 'Saison 2025',
    'nav.competitions': 'Compétitions',
    'nav.resources': 'Ressources',
    'nav.contact': 'Contact',
    'nav.joinNow': 'Rejoindre',
    
    // Season Page
    'season.title': 'Saison 2025',
    'season.days': 'jours',
    'season.hours': 'heures',
    'season.minutes': 'minutes',
    'season.seconds': 'secondes',
    
    // Tabs
    'tabs.brackets': 'Tournoi',
    'tabs.schedule': 'Horaire',
    'tabs.leaderboard': 'Classement',
    'tabs.statistics': 'Statistiques',
    
    // Schedule
    'schedule.groupStage': 'Phase de groupes',
    'schedule.regionalStage': 'Phase régionale',
    'schedule.nationalChampionships': 'Championnats nationaux',
    'schedule.day1': 'Jour 1',
    'schedule.day2': 'Jour 2',
    'schedule.westernChampionships': 'Championnats de l\'Ouest',
    'schedule.ontarioChampionships': 'Championnats de l\'Ontario',
    'schedule.canadianChampionship': 'Championnat canadien',
    'schedule.detailedSoon': 'Horaire détaillé bientôt disponible!',
    
    // Messages
    'message.seasonNotStarted': 'La saison n\'a pas encore commencé! Revenez quand elle commencera!',
    
    // Championships
    'championship.western': 'Championnats de l\'Ouest',
    'championship.ontario': 'Championnats de l\'Ontario',
    'championship.canadian': 'Championnat canadien',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
