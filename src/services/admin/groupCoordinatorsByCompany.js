const groupCoordinatorsByCompany = (coordinators) => {
  return coordinators.reduce((acc, coordinator) => {
    const company = coordinator.company || "Unassigned";
    if (!acc[company]) acc[company] = [];
    acc[company].push(`${coordinator.firstName} ${coordinator.lastName}`);
    return acc;
  }, {});
};

export default groupCoordinatorsByCompany;
