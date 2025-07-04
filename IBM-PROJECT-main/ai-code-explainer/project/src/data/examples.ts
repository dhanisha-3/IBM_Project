import { ExampleCode } from '../types';

export const exampleCodes: ExampleCode[] = [
  {
    title: "Hello World Function",
    language: "python",
    code: `def greet(name):
    """Greets a person with their name"""
    return f"Hello, {name}!"

# Call the function
message = greet("Alice")
print(message)`,
    description: "A simple Python function that creates personalized greetings"
  },
  {
    title: "Array Sorting",
    language: "javascript",
    code: `const numbers = [64, 34, 25, 12, 22, 11, 90];

// Sort array in ascending order
const sortedNumbers = numbers
  .slice()
  .sort((a, b) => a - b);

console.log("Original:", numbers);
console.log("Sorted:", sortedNumbers);`,
    description: "JavaScript code that sorts an array of numbers"
  },
  {
    title: "Class Definition",
    language: "python",
    code: `class Car:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
        self.odometer = 0
    
    def drive(self, miles):
        self.odometer += miles
        return f"Drove {miles} miles"
    
    def __str__(self):
        return f"{self.year} {self.make} {self.model}"

# Create and use a car object
my_car = Car("Toyota", "Camry", 2020)
print(my_car)
print(my_car.drive(100))`,
    description: "A Python class representing a car with methods and properties"
  },
  {
    title: "API Fetch Request",
    language: "javascript",
    code: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Usage
fetchUserData(123).then(user => {
  if (user) {
    console.log('User found:', user.name);
  }
});`,
    description: "JavaScript async function that fetches user data from an API"
  }
];