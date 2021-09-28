export function getEmployeeTn(employee: any) {
  return employee.employeePositions?.[0].personnelNo || employee.code;
}

export function getEmployeeDept(employee: any) {
  return employee.employeePositions?.[0].departmentForAccounting || employee.company.code;
}
