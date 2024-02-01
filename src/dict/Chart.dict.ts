import { useState } from "react";


export interface ChartDataProps {
    term_number: number;
    courses: {
      id: number;
      name: string;
      units: number;
      pre_reqs: number[];
      co_reqs: number[];
      passed: string;
      mark: number;
    }[];
    total_units: number;
    total_passed: number;
    grade: number;
  }

  const getChartData = () => {
    const [chartData, setChartData] = useState<ChartDataProps[]>([]);
    return [chartData, setChartData];
  }

  export default getChartData;

