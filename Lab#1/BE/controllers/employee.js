const router = require("../routes/employee");

const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => 
{
  const ID = req.params.id.toString(); 
  console.log("Deleting ID:", ID);
  console.log("Employee List Before Deletion:", employee);
    const index = employee.findIndex(emp => emp.id === ID);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Employee not found" });
  }

  employee.splice(index, 1)
  res.status(200).json({ success: true, message: "Employee deleted successfully" });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;

  if (employee.some(emp => emp.id === id)) {
    return res.status(400).json({ success: false, message: "Employee ID already exists" });
  }


  if (!id || !name) {
    return res.status(400).json({ success: false, message: "ID and Name are required" });
  }

  
  const newEmployee = { id, name };
  employee.push(newEmployee);

  res.status(201).json({ success: true, message: "Employee created successfully", data: newEmployee });
};

