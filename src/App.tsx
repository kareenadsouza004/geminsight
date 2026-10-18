import React, { useState } from 'react';
import { PersonaType, ModuleType, StrategyItem } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CommandCentre } from './components/CommandCentre';
import { IntelligenceHub } from './components/IntelligenceHub';
import { RiskOpportunityRadar } from './components/RiskOpportunityRadar';
import { ActionCockpit } from './components/ActionCockpit';
import { TalkToData } from './components/TalkToData';

export default function App() {
  const [currentPersona, setCurrentPersona] = useState<PersonaType>(
    'Chief Executive Officer (CEO)'
  );
  const [activeModule, setActiveModule] = useState<ModuleType>('command-centre');

  // Custom strategies dynamically turned into action from Radar or Talk to Data
  const [customStrategies, setCustomStrategies] = useState<StrategyItem[]>([]);

  const handleNavigateToCockpit = async (newStrategy?: StrategyItem) => {
    if (newStrategy) {
      setCustomStrategies((prev) => [newStrategy, ...prev]);
      // Persist to Firestore so it stays after refresh!
      try {
        const { saveStrategyToFirestore } = await import('./services/firestoreService');
        await saveStrategyToFirestore(newStrategy, currentPersona);
      } catch (err) {
        console.error('Failed to save strategy to Firestore:', err);
      }
    }
    setActiveModule('cockpit');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Bar */}
      <Header
        currentPersona={currentPersona}
        onPersonaChange={(persona) => {
          setCurrentPersona(persona);
        }}
      />

      {/* Main Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-0">
        {/* Left Side Pane: 5 Modules Listed Vertically */}
        <Sidebar
          activeModule={activeModule}
          onSelectModule={(module) => setActiveModule(module)}
          openStrategiesCount={4 + customStrategies.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {activeModule === 'command-centre' && (
            <CommandCentre currentPersona={currentPersona} />
          )}

          {activeModule === 'intelligence-hub' && (
            <IntelligenceHub currentPersona={currentPersona} />
          )}

          {activeModule === 'radar' && (
            <RiskOpportunityRadar
              currentPersona={currentPersona}
              onNavigateToCockpit={handleNavigateToCockpit}
            />
          )}

          {activeModule === 'cockpit' && (
            <ActionCockpit
              currentPersona={currentPersona}
              customStrategies={customStrategies}
            />
          )}

          {activeModule === 'talk-data' && (
            <TalkToData
              currentPersona={currentPersona}
              onNavigateToCockpit={handleNavigateToCockpit}
            />
          )}
        </main>
      </div>
    </div>
  );
}
