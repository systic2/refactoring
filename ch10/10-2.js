function disabilityAmount(employee) {
  if (isNotEligibleForDisablility(employee)) {
    return 0;
  }

  return 1;
}

function isNotEligibleForDisablility(employee) {
  return (
    employee.seniority < 2 || 
    employee.monthsDisabled > 12 || 
    employee.isPartTime
  );
}
