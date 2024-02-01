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

export const PreSelectData: PreSelectDataProps[] = [
    {
        "id": 1221058,
        "name": "روش پژوهش و ارايه",
        "units": 2,
        "lesson_group": 2,
        "pre_reqs": [
          1221031
        ],
        "co_reqs": [],
        "passed": "deleted",
        "mark": -1
      },
      {
        "id": 1221024,
        "name": "سيگنالها و سيستمها",
        "units": 3,
        "lesson_group": 4,
        "pre_reqs": [
          1111009
        ],
        "co_reqs": [],
        "passed": "deleted",
        "mark": -1
      },
      {
        "id": 1211036,
        "name": "آمار و احتمالات مهندسي",
        "units": 3,
        "lesson_group": 1,
        "pre_reqs": [
          1111002
        ],
        "co_reqs": [],
        "passed": "deleted",
        "mark": -1
      },
      {
        "id": 1221065,
        "name": "تحليل و طراحي سيستم هاي نرم افزاري",
        "units": 3,
        "lesson_group": 2,
        "pre_reqs": [],
        "co_reqs": [
          1221029
        ],
        "passed": "deleted",
        "mark": -1
      },
      {
        "id": 1221036,
        "name": "معماري كامپيوتر",
        "units": 3,
        "lesson_group": 2,
        "pre_reqs": [
          1221050
        ],
        "co_reqs": [],
        "passed": "deleted",
        "mark": -1
      },
      {
        "id": 1221131,
        "name": "مباني و كاربردهاي هوش مصنوعي",
        "units": 3,
        "lesson_group": 2,
        "pre_reqs": [
          1221008
        ],
        "co_reqs": [],
        "passed": "deleted",
        "mark": -1
      },
      {
        "id": 1221055,
        "name": "اصول طراحي كامپايلر",
        "units": 3,
        "lesson_group": 2,
        "pre_reqs": [
          1221009
        ],
        "co_reqs": [],
        "passed": "deleted",
        "mark": -1
      },
      {
        "id": 1611009,
        "name": "انقلاب اسلامي ايران",
        "units": 2,
        "lesson_group": 1,
        "pre_reqs": [],
        "co_reqs": [],
        "passed": "deleted",
        "mark": -1
      },
      {
        "id": 1111006,
        "name": "ازمايشگاه فيزيك 2",
        "units": 1,
        "lesson_group": 1,
        "pre_reqs": [
          1111004
        ],
        "co_reqs": [],
        "passed": "deleted",
        "mark": -1
      },
      {
        "id": 1611014,
        "name": "تاريخ امامت",
        "units": 2,
        "lesson_group": 1,
        "pre_reqs": [],
        "co_reqs": [],
        "passed": "deleted",
        "mark": -1
      }
    ]