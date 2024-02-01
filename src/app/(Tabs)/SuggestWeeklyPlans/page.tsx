"use client";

import React from "react";

import { useSuggestedPlansStorage } from "@/storage/storage";

import DisplayWeeklyPlans from "@/components/suggestWeeklyPlans/DisplayWeeklyPlans";
import SelectFilters from "@/components/suggestWeeklyPlans/SelectFilters";

export default function SuggestWeeklyPlans() {
  const { plans } = useSuggestedPlansStorage();

  return (
    <div className="my-24 w-4/5">
      {plans.length === 0 ? <SelectFilters /> : <DisplayWeeklyPlans />}
    </div>
  );
}
