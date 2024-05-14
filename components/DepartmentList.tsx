'use client'; // I assume this is some specific directive or comment for your environment
import { getDepartments } from '@/lib/data';
import { DepartmentSchema } from '@/lib/types';
import React, { useEffect, useState } from 'react';

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
      <h2>List of Departments</h2>
      <ul>
        {departments.map((department,index) => (
          <li key={index}>{department.departmentName}</li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;
