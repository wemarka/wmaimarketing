
import React from 'react';
import { Helmet } from "react-helmet-async";

interface PerformanceHeaderProps {
  title: string;
  subtitle: string;
}

const PerformanceHeader: React.FC<PerformanceHeaderProps> = ({ title, subtitle }) => {
  return (
    <>
      <Helmet>
        <title>{title} - سيركل</title>
      </Helmet>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </>
  );
};

export default PerformanceHeader;
