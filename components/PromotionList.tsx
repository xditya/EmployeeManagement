import { EmployeeSchema } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import {getDepartmentFromId, getPromotionList} from '@/lib/data'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
const PromotionList = () => {
    const [promotedEmployees,setPromotedEmployees] = useState<EmployeeSchema[]>([]) 

    useEffect(()=>{
        let isMounted = true;
        const fetchPromotedEmployees = async()=>{
            const promotedEmployees = await getPromotionList();
            if (isMounted) {
                const updatedEmployees = await Promise.all(
                    promotedEmployees.map(async (employee : EmployeeSchema) => {
                    const department = await getDepartmentFromId(employee.departmentId);
                    return { ...employee, department };
                  })
                );
                setPromotedEmployees(updatedEmployees);
              }
        }
        fetchPromotedEmployees()

    })
  return (
    <div>
       <Table style={{ height: "400px", overflowY: "scroll" }}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Employee ID</TableHead>
            <TableHead>Employee Name</TableHead>
            <TableHead>Department</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {promotedEmployees.map((employee, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
       
      </Table>
    </div>
  )
}

export default PromotionList