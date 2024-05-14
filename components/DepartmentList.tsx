'use client'; 
import { getDepartments } from '@/lib/data';
import { DepartmentSchema } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiEdit3 } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
const DepartmentList = () => {
  const [departments, setDepartments] = useState<DepartmentSchema[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
 
        const fetchedDepartments = await getDepartments();
 
        setDepartments(fetchedDepartments);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, [])

  return (
    <div>
  
      <Table style={{ height: "400px", overflowY: "scroll" }}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Department ID</TableHead>
            <TableHead>Department Name</TableHead>
            <TableHead>Department Location</TableHead>
            <TableHead className="text-right">Manager Id</TableHead>
            <TableHead className="text-right">Edit/Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.map((department, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{department.departmentId}</TableCell>
              <TableCell>{department.departmentName}</TableCell>
              <TableCell>{department.location}</TableCell>
              <TableCell className="text-right">
                {department.managerId}
              </TableCell>
              <TableCell>
                <div className="flex justify-center h-full items-center gap-5">
                  <div
                    onClick = {()=>handleEdit(employee)}
                   className="border p-1 rounded-sm hover:bg-slate-100 transition-all duration-300 ease-in-out cursor-pointer">
                    <FiEdit3 size={23} />
                  </div>
                  <div
                    onClick={() => handleDelete(employee)}
                    className="border p-1 rounded-sm hover:bg-slate-100 transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    <MdOutlineDelete size={23} />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <div className="flex justify-center items-center gap-5">
          <div
            onClick={() => handlePageChange(-1)}
            className="border p-1 rounded-sm hover:bg-slate-100 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <FaAngleLeft size={22} />
          </div>
          <div
            onClick={() => handlePageChange(1)}
            className="border p-1 rounded-sm hover:bg-slate-100 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <FaAngleRight size={22} />
          </div>
        </div>
      </Table>
    </div>
  );
};

export default DepartmentList;
