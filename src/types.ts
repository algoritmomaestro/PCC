export interface CyberData {
  email: string;
  name: string;
  age: number;
  gender: string;
  area: string;
  concept: string;
  rating: number;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
}