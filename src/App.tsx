import React, { useState, useMemo, useCallback } from 'react';
import { Users, Brain, Star, Filter } from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { DataTable } from './components/DataTable';
import { Charts } from './components/Charts';
import type { CyberData } from './types';
import realData from './data/book.json';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedConcept, setSelectedConcept] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    return realData.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = !selectedArea || item.area === selectedArea;
      const matchesConcept = !selectedConcept || item.concept === selectedConcept;
      return matchesSearch && matchesArea && matchesConcept;
    });
  }, [searchTerm, selectedArea, selectedConcept]);

  const { uniqueAreas, uniqueConcepts } = useMemo(() => ({
    uniqueAreas: [...new Set(realData.map(item => item.area))],
    uniqueConcepts: [...new Set(realData.map(item => item.concept))]
  }), []);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const metrics = useMemo(() => {
    const uniqueUsers = new Set(realData.map(item => item.email)).size;
    const totalRatings = realData.reduce((acc, curr) => acc + curr.rating, 0);
    const avgRating = (totalRatings / realData.length).toFixed(1);
    
    return {
      uniqueUsers,
      avgRating,
      totalConcepts: uniqueConcepts.length
    };
  }, [uniqueConcepts.length]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleAreaChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleConceptChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedConcept(e.target.value);
    setCurrentPage(1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Competencias en Ciberseguridad</h1>
          <p className="mt-2 text-gray-600">Análisis de {realData.length} evaluaciones de competencia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Usuarios Únicos"
            value={metrics.uniqueUsers}
            icon={<Users className="text-blue-500" size={24} />}
            trend={8.5}
          />
          <MetricCard
            title="Calificación Promedio"
            value={metrics.avgRating}
            icon={<Star className="text-yellow-500" size={24} />}
            trend={2.3}
          />
          <MetricCard
            title="Conceptos Evaluados"
            value={metrics.totalConcepts}
            icon={<Brain className="text-purple-500" size={24} />}
            trend={0}
          />
        </div>

        <div className="mb-8">
          <Charts data={realData} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-xl font-semibold mb-4 md:mb-0">Evaluaciones Detalladas</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por nombre o correo..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Filter className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedArea}
                onChange={handleAreaChange}
              >
                <option value="">Todas las Áreas</option>
                {uniqueAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedConcept}
                onChange={handleConceptChange}
              >
                <option value="">Todos los Conceptos</option>
                {uniqueConcepts.map(concept => (
                  <option key={concept} value={concept}>{concept}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value="5">5 por página</option>
                <option value="10">10 por página</option>
                <option value="20">20 por página</option>
              </select>
            </div>
          </div>

          <DataTable
            data={filteredData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Mostrando {Math.min(filteredData.length, itemsPerPage)} de {filteredData.length} resultados
            </div>
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="px-4 py-1">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Siguiente
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;