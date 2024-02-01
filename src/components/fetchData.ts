export async function fetchData(studentNumber: number): Promise<studentDataProps> {
    try {
        const response = await fetch(`http://192.168.237.132/units?stu_id=${studentNumber}`)
        const jsonData = await response.json();
        return jsonData
    } catch (error) {
        console.log(error);
        throw error;
    }
}

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

  export interface PreSelectDataProps {
    id: number;
    name : string;
    units: number;
    lesson_group: number;
    pre_reqs: number[];
    co_reqs: number[];
    passed: string;
    mark: number;
}

export interface studentDataProps {
    student_id: string,
    name: string,
    passed_units: number,
    terms: ChartDataProps[],
    eligibles: PreSelectDataProps[]
}