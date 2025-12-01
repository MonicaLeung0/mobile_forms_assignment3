import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const EMPLOYEE_COLLECTION = "employees";

// Add new employee
export const addEmployee = async (employee: any) => {
  const docRef = await addDoc(collection(db, EMPLOYEE_COLLECTION), employee);
  return docRef.id;
};

// Get all employees
export const getEmployees = async () => {
  const querySnapshot = await getDocs(collection(db, EMPLOYEE_COLLECTION));
  const employees: any[] = [];

  querySnapshot.forEach((doc) => {
    employees.push({ id: doc.id, ...doc.data() });
  });

  return employees;
};

// Delete employee (Member 3 can use this later)
export const deleteEmployee = async (id: string) => {
  await deleteDoc(doc(db, EMPLOYEE_COLLECTION, id));
};