import React, { memo } from 'react';
import type { CyberData } from '../types';

interface DataTableProps {
  data: CyberData[];
  currentPage: number;
  itemsPerPage: number;
}

export const DataTable = memo(function DataTable({ data, currentPage, itemsPerPage }: DataTableProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto bg-white rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Género</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concepto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calificación</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData.map((item) => (
            <tr key={`${item.email}-${item.concept}`} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.age}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.gender === 'M' ? 'Masculino' : 'Femenino'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.area}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.concept}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  <div className={`h-2.5 w-2.5 rounded-full mr-2 ${item.rating === 0 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  {item.rating}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});