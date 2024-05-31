# ========== This is a comprehensive guide/cheatsheet for Python ==========

# ===== Keywords =====
# Keywords are reserved words in Python that have special meaning and cannot be used as identifiers.

False        # Boolean value representing false
None         # Represents the absence of a value
True         # Boolean value representing true
and          # Logical AND operator
as           # Used to create an alias
assert       # Assert statement for debugging
async        # Declare an asynchronous function or block
await        # Wait for the result of an asynchronous call
break        # Exit the current loop
class        # Define a new class
continue     # Skip the rest of the current loop iteration
def          # Define a new function
del          # Delete an object
elif         # Else if, additional conditional block
else         # Alternative block if the 'if' condition fails
except       # Handle exceptions
finally      # Execute a block of code, regardless of exceptions
for          # Start a for loop
from         # Import specific parts of a module
global       # Declare global variables
if           # Start a conditional block
import       # Import a module
in           # Check if a value is present in a sequence
is           # Test for object identity
lambda       # Create an anonymous function
nonlocal     # Declare non-local variables
not          # Logical NOT operator
or           # Logical OR operator
pass         # Placeholder that does nothing
raise        # Raise an exception
return       # Return a value from a function
try          # Start a block of code that handles exceptions
while        # Start a while loop
with         # Simplify exception handling
yield        # Pause and resume a generator function

# ===== Logical Operators =====
# Logical operators are used to combine conditional statements.

and          # Logical AND, both conditions must be true
or           # Logical OR, at least one condition must be true
not          # Logical NOT, inverts the boolean value

# ===== Comparison Operators =====
# Comparison operators are used to compare values.

==           # Equal to
!=           # Not equal to
<            # Less than
<=           # Less than or equal to
>            # Greater than
>=           # Greater than or equal to

# ===== Arithmetic Operators =====
# Arithmetic operators are used to perform mathematical operations.

+            # Addition
-            # Subtraction
*            # Multiplication
/            # Division
%            # Modulus (remainder)
**           # Exponentiation
//           # Floor division

# ===== Assignment Operators =====
# Assignment operators are used to assign values to variables.

=            # Assign value to a variable
+=           # Add and assign
-=           # Subtract and assign
*=           # Multiply and assign
/=           # Divide and assign
%=           # Modulus and assign
//=          # Floor divide and assign
**=          # Exponentiate and assign

# ===== Bitwise Operators =====
# Bitwise operators are used to compare binary numbers.

&            # AND
|            # OR
^            # XOR
~            # NOT
<<           # Left shift
>>           # Right shift

# ===== Variables =====
# Variables are used to store data that can be referenced and manipulated in a program.

# Variable assignment
var = 10                 # Assign integer 10 to variable 'var'
name = "John"            # Assign string "John" to variable 'name'

# Constants (conventionally written in uppercase)
PI = 3.14159             # Assign float 3.14159 to constant 'PI'

# ===== Common Concepts =====

# Data Types
integer = 42             # Integer data type
floating = 3.14          # Floating point data type
string = "Hello, World!" # String data type
boolean = True           # Boolean data type
none_type = None         # None type, represents absence of value

# Collections
list_example = [1, 2, 3, 4, 5]          # List
tuple_example = (1, 2, 3)               # Tuple
set_example = {1, 2, 3, 4, 5}           # Set
dict_example = {'key1': 'value1', 'key2': 'value2'}  # Dictionary

# Functions
def my_function(param1, param2):
    """This is a function that adds two numbers."""
    return param1 + param2

result = my_function(2, 3)              # Call the function

# Classes and Objects
class MyClass:
    """This is a simple class."""
    def __init__(self, name):
        self.name = name
    
    def greet(self):
        return f"Hello, {self.name}!"

obj = MyClass("Alice")                 # Create an instance of MyClass
print(obj.greet())                     # Call the greet method

# Conditionals
if condition:
    # Execute this block if condition is true
    pass
elif another_condition:
    # Execute this block if another_condition is true
    pass
else:
    # Execute this block if all above conditions are false
    pass

# Loops
# For loop
for i in range(5):
    print(i)

# While loop
count = 0
while count < 5:
    print(count)
    count += 1

# Exception Handling
try:
    # Code that may raise an exception
    pass
except SomeException as e:
    # Handle the exception
    pass
finally:
    # Code that will run no matter what
    pass

# List Comprehensions
squares = [x**2 for x in range(10)]  # Create a list of squares from 0 to 9

# Dictionary Comprehensions
square_dict = {x: x**2 for x in range(10)}  # Create a dictionary of squares from 0 to 9

# Generators
def my_generator():
    yield 1
    yield 2
    yield 3

for value in my_generator():
    print(value)

# Lambda Functions
add = lambda x, y: x + y
result = add(2, 3)

# Decorators
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()

# File Handling
with open('file.txt', 'r') as file:
    content = file.read()

# Importing Modules
import math                           # Import the math module
from math import pi                   # Import specific element from math module
import my_module                      # Import a user-defined module

# Assertions
assert 2 + 2 == 4                     # Assert that a condition is true

# Context Managers
with open('file.txt', 'r') as file:   # Ensures the file is properly closed after its suite finishes
    content = file.read()

# List Methods
my_list = [1, 2, 3]
my_list.append(4)                     # Append element to list
my_list.remove(2)                     # Remove element from list

# Dictionary Methods
my_dict = {'key1': 'value1'}
my_dict['key2'] = 'value2'            # Add key-value pair
del my_dict['key1']                   # Delete key-value pair

# String Methods
my_str = "hello"
upper_str = my_str.upper()            # Convert string to uppercase

# Iterators and Iterables
iterable = [1, 2, 3]
iterator = iter(iterable)             # Create an iterator
next(iterator)                        # Get the next item

# Type Hinting (Python 3.5+)
def greeting(name: str) -> str:
    return 'Hello ' + name
