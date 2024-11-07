import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { MetricCardProps } from '../types';

export function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-600">{icon}</div>
        {trend !== undefined && (
          <div className={`flex items-center ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            <span className="ml-1">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}