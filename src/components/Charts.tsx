import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import type { CyberData } from '../types';

interface ChartsProps {
  data: CyberData[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export function Charts({ data }: ChartsProps) {
  const { conceptData, areaStats } = useMemo(() => {
    const conceptRatings: Record<string, { total: number; count: number }> = {};
    const areaUsers: Record<string, Set<string>> = {};

    data.forEach((item) => {
      // Concept ratings
      if (!conceptRatings[item.concept]) {
        conceptRatings[item.concept] = { total: 0, count: 0 };
      }
      conceptRatings[item.concept].total += item.rating;
      conceptRatings[item.concept].count += 1;

      // Area users
      if (!areaUsers[item.area]) {
        areaUsers[item.area] = new Set();
      }
      areaUsers[item.area].add(item.email);
    });

    return {
      conceptData: Object.entries(conceptRatings).map(([name, stats]) => ({
        name,
        avgRating: Number((stats.total / stats.count).toFixed(2)),
      })),
      areaStats: Object.entries(areaUsers).map(([name, users]) => ({
        name,
        users: users.size,
      })),
    };
  }, [data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Calificación Promedio por Concepto</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={conceptData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#4B5563' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              domain={[0, 1]} 
              tick={{ fill: '#4B5563' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '0.5rem'
              }}
            />
            <Bar 
              dataKey="avgRating" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Usuarios por Área</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={areaStats}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="users"
            >
              {areaStats.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}