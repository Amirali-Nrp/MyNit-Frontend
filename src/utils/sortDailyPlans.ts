import compareTime from "@/utils/compareTime";

import { TDailyPlan } from "@/types/userTypes";

const sortedPlan = (plan: TDailyPlan[]) =>
  plan?.sort((a, b) => compareTime(a.time.from, b.time.from));

export default sortedPlan;
