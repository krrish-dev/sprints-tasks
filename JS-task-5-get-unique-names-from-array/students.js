let tasksArray = [
    ["Nathalie Nader Nabil", "Task 01", "Option 2"],
    ["Youssef Mohamed Ahmed Mohamed Youssef", "Task 01", "Option 1"],
    ["Salma Nasreldin", "Task 01", "Option 1"],
    ["Engy Mostafa", "Task 01", "Option 1"],
    ["Engy Mostafa", "Task 01", "Option 1"],
    ["Engy ahmed mostafa ", "Task 01", "Option 1"],
    ["Abdelhay Nader Abdelhay Abozayed", "Task 01", "Option 1"],
    ["Abdelrahman Shemies", "Task 01", "Option 1"],
    ["Alaa Ahmed", "Task 01", "Option 2"],
    ["Youssef Fathy Mahmoud", "Task 01", "Option 1"],
    ["Mark Bassem", "Task 01", "Option 1"],
    ["Anas Ahmed", "Task 01", "Option 1"],
    ["Adham Hesham", "Task 01", "Option 1"],
    ["Mohamed Ahmed Fahmi", "Task 01", "Option 1"],
    ["rola wafi", "Task 01", "Option 1"],
    ["Moataz Youssef", "Task 01", "Option 2"],
    ["Ahmad Salama", "Task 01", "Option 1"],
    ["Mohamed Ahmed Fahmi", "Task 01", "Option 1"],
    ["Ahmad Salama Abdelaziz", "Task 01", "Option 2"],
    ["Kareem Ramzi El-Tahlawi", "Task 01", "Option 1"],
    ["Alaa Ahmed", "Task 01", "Option 2"],
    ["rola wafi", "Task 01", "Option 2"],
    ["Mohamed Fahmi", "Task 01", "Option 1"],
    ["Mohamed Fahmi", "Task 01", "Option 2"],
    ["Alaa Ahmed", "Task 01", "Option 2"],
    ["Abdelrahman Shemies", "Task 01", "Option 1"],
    ["Nathalie Nader", "Task 01", "Option 1"],
    ["Mariam Ahmed", "Task 01", "Option 1"],
  ];
  
  // Step 1: Flatten the array and extract the names
  const names = tasksArray.map((task) => task[0]);
  
  // Step 2: Create a Set to store unique names
  const uniqueNamesSet = new Set(names);
  
  // Step 3: Convert the Set back to an array
  const uniqueNamesArray = Array.from(uniqueNamesSet);
  
  // Step 4: console the unique names
  console.log(uniqueNamesArray);